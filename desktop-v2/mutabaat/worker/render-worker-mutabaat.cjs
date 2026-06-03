const fs = require('fs');
const http = require('http');
const path = require('path');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');

const { createDesktopPaths, ensureDesktopDirs } = require('../../shared/paths.cjs');
const { prepareRemotionPublicDir } = require('../../shared/remotion-public.cjs');
const { toFileUrl } = require('../../shared/assets.cjs');

const FPS = 25;
const DEFAULT_SLIDE_MS = 15000;
const FINAL_SLIDE_MS = 20000;

const desktopPaths = createDesktopPaths({
  packaged: process.env.DESKTOP_V2_PACKAGED === 'true',
  appHome: process.env.DESKTOP_V2_APP_HOME,
  resourcesPath: process.env.DESKTOP_V2_RESOURCES_PATH,
});

desktopPaths.bundleDir = path.join(
  desktopPaths.packaged ? desktopPaths.resourceRoot : desktopPaths.runtimeRoot,
  desktopPaths.packaged ? 'generated' : 'cache',
  'bundle-staging-mutabaat',
  'remotion-bundle',
);

ensureDesktopDirs(desktopPaths);

try {
  const fixAsar = (p) => p ? p.replace(/app\.asar([/\\])/, 'app.asar.unpacked$1') : p;
  process.env.REMOTION_FFMPEG_EXECUTABLE = fixAsar(require('ffmpeg-static'));
  process.env.REMOTION_FFPROBE_EXECUTABLE = fixAsar(require('ffprobe-static').path);
} catch {}

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
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm',
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
        close: () => new Promise((closeResolve) => server.close(() => closeResolve())),
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
  if (fs.existsSync(bundleMarker)) return desktopPaths.bundleDir;
  if (desktopPaths.packaged) {
    throw new Error('Desktop V2 Mutabaat bundle is missing from the packaged app.');
  }

  reply({ type: 'progress', payload: { stage: 'bundle', progress: 0.45, message: 'Building Mutabaat bundle...' } });
  const stagedPublicDir = await prepareRemotionPublicDir(desktopPaths);
  return bundle({
    entryPoint: path.join(desktopPaths.repoRoot, 'src', 'remotion', 'mutabaat', 'index.ts'),
    outDir: desktopPaths.bundleDir,
    enableCaching: true,
    publicDir: stagedPublicDir,
  });
}

function normalizeSlides(slides) {
  return (Array.isArray(slides) ? slides : [])
    .filter((slide) => slide && slide.imagePath && fs.existsSync(slide.imagePath))
    .map((slide, index, all) => ({
      id: slide.id || `slide-${index + 1}`,
      imagePath: slide.imagePath,
      text: slide.text || '',
      durationMs: index === all.length - 1 ? FINAL_SLIDE_MS : DEFAULT_SLIDE_MS,
    }));
}

async function renderMutabaat(payload) {
  const slides = normalizeSlides(payload.slides);
  if (slides.length === 0) {
    throw new Error('Please choose at least one image for Mutabaat.');
  }

  const serveUrl = await ensureBundle();
  const fileMap = new Map();
  const binariesDirectory = getRemotionBinariesDirectory();

  const slideKeys = slides.map((slide, index) => registerMediaFile(fileMap, `slide-${index + 1}`, slide.imagePath));
  const mutabaatAssetsDir = desktopPaths.packaged
    ? path.join(desktopPaths.assetsDir, 'mutabaat')
    : path.join(desktopPaths.publicDir, 'assets', 'mutabaat');
  const overlayPath = path.join(mutabaatAssetsDir, 'slide.webm');
  const finalOverlayPath = path.join(mutabaatAssetsDir, 'final-slide.webm');
  const musicPath = path.join(mutabaatAssetsDir, 'news-clock-intense-loop.wav');
  const overlayKey = fs.existsSync(overlayPath) ? registerMediaFile(fileMap, 'overlay', overlayPath) : null;
  const finalOverlayKey = fs.existsSync(finalOverlayPath) ? registerMediaFile(fileMap, 'final-overlay', finalOverlayPath) : null;
  const musicKey = fs.existsSync(musicPath) ? registerMediaFile(fileMap, 'music', musicPath) : null;

  const mediaServer = await startMediaServer(fileMap);

  try {
    const inputProps = {
      slides: slides.map((slide, index) => ({
        id: slide.id,
        imageUrl: mediaServer.urlFor(slideKeys[index]),
        text: slide.text,
        durationMs: slide.durationMs,
      })),
      overlayUrl: overlayKey ? mediaServer.urlFor(overlayKey) : null,
      finalOverlayUrl: finalOverlayKey ? mediaServer.urlFor(finalOverlayKey) : null,
      bgMusicUrl: musicKey ? mediaServer.urlFor(musicKey) : null,
      bgMusicVolume: Number(payload.bgMusicVolume ?? 0.35),
      textBottomOffset: Number(payload.textBottomOffset || 130),
      textFontSize: Number(payload.textFontSize || 54),
    };

    reply({ type: 'progress', payload: { stage: 'composition', progress: 0.6, message: 'Preparing Mutabaat composition...' } });
    const composition = await selectComposition({
      serveUrl,
      id: payload.compositionId || 'MutabaatVideo',
      inputProps,
      binariesDirectory,
    });

    const outputPath = path.join(desktopPaths.outputDir, `Mutabaat_${Date.now()}.mp4`);
    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      audioCodec: 'aac',
      imageFormat: 'jpeg',
      jpegQuality: 100,
      muted: false,
      outputLocation: outputPath,
      inputProps,
      binariesDirectory,
      onProgress: ({ renderedFrames, encodedFrames, progress }) => {
        const frameProgress = composition.durationInFrames ? renderedFrames / composition.durationInFrames : 0;
        const encodeProgress = composition.durationInFrames ? encodedFrames / composition.durationInFrames : 0;
        reply({
          type: 'progress',
          payload: {
            stage: 'render',
            progress: typeof progress === 'number' ? progress : Math.max(frameProgress, encodeProgress),
            renderedFrames,
            encodedFrames,
            totalFrames: composition.durationInFrames,
            message: 'Rendering Mutabaat video...',
          },
        });
      },
    });

    return { success: true, outputPath, outputUrl: toFileUrl(outputPath), totalFrames: composition.durationInFrames };
  } finally {
    await mediaServer.close().catch(() => {});
  }
}

process.on('message', async (message) => {
  if (!message || message.action !== 'render') return;
  try {
    const result = await renderMutabaat(message.payload || {});
    reply({ type: 'response', id: message.id, ok: true, payload: result });
  } catch (error) {
    reply({ type: 'response', id: message.id, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
});
