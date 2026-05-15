const fs = require('fs');
const http = require('http');
const path = require('path');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');

const { createDesktopPaths, ensureDesktopDirs } = require('../../shared/paths.cjs');
const { prepareRemotionPublicDir } = require('../../shared/remotion-public.cjs');
const { toFileUrl } = require('../../shared/assets.cjs');
const { normalizePersonalitiesPayload } = require('../shared/payload-personalities.cjs');

const desktopPaths = createDesktopPaths({
  packaged: process.env.DESKTOP_V2_PACKAGED === 'true',
  appHome: process.env.DESKTOP_V2_APP_HOME,
  resourcesPath: process.env.DESKTOP_V2_RESOURCES_PATH,
});

desktopPaths.bundleDir = path.join(
  desktopPaths.packaged ? desktopPaths.resourceRoot : desktopPaths.runtimeRoot,
  desktopPaths.packaged ? 'generated' : 'cache',
  'bundle-staging-personalities',
  'remotion-bundle'
);

ensureDesktopDirs(desktopPaths);

try {
  process.env.REMOTION_FFMPEG_EXECUTABLE = require('ffmpeg-static');
  process.env.REMOTION_FFPROBE_EXECUTABLE = require('ffprobe-static').path;
} catch {
}

function reply(message) {
  if (process.send) {
    process.send(message);
  }
}

function getRemotionBinariesDirectory() {
  if (!desktopPaths.packaged) {
    return null;
  }
  if (!desktopPaths.remotionBinariesDir || !fs.existsSync(desktopPaths.remotionBinariesDir)) {
    throw new Error('Desktop V2 Remotion binaries are missing from the packaged app.');
  }
  return desktopPaths.remotionBinariesDir;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.webp': 'image/webp', '.gif': 'image/gif',
    '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.aac': 'audio/aac',
    '.mp4': 'video/mp4', '.mov': 'video/quicktime',
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
      const { port } = server.address();
      resolve({
        close: () => new Promise((closeResolve, closeReject) => {
          server.close((error) => { if (error) { closeReject(error); return; } closeResolve(); });
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

async function ensureBundle() {
  const bundleMarker = path.join(desktopPaths.bundleDir, 'bundle.js');
  if (fs.existsSync(bundleMarker)) {
    return desktopPaths.bundleDir;
  }
  if (desktopPaths.packaged) {
    throw new Error('Desktop V2 bundle is missing from the packaged app.');
  }
  await fs.promises.mkdir(path.dirname(desktopPaths.bundleDir), { recursive: true });
  reply({
    type: 'progress',
    payload: { stage: 'bundle', progress: 0.05, message: 'Building Remotion bundle for Personalities...' },
  });
  const stagedPublicDir = await prepareRemotionPublicDir(desktopPaths);
  return bundle({
    entryPoint: desktopPaths.remotionEntry,
    outDir: desktopPaths.bundleDir,
    enableCaching: true,
    publicDir: stagedPublicDir,
  });
}

async function renderVideo(payload) {
  const normalized = normalizePersonalitiesPayload(desktopPaths, payload);
  const serveUrl = await ensureBundle();
  const fileMap = new Map();
  const binariesDirectory = getRemotionBinariesDirectory();

  const slideMediaKeys = normalized.slides.map((slide, index) =>
    registerMediaFile(fileMap, `pslide-${index}`, slide.imagePath),
  );
  const voiceoverMediaKey = normalized.voiceoverPath
    ? registerMediaFile(fileMap, 'pvoiceover', normalized.voiceoverPath)
    : null;
  const musicMediaKey = normalized.musicPath
    ? registerMediaFile(fileMap, 'pmusic', normalized.musicPath)
    : null;
  const endPageMediaKey = normalized.endPagePath
    ? registerMediaFile(fileMap, 'pend-page', normalized.endPagePath)
    : null;

  const mediaServer = await startMediaServer(fileMap);

  try {
    const inputProps = {
      slides: normalized.slides.map((slide, index) => ({
        id: slide.id,
        mediaUrl: mediaServer.urlFor(slideMediaKeys[index]),
        mediaType: slide.mediaType,
        durationMs: slide.durationMs,
        mediaDurationMs: slide.mediaDurationMs,
        trimStartMs: slide.trimStartMs || 0,
        trimEndMs: slide.trimEndMs || null,
        isMuted: slide.isMuted !== false,
      })),
      mainVoiceover: voiceoverMediaKey ? mediaServer.urlFor(voiceoverMediaKey) : null,
      mainVoiceoverDurationMs: normalized.mainVoiceoverDurationMs,
      voiceover: voiceoverMediaKey ? mediaServer.urlFor(voiceoverMediaKey) : null,
      voiceoverDurationMs: normalized.mainVoiceoverDurationMs,
      music: musicMediaKey ? mediaServer.urlFor(musicMediaKey) : null,
      musicVolume: normalized.musicVolume,
      voiceoverVolume: normalized.voiceoverVolume,
      finalDurationMs: normalized.finalDurationMs,
      timelineDurationMs: normalized.timelineDurationMs,
      endPage: endPageMediaKey ? mediaServer.urlFor(endPageMediaKey) : null,
      endPageDurationFrames: normalized.endPageDurationFrames,
    };

    reply({
      type: 'progress',
      payload: { stage: 'composition', progress: 0.2, message: 'Preparing Personalities composition...' },
    });

    const composition = await selectComposition({
      serveUrl,
      id: 'PersonalitiesVideo',
      inputProps,
      binariesDirectory,
    });

    const outputPath = path.join(desktopPaths.outputDir, `Personalities_${Date.now()}.mp4`);

    reply({
      type: 'progress',
      payload: { stage: 'render', progress: 0.25, message: 'Rendering Personalities video...' },
    });

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      audioCodec: 'aac',
      muted: false,
      imageFormat: 'jpeg',
      jpegQuality: 100,
      ...(payload.turboMode ? {
        concurrency: require('os').cpus().length,
      } : {}),
      outputLocation: outputPath,
      inputProps,
      binariesDirectory,
      onProgress: ({ progress }) => {
        reply({
          type: 'progress',
          payload: { stage: 'render', progress: 0.25 + progress * 0.75, message: `Rendering... ${Math.round(progress * 100)}%` },
        });
      },
    });

    return {
      outputPath,
      outputUrl: toFileUrl(outputPath),
      outputDir: desktopPaths.outputDir,
    };
  } finally {
    await mediaServer.close();
  }
}

process.on('message', async (message) => {
  if (!message || message.action !== 'render') {
    return;
  }
  try {
    const payload = await renderVideo(message.payload || {});
    reply({
      type: 'response', id: message.id, ok: true, payload,
    });
  } catch (error) {
    reply({
      type: 'response', id: message.id, ok: false,
      error: error instanceof Error ? error.message : 'Render failed',
    });
  }
});
