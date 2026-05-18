const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');

let ffmpegExecutable = 'ffmpeg';
try { ffmpegExecutable = require('ffmpeg-static'); } catch {}

function hasFile(filePath) {
  return Boolean(filePath && fs.existsSync(filePath));
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegExecutable, args, { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    proc.on('error', reject);
    proc.on('exit', (code) => {
      if (code === 0) { resolve(); return; }
      reject(new Error(stderr.trim().split(/\r?\n/).slice(-8).join('\n') || `ffmpeg exit ${code}`));
    });
  });
}

async function concatenateWithIntroOutro(mainVideoPath, outputPath, payload, workingDir) {
  const segments = [];
  if (hasFile(payload.intro)) segments.push(payload.intro);
  segments.push(mainVideoPath);
  if (hasFile(payload.outro)) segments.push(payload.outro);

  if (segments.length === 1) {
    if (mainVideoPath !== outputPath) await fs.promises.copyFile(mainVideoPath, outputPath);
    return;
  }

  const listPath = path.join(workingDir, 'concat-list.txt');
  const listContent = segments.map((p) => `file '${p.replace(/\\/g, '/').replace(/'/g, "'\\''")}'`).join('\n');
  await fs.promises.writeFile(listPath, listContent, 'utf8');

  await runFfmpeg(['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c', 'copy', outputPath]);
}

const { createDesktopPaths, ensureDesktopDirs } = require('../../shared/paths.cjs');
const { prepareRemotionPublicDir } = require('../../shared/remotion-public.cjs');

const QAWALEB_BUNDLE_VERSION = 1;

const desktopPaths = createDesktopPaths({
  packaged: process.env.DESKTOP_V2_PACKAGED === 'true',
  appHome: process.env.DESKTOP_V2_APP_HOME,
  resourcesPath: process.env.DESKTOP_V2_RESOURCES_PATH,
});

desktopPaths.bundleDir = path.join(
  desktopPaths.packaged ? desktopPaths.resourceRoot : desktopPaths.runtimeRoot,
  desktopPaths.packaged ? 'generated' : 'cache',
  'bundle-staging-qawaleb',
  'remotion-bundle'
);

ensureDesktopDirs(desktopPaths);

try {
  process.env.REMOTION_FFMPEG_EXECUTABLE = require('ffmpeg-static');
  process.env.REMOTION_FFPROBE_EXECUTABLE = require('ffprobe-static').path;
} catch {}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function getLatestMtime(targetPath) {
  if (!targetPath || !fs.existsSync(targetPath)) {
    return 0;
  }

  const stat = fs.statSync(targetPath);
  if (!stat.isDirectory()) {
    return stat.mtimeMs;
  }

  let latest = stat.mtimeMs;
  const entries = fs.readdirSync(targetPath, { withFileTypes: true });
  for (const entry of entries) {
    latest = Math.max(latest, getLatestMtime(path.join(targetPath, entry.name)));
  }
  return latest;
}

function getBundleMetaPath() {
  return path.join(desktopPaths.bundleDir, 'bundle-meta.json');
}

function needsBundleRebuild(bundleMarker) {
  if (!fs.existsSync(bundleMarker)) {
    return true;
  }

  if (desktopPaths.packaged) {
    return false;
  }

  const meta = readJsonIfExists(getBundleMetaPath());
  if (!meta || Number(meta.version || 0) !== QAWALEB_BUNDLE_VERSION) {
    return true;
  }

  const bundleMtime = fs.statSync(bundleMarker).mtimeMs;
  const latestSourceMtime = Math.max(
    getLatestMtime(path.join(desktopPaths.repoRoot, 'src', 'remotion', 'qawaleb')),
    getLatestMtime(path.join(desktopPaths.repoRoot, 'public', 'assets', 'fonts')),
  );

  return latestSourceMtime > bundleMtime;
}

function writeBundleMeta() {
  fs.writeFileSync(
    getBundleMetaPath(),
    `${JSON.stringify({
      version: QAWALEB_BUNDLE_VERSION,
      builtAt: new Date().toISOString(),
    }, null, 2)}\n`,
    'utf8',
  );
}

function reply(message) {
  if (process.send) process.send(message);
}

function getRemotionBinariesDirectory() {
  if (!desktopPaths.packaged) return null;
  if (!desktopPaths.remotionBinariesDir || !fs.existsSync(desktopPaths.remotionBinariesDir)) {
    throw new Error('Desktop V2 Remotion binaries are missing from the packaged app.');
  }
  return desktopPaths.remotionBinariesDir;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac',
  };
  return map[ext] || 'application/octet-stream';
}

function startMediaServer(fileMap) {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url, 'http://127.0.0.1');
      const key = decodeURIComponent(requestUrl.pathname.replace('/media/', ''));
      const filePath = fileMap.get(key);

      if (!filePath || !fs.existsSync(filePath)) {
        response.writeHead(404);
        response.end('Missing media');
        return;
      }

      const stat = await fs.promises.stat(filePath);
      const range = request.headers.range;
      const contentType = getContentType(filePath);

      if (!range) {
        response.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': stat.size,
          'Accept-Ranges': 'bytes',
        });
        fs.createReadStream(filePath).pipe(response);
        return;
      }

      const [rawStart, rawEnd] = range.replace('bytes=', '').split('-');
      const start = Number(rawStart || 0);
      const end = rawEnd ? Number(rawEnd) : stat.size - 1;

      response.writeHead(206, {
        'Content-Type': contentType,
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
      });
      fs.createReadStream(filePath, { start, end }).pipe(response);
    } catch (error) {
      response.writeHead(500);
      response.end(error instanceof Error ? error.message : 'Media server error');
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      resolve({
        close: () => new Promise((closeResolve, closeReject) => {
          server.close((error) => {
            if (error) {
              closeReject(error);
              return;
            }
            closeResolve();
          });
        }),
        urlFor: (key) => `http://127.0.0.1:${port}/media/${encodeURIComponent(key)}`,
      });
    });
    server.on('error', reject);
  });
}

function registerMediaFile(fileMap, baseKey, filePath) {
  const extension = path.extname(filePath || '');
  const mediaKey = `${baseKey}${extension}`;
  fileMap.set(mediaKey, filePath);
  return mediaKey;
}

function ensureBundle() {
  const bundleMarker = path.join(desktopPaths.bundleDir, 'bundle.js');
  if (!needsBundleRebuild(bundleMarker)) {
    return Promise.resolve(desktopPaths.bundleDir);
  }

  if (desktopPaths.packaged) {
    throw new Error('Desktop V2 Qawaleb bundle is missing from the packaged app.');
  }

  reply({
    type: 'progress',
    payload: {
      stage: 'bundle',
      progress: 0.05,
      message: 'Building the Remotion bundle for Qawaleb...',
    },
  });

  return prepareRemotionPublicDir(desktopPaths)
    .then((stagedPublicDir) => bundle({
      entryPoint: path.join(desktopPaths.repoRoot, 'src', 'remotion', 'qawaleb', 'index.ts'),
      outDir: desktopPaths.bundleDir,
      enableCaching: true,
      publicDir: stagedPublicDir,
    }))
    .then((result) => {
      writeBundleMeta();
      return result;
    });
}

function normalizeTemplateValues(templateValues, fileMap) {
  const values = {};
  const entries = Object.entries(templateValues && typeof templateValues === 'object' ? templateValues : {});

  entries.forEach(([key, rawValue]) => {
    const value = typeof rawValue === 'string' ? rawValue : String(rawValue ?? '');
    if (value && fs.existsSync(value)) {
      const mediaKey = registerMediaFile(fileMap, `template-${key}`, value);
      values[key] = { __mediaKey: mediaKey };
      return;
    }
    values[key] = value;
  });

  return values;
}

async function renderQawaleb(payload) {
  const serveUrl = await ensureBundle();
  const fileMap = new Map();
  const binariesDirectory = getRemotionBinariesDirectory();

  const musicMediaKey = payload.music && fs.existsSync(payload.music)
    ? registerMediaFile(fileMap, 'music', payload.music)
    : null;
  const voiceoverMediaKey = payload.voiceover && fs.existsSync(payload.voiceover)
    ? registerMediaFile(fileMap, 'voiceover', payload.voiceover)
    : null;
  const frameMediaKey = payload.frame && fs.existsSync(payload.frame)
    ? registerMediaFile(fileMap, 'frame', payload.frame)
    : null;
  const backgroundMediaKey = payload.backgroundImage && fs.existsSync(payload.backgroundImage)
    ? registerMediaFile(fileMap, 'background', payload.backgroundImage)
    : null;

  const normalizedValues = normalizeTemplateValues(payload.templateValues, fileMap);
  const mediaServer = await startMediaServer(fileMap);

  const hasIntroOutro = hasFile(payload.intro) || hasFile(payload.outro);
  const tempDir = hasIntroOutro ? path.join(desktopPaths.tempDir, `qawaleb-concat-${Date.now()}`) : null;
  if (tempDir) await fs.promises.mkdir(tempDir, { recursive: true });

  try {
    const resolvedValues = Object.fromEntries(
      Object.entries(normalizedValues).map(([key, value]) => {
        if (value && typeof value === 'object' && value.__mediaKey) {
          return [key, mediaServer.urlFor(value.__mediaKey)];
        }
        return [key, value];
      }),
    );

    const inputProps = {
      templateId: payload.templateId || 'points-broadcast',
      templateValues: resolvedValues,
      backgroundImageUrl: backgroundMediaKey ? mediaServer.urlFor(backgroundMediaKey) : null,
      backgroundOpacity: Number(payload.backgroundOpacity ?? 10),
      backgroundBlur: Number(payload.backgroundBlur ?? 12),
      backgroundRadius: Number(payload.backgroundRadius ?? 42),
      backgroundFeather: Number(payload.backgroundFeather ?? 84),
      parallaxEnabled: payload.parallaxEnabled !== false,
      templateColors: payload.templateColors && typeof payload.templateColors === 'object'
        ? { ...payload.templateColors }
        : {},
      templateScale: Number(payload.templateScale ?? 1),
      templateX: Number(payload.templateX ?? 0),
      templateY: Number(payload.templateY ?? 0),
      textFontSize: Number(payload.textFontSize ?? 65),
      portraitScale: Number(payload.portraitScale ?? 1),
      portraitX: Number(payload.portraitX ?? 0),
      portraitY: Number(payload.portraitY ?? 0),
      portraitMonochrome: payload.portraitMonochrome !== false,
      portraitSquare: payload.portraitSquare === true,
      showQuoteMark: payload.showQuoteMark !== false,
      frameUrl: frameMediaKey ? mediaServer.urlFor(frameMediaKey) : null,
      durationMs: Math.max(1000, Number(payload.durationMs || 20000)),
      musicUrl: musicMediaKey ? mediaServer.urlFor(musicMediaKey) : null,
      musicVolume: Math.max(0, Math.min(1, Number(payload.musicVolume ?? 50) / 100)),
      voiceoverUrl: voiceoverMediaKey ? mediaServer.urlFor(voiceoverMediaKey) : null,
      voiceoverVolume: Math.max(0, Math.min(2, Number(payload.voiceoverVolume ?? 100) / 100)),
    };

    reply({
      type: 'progress',
      payload: {
        stage: 'composition',
        progress: 0.2,
        message: 'Preparing the Qawaleb composition...',
      },
    });

    const composition = await selectComposition({
      serveUrl,
      id: 'QawalebVideo',
      inputProps,
      binariesDirectory,
    });

    const finalOutputPath = path.join(desktopPaths.outputDir, `Qawaleb_${Date.now()}.mp4`);
    const outputPath = hasIntroOutro ? path.join(tempDir, 'main.mp4') : finalOutputPath;

    reply({
      type: 'progress',
      payload: {
        stage: 'render',
        progress: 0.25,
        message: 'Rendering the selected template...',
      },
    });

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      audioCodec: 'aac',
      imageFormat: 'jpeg',
      jpegQuality: 100,
      outputLocation: outputPath,
      inputProps,
      binariesDirectory,
      ...(payload.turboMode ? {
        concurrency: require('os').cpus().length,
      } : {}),
      onProgress: ({ renderedFrames, encodedFrames, progress }) => {
        const frameProgress = composition.durationInFrames
          ? renderedFrames / composition.durationInFrames
          : 0;
        const encodeProgress = composition.durationInFrames
          ? encodedFrames / composition.durationInFrames
          : 0;
        reply({
          type: 'progress',
          payload: {
            stage: 'render',
            progress: typeof progress === 'number' ? progress : Math.max(frameProgress, encodeProgress),
            renderedFrames,
            encodedFrames,
            totalFrames: composition.durationInFrames,
            message: 'Rendering the selected template...',
          },
        });
      },
    });

    if (hasIntroOutro) {
      reply({
        type: 'progress',
        payload: { stage: 'concat', progress: 0.95, message: 'Concatenating intro / outro...' },
      });
      await concatenateWithIntroOutro(outputPath, finalOutputPath, payload, tempDir);
    }

    return {
      success: true,
      outputPath: finalOutputPath,
      totalFrames: composition.durationInFrames,
    };
  } finally {
    await mediaServer.close();
    if (tempDir) await fs.promises.rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function handleRequest(action, payload) {
  switch (action) {
    case 'render':
      return renderQawaleb(payload);
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
}

process.on('message', async (message) => {
  if (!message || typeof message !== 'object') return;
  const { id, action, payload } = message;
  try {
    const result = await handleRequest(action, payload || {});
    reply({ type: 'response', id, ok: true, payload: result });
  } catch (error) {
    reply({ type: 'response', id, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
});
