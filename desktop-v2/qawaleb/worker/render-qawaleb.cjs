const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

let activeSession = null;

let ffmpegExecutable = 'ffmpeg';
try {
  ffmpegExecutable = require('ffmpeg-static');
} catch {
  // Fall back to a system ffmpeg if the packaged binary is unavailable.
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hasFile(filePath) {
  return Boolean(filePath && fs.existsSync(filePath));
}

function escapeTemplateLiteral(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

function buildTemplateRenderScript(values) {
  const serializedValues = JSON.stringify(values || {});
  return `
    new Promise(async (resolve, reject) => {
      try {
        if (!window.QAWALEB_TEMPLATE_BRIDGE) {
          throw new Error('Qawaleb template bridge is not available.');
        }

        window.QAWALEB_TEMPLATE_BRIDGE.applyValues(${serializedValues});
        window.QAWALEB_TEMPLATE_BRIDGE.renderNow();

        const fontPromise = document.fonts?.ready
          ? document.fonts.ready.catch(() => undefined)
          : Promise.resolve();

        const imagePromises = Array.from(document.images || []).map((img) => {
          if (!img || img.complete) {
            return Promise.resolve();
          }
          return new Promise((imgResolve) => {
            const finish = () => imgResolve();
            img.addEventListener('load', finish, { once: true });
            img.addEventListener('error', finish, { once: true });
          });
        });

        await Promise.race([
          Promise.all([fontPromise, Promise.all(imagePromises)]),
          new Promise((timeoutResolve) => setTimeout(timeoutResolve, 5000)),
        ]);

        window.QAWALEB_TEMPLATE_BRIDGE.seek(0, false);
        await new Promise((rafResolve) => requestAnimationFrame(() => requestAnimationFrame(rafResolve)));
        resolve(true);
      } catch (error) {
        reject(error?.message || String(error));
      }
    });
  `;
}

function buildTemplateSeekScript(timeMs) {
  return `
    new Promise(async (resolve, reject) => {
      try {
        if (!window.QAWALEB_TEMPLATE_BRIDGE) {
          throw new Error('Qawaleb template bridge is not available.');
        }
        window.QAWALEB_TEMPLATE_BRIDGE.seek(${Number(timeMs || 0)}, false);
        await new Promise((rafResolve) => requestAnimationFrame(() => requestAnimationFrame(rafResolve)));
        resolve(true);
      } catch (error) {
        reject(error?.message || String(error));
      }
    });
  `;
}

function buildAudioFilter(payload, videoDurationSec) {
  const filters = [];
  const audioLabels = [];
  const inputArgs = [];
  let nextInputIndex = 1;

  const musicVolume = clamp(Number(payload.musicVolume ?? 50) / 100, 0, 1);
  const voiceoverVolume = clamp(Number(payload.voiceoverVolume ?? 100) / 100, 0, 2);

  if (hasFile(payload.music)) {
    inputArgs.push('-stream_loop', '-1', '-i', payload.music);
    filters.push(`[${nextInputIndex}:a]volume=${musicVolume.toFixed(3)},atrim=duration=${videoDurationSec.toFixed(3)}[music]`);
    audioLabels.push('[music]');
    nextInputIndex += 1;
  }

  if (hasFile(payload.voiceover)) {
    inputArgs.push('-i', payload.voiceover);
    filters.push(
      `[${nextInputIndex}:a]volume=${voiceoverVolume.toFixed(3)},` +
      `apad=pad_dur=${videoDurationSec.toFixed(3)},` +
      `atrim=duration=${videoDurationSec.toFixed(3)}[voiceover]`
    );
    audioLabels.push('[voiceover]');
    nextInputIndex += 1;
  }

  if (audioLabels.length === 0) {
    return null;
  }

  if (audioLabels.length === 1) {
    filters.push(`${audioLabels[0]}anull[aout]`);
  } else {
    filters.push(`${audioLabels.join('')}amix=inputs=${audioLabels.length}:duration=longest:normalize=0[aout]`);
  }

  return {
    inputArgs,
    filterComplex: filters.join(';'),
  };
}

function runFfmpeg(args, session, onStderr) {
  return new Promise((resolve, reject) => {
    const ffmpegProcess = spawn(ffmpegExecutable, args, {
      windowsHide: true,
      stdio: ['ignore', 'ignore', 'pipe'],
    });

    session.ffmpegProcess = ffmpegProcess;

    let stderrOutput = '';
    ffmpegProcess.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      stderrOutput += text;
      if (typeof onStderr === 'function') {
        onStderr(text);
      }
    });

    ffmpegProcess.on('error', (error) => {
      session.ffmpegProcess = null;
      reject(error);
    });

    ffmpegProcess.on('exit', (code) => {
      session.ffmpegProcess = null;

      if (session.canceled) {
        reject(new Error('تم إلغاء رندر القالب'));
        return;
      }

      if (code === 0) {
        resolve();
        return;
      }

      const message = stderrOutput.trim().split(/\r?\n/).slice(-12).join('\n');
      reject(new Error(message || `ffmpeg exited with code ${code}`));
    });
  });
}

async function waitForWindowLoad(renderWindow, targetUrl) {
  await renderWindow.loadURL(targetUrl);
  await renderWindow.webContents.executeJavaScript(
    `new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(true);
        return;
      }
      window.addEventListener('load', () => resolve(true), { once: true });
    });`,
    true,
  );
}

function getTemplateFilePath(desktopPaths, payload) {
  const templateFileName = payload?.templateFileName || '';
  if (!templateFileName) {
    throw new Error('No template file was selected for rendering.');
  }

  const templateRoot = desktopPaths.packaged
    ? path.join(desktopPaths.resourceRoot, 'qawaleb', 'templates')
    : path.join(desktopPaths.codeRoot, 'qawaleb', 'templates');
  const templateFilePath = path.join(templateRoot, path.basename(templateFileName));

  if (!fs.existsSync(templateFilePath)) {
    throw new Error(`The selected template file could not be found: ${templateFileName}`);
  }

  return templateFilePath;
}

async function captureTemplateFrames(renderWindow, session, framesDir, payload, sendProgress) {
  const fps = Math.max(1, Number(payload.fps || 25));
  const durationMs = Math.max(1000, Number(payload.durationMs || 20000));
  const totalFrames = Math.max(1, Math.round((durationMs / 1000) * fps));

  await renderWindow.webContents.executeJavaScript(
    buildTemplateRenderScript(payload.templateValues || {}),
    true,
  );

  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex += 1) {
    if (session.canceled) {
      throw new Error('تم إلغاء رندر القالب');
    }

    const timeMs = (frameIndex / fps) * 1000;
    await renderWindow.webContents.executeJavaScript(buildTemplateSeekScript(timeMs), true);

    const capturedFrame = await renderWindow.webContents.capturePage({ x: 0, y: 0, width: 1920, height: 1080 });
    const normalizedFrame = capturedFrame.resize({ width: 1920, height: 1080, quality: 'best' });
    const framePath = path.join(framesDir, `frame-${String(frameIndex + 1).padStart(6, '0')}.jpg`);
    await fs.promises.writeFile(framePath, normalizedFrame.toJPEG(92));

    sendProgress({
      stage: 'capture',
      progress: 0.08 + ((frameIndex + 1) / totalFrames) * 0.62,
      renderedFrames: frameIndex + 1,
      totalFrames,
      message: `Capturing template frames... ${frameIndex + 1}/${totalFrames}`,
    });
  }

  return { fps, totalFrames, durationMs };
}

async function encodeVideoFromFrames(session, framesDir, silentVideoPath, fps, totalFrames, sendProgress) {
  sendProgress({
    stage: 'encode',
    progress: 0.72,
    totalFrames,
    message: 'Encoding the captured frames...',
  });

  await runFfmpeg([
    '-y',
    '-framerate', String(fps),
    '-i', path.join(framesDir, 'frame-%06d.jpg'),
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    silentVideoPath,
  ], session, (stderrText) => {
    const match = stderrText.match(/frame=\s*(\d+)/);
    if (!match) {
      return;
    }
    const encodedFrames = clamp(Number(match[1] || 0), 0, totalFrames);
    sendProgress({
      stage: 'encode',
      progress: 0.72 + (encodedFrames / Math.max(totalFrames, 1)) * 0.18,
      encodedFrames,
      totalFrames,
      message: `Encoding video... ${encodedFrames}/${totalFrames}`,
    });
  });
}

async function finalizeVideoWithAudio(session, silentVideoPath, outputPath, payload, durationMs, sendProgress) {
  const videoDurationSec = Math.max(1, durationMs / 1000);
  const audioConfig = buildAudioFilter(payload, videoDurationSec);

  if (!audioConfig) {
    await fs.promises.copyFile(silentVideoPath, outputPath);
    return;
  }

  sendProgress({
    stage: 'audio',
    progress: 0.92,
    message: 'Mixing voiceover and music...',
  });

  await runFfmpeg([
    '-y',
    '-i', silentVideoPath,
    ...audioConfig.inputArgs,
    '-filter_complex', audioConfig.filterComplex,
    '-map', '0:v:0',
    '-map', '[aout]',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-shortest',
    outputPath,
  ], session);
}

async function renderQawalebVideo({
  BrowserWindow,
  desktopPaths,
  payload,
  sendProgress,
}) {
  if (activeSession) {
    throw new Error('يوجد رندر قالب جارٍ بالفعل');
  }

  const session = {
    canceled: false,
    renderWindow: null,
    ffmpegProcess: null,
    workingDir: null,
  };
  activeSession = session;

  try {
    const templateFilePath = getTemplateFilePath(desktopPaths, payload);
    const workingDir = path.join(desktopPaths.tempDir, `qawaleb-render-${Date.now()}`);
    const framesDir = path.join(workingDir, 'frames');
    const silentVideoPath = path.join(workingDir, 'qawaleb-silent.mp4');
    const outputPath = path.join(desktopPaths.outputDir, `Qawaleb_${Date.now()}.mp4`);
    session.workingDir = workingDir;

    await fs.promises.mkdir(framesDir, { recursive: true });

    sendProgress({
      stage: 'composition',
      progress: 0.04,
      message: `Loading template: ${payload.templateLabel || payload.templateId || path.basename(templateFilePath)}`,
    });

    const renderWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      show: false,
      frame: false,
      resizable: false,
      fullscreenable: false,
      webPreferences: {
        sandbox: false,
        contextIsolation: false,
        backgroundThrottling: false,
      },
    });

    session.renderWindow = renderWindow;
    renderWindow.setMenuBarVisibility(false);

    const templateUrl = `${pathToFileURL(templateFilePath).href}?embed=1&render=1`;
    await waitForWindowLoad(renderWindow, templateUrl);

    const captureStats = await captureTemplateFrames(
      renderWindow,
      session,
      framesDir,
      payload,
      sendProgress,
    );

    await encodeVideoFromFrames(
      session,
      framesDir,
      silentVideoPath,
      captureStats.fps,
      captureStats.totalFrames,
      sendProgress,
    );

    await finalizeVideoWithAudio(
      session,
      silentVideoPath,
      outputPath,
      payload,
      captureStats.durationMs,
      sendProgress,
    );

    sendProgress({
      stage: 'done',
      progress: 1,
      totalFrames: captureStats.totalFrames,
      message: 'Template render completed successfully.',
    });

    return {
      success: true,
      outputPath,
      outputDir: desktopPaths.outputDir,
      totalFrames: captureStats.totalFrames,
    };
  } catch (error) {
    if (session.canceled) {
      throw new Error('تم إلغاء رندر القالب');
    }
    throw error;
  } finally {
    if (session.ffmpegProcess && !session.ffmpegProcess.killed) {
      session.ffmpegProcess.kill('SIGINT');
    }

    if (session.renderWindow && !session.renderWindow.isDestroyed()) {
      session.renderWindow.destroy();
    }

    if (session.workingDir) {
      await fs.promises.rm(session.workingDir, { recursive: true, force: true }).catch(() => undefined);
    }

    activeSession = null;
  }
}

function cancelQawalebRender() {
  if (!activeSession) {
    return false;
  }

  activeSession.canceled = true;

  if (activeSession.ffmpegProcess && !activeSession.ffmpegProcess.killed) {
    activeSession.ffmpegProcess.kill('SIGINT');
  }

  if (activeSession.renderWindow && !activeSession.renderWindow.isDestroyed()) {
    activeSession.renderWindow.destroy();
  }

  return true;
}

module.exports = {
  renderQawalebVideo,
  cancelQawalebRender,
};
