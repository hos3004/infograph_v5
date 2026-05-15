const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const { ContentUpdateManager } = require('./updater/content-update-manager.cjs');

autoUpdater.logger = log;
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

let contentUpdateManager = null;

function configureChromiumStorage() {
  try {
    const localAppData = process.env.LOCALAPPDATA || process.cwd();
    const profileRoot = path.join(
      localAppData,
      app.isPackaged ? 'InfographicGeneratorDesktopV2' : 'InfographicGeneratorDesktopV2Dev',
      'electron-profile',
    );
    const sessionDataDir = path.join(profileRoot, 'session-data');
    const cacheDir = path.join(profileRoot, 'cache');
    const gpuCacheDir = path.join(cacheDir, 'GPUCache');

    [profileRoot, sessionDataDir, cacheDir, gpuCacheDir].forEach((dir) => {
      fs.mkdirSync(dir, { recursive: true });
    });

    app.setPath('sessionData', sessionDataDir);
    app.commandLine.appendSwitch('disk-cache-dir', cacheDir);
    app.commandLine.appendSwitch('gpu-shader-disk-cache-dir', gpuCacheDir);
  } catch {
    // Cache-path hardening must never block the desktop app from starting.
  }
}

configureChromiumStorage();

// ─── PNG generator (pure Node.js, no deps) ────────────────────────────────

const _CRC32_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function _crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = _CRC32_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function _pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.allocUnsafe(4); lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4); crcBuf.writeUInt32BE(_crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function generateSolidPng(w, h, r, g, b) {
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = ihdr[11] = ihdr[12] = 0;
  const rowLen = 1 + w * 3;
  const raw = Buffer.alloc(h * rowLen);
  for (let y = 0; y < h; y++) {
    const o = y * rowLen;
    raw[o] = 0;
    for (let x = 0; x < w; x++) { raw[o+1+x*3]=r; raw[o+2+x*3]=g; raw[o+3+x*3]=b; }
  }
  const idat = zlib.deflateSync(raw, { level: 6 });
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    _pngChunk('IHDR', ihdr),
    _pngChunk('IDAT', idat),
    _pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function ensurePlaceholderPng() {
  const dir = path.join(app.getPath('userData'), 'placeholders');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'content-placeholder.png');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateSolidPng(1920, 1080, 15, 23, 42));
  }
  return filePath;
}

const { findAssetPath, listAssetsSnapshot, toFileUrl } = require('./shared/assets.cjs');
const { createDesktopPaths, ensureDesktopDirs } = require('./shared/paths.cjs');
const {
  inferProjectConfigFromUrl,
  saveProject,
  openProject,
} = require('./shared/project-store.cjs');

// ─── Voiceover helpers (runs in main process, no HTTP server needed) ──────────

function truncateToWords(text, maxWords) {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return words.slice(0, maxWords).join(' ').replace(/[،,]$/, '') + '.';
}

function wordCount(text) {
  return text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

async function reviewVoiceoverTexts(texts, maxWords, { apiKey, model }) {
  const overLimit = texts
    .map((t, i) => ({ i, t }))
    .filter(({ t }) => wordCount(t) > maxWords);

  if (overLimit.length === 0) return texts;

  const numbered = overLimit.map(({ t }, n) => `${n + 1}. "${t}"`).join('\n');
  const prompt = `أعد صياغة كل نص صوتي أدناه في جملة عربية واحدة طبيعية لا تتجاوز ${maxWords} كلمة.
حافظ على الفكرة الجوهرية فقط. لا تبدأ بـ "يهدف" أو "يقترح" — ابدأ بفعل أو اسم مباشر.

النصوص للمراجعة:
${numbered}

أعد JSON فقط بهذا الشكل: {"results": ["النص 1 المُعاد", "النص 2 المُعاد", ...]}`;

  const body = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
  });

  try {
    const raw = await httpsPost(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      body,
    );
    const response = JSON.parse(raw);
    const content = response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const parsed = JSON.parse(content);
    const results = Array.isArray(parsed.results) ? parsed.results : [];

    const output = [...texts];
    overLimit.forEach(({ i }, n) => {
      const reviewed = results[n];
      if (reviewed && typeof reviewed === 'string') {
        output[i] = truncateToWords(reviewed, maxWords);
      }
    });
    return output;
  } catch {
    // If review fails, fall back to hard truncation (already applied)
    return texts;
  }
}

function buildRuleBasedNarration(slideText, maxWords = 18) {
  const cleanPart = (v) => (v || '').replace(/\s+/g, ' ').trim();
  const parts = slideText.split('++').map(cleanPart).filter(Boolean);
  const [, headline, body, highlight] = parts;
  const core = [headline, body, highlight].filter(Boolean).join('، ').replace(/\s+/g, ' ').trim();
  const fallback = cleanPart(slideText.replace(/\+\+/g, '، '));
  let narration = (core || fallback)
    .replace(/\bفي هذه الشريحة\b/g, '')
    .replace(/\bتوضح الشريحة\b/g, '')
    .replace(/\bنرى هنا\b/g, '')
    .replace(/\bالصورة تعرض\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = narration.split(/\s+/).filter(Boolean);
  if (words.length > maxWords) narration = words.slice(0, maxWords).join(' ') + '.';
  return narration;
}

function pcmToWav(pcmBuffer, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  return Buffer.concat([header, pcmBuffer]);
}

function parseSampleRate(mimeType) {
  if (!mimeType) return 24000;
  const match = mimeType.match(/rate=(\d+)/);
  if (!match) return 24000;
  const rate = parseInt(match[1], 10);
  return Number.isFinite(rate) && rate > 0 ? rate : 24000;
}

const DEFAULT_TTS_STYLE_PROMPT = 'Premium commercial. Dynamic pacing—starts intrigued, ends punchy. Tone is polished, persuasive, and inviting.';

async function callGeminiTts(text, { apiKey, ttsModel, voiceName, stylePrompt }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${ttsModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const style = (stylePrompt && stylePrompt.trim()) ? stylePrompt.trim() : DEFAULT_TTS_STYLE_PROMPT;
  const ttsInstruction = `${style}\n\nRead aloud: ${text}`;
  const promptVariants = [ttsInstruction, `Read aloud: ${text}`];

  for (const ttsPrompt of promptVariants) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: ttsPrompt }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
        },
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result?.error?.message || `Gemini TTS HTTP ${res.status}`);

    const part = result.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (part?.inlineData?.data) {
      return { data: part.inlineData.data, mimeType: part.inlineData.mimeType };
    }
  }
  throw new Error('Gemini TTS did not return audio data');
}

let mainWindow = null;
let renderWorker = null;
let requestCounter = 0;
const pendingRequests = new Map();

function createPaths() {
  return createDesktopPaths({
    packaged: app.isPackaged,
    appHome: app.isPackaged
      ? path.dirname(app.getPath('exe'))
      : path.join(process.env.LOCALAPPDATA || process.cwd(), 'InfographicGeneratorDesktopV2Dev'),
    resourcesPath: process.resourcesPath,
  });
}

const desktopPaths = createPaths();

function initContentUpdateManager() {
  if (contentUpdateManager) return contentUpdateManager;
  contentUpdateManager = new ContentUpdateManager(app, process.env.CONTENT_UPDATE_MANIFEST_URL || 'http://127.0.0.1:8089/content-updates/update-manifest.json');
  return contentUpdateManager;
}

function getAppVersion() {
  try {
    const packageJsonPath = path.join(desktopPaths.repoRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version || '1.0.0';
  } catch {
    return '1.0.0';
  }
}

function getProjectConfigForEvent(event, payload = null) {
  const senderUrl = event.senderFrame?.url || event.sender?.getURL?.() || '';
  const config = inferProjectConfigFromUrl(senderUrl);
  const payloadType = payload?.projectType || payload?.project?.projectType;
  if (payloadType && payloadType !== config.projectType) {
    throw new Error(`هذا الملف ليس مشروع ${config.displayName} صالحًا`);
  }
  return config;
}

function readFileAsDataUrl(filePath) {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      return null;
    }

    const extension = path.extname(filePath).toLowerCase();
    const mimeTypeMap = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.otf': 'font/otf',
      '.ttf': 'font/ttf',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
    };
    const mimeType = mimeTypeMap[extension] || 'application/octet-stream';
    const base64 = fs.readFileSync(filePath).toString('base64');
    return `data:${mimeType};base64,${base64}`;
  } catch {
    return null;
  }
}

function writeWorkerLog(prefix, value) {
  try {
    fs.mkdirSync(desktopPaths.appHome, { recursive: true });
    fs.appendFileSync(
      path.join(desktopPaths.appHome, 'desktop-v2-worker.log'),
      `[${new Date().toISOString()}] ${prefix} ${value}\n`,
    );
  } catch {
    // Logging must never break the desktop app.
  }
}

function sendProgress(payload) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send('desktop:render-progress', payload);
}

function clearPendingRequests(errorMessage, targetWorkerName = null) {
  for (const [requestId, pending] of pendingRequests.entries()) {
    if (targetWorkerName && pending.workerName !== targetWorkerName) {
      continue;
    }

    pending.reject(new Error(errorMessage));
    pendingRequests.delete(requestId);
  }
}

let renderWorkerInfograph = null;
let renderWorkerMotadawel = null;
let renderWorkerPersonalities = null;
let renderWorkerLaqtat = null;
let renderWorkerSowar = null;
let renderWorkerQawaleb = null;

function getWorkerName(model) {
  if (model === 'motadawel') return 'motadawel';
  if (model === 'personalities') return 'personalities';
  if (model === 'laqtat') return 'laqtat';
  if (model === 'sowar') return 'sowar';
  if (model === 'qawaleb') return 'qawaleb';
  return 'infograph';
}

function getWorkerRef(workerName) {
  if (workerName === 'motadawel') return renderWorkerMotadawel;
  if (workerName === 'personalities') return renderWorkerPersonalities;
  if (workerName === 'laqtat') return renderWorkerLaqtat;
  if (workerName === 'sowar') return renderWorkerSowar;
  if (workerName === 'qawaleb') return renderWorkerQawaleb;
  return renderWorkerInfograph;
}

function setWorkerRef(workerName, worker) {
  if (workerName === 'motadawel') renderWorkerMotadawel = worker;
  else if (workerName === 'personalities') renderWorkerPersonalities = worker;
  else if (workerName === 'laqtat') renderWorkerLaqtat = worker;
  else if (workerName === 'sowar') renderWorkerSowar = worker;
  else if (workerName === 'qawaleb') renderWorkerQawaleb = worker;
  else renderWorkerInfograph = worker;
}

function spawnRenderWorker(model) {
  const workerName = getWorkerName(model);
  let activeWorker = getWorkerRef(workerName);

  if (activeWorker && !activeWorker.killed) {
    return activeWorker;
  }

  let workerEntry;
  if (workerName === 'motadawel') {
    workerEntry = path.join(desktopPaths.codeRoot, 'motadawel', 'worker', 'render-worker-motadawel.cjs');
  } else if (workerName === 'personalities') {
    workerEntry = path.join(desktopPaths.codeRoot, 'personalities', 'worker', 'render-worker-personalities.cjs');
  } else if (workerName === 'laqtat') {
    workerEntry = path.join(desktopPaths.codeRoot, 'laqtat', 'worker', 'render-worker-laqtat.cjs');
  } else if (workerName === 'sowar') {
    workerEntry = path.join(desktopPaths.codeRoot, 'sowar', 'worker', 'render-worker-sowar.cjs');
  } else if (workerName === 'qawaleb') {
    workerEntry = path.join(desktopPaths.codeRoot, 'qawaleb', 'worker', 'render-worker-qawaleb.cjs');
  } else {
    workerEntry = desktopPaths.workerScript;
  }

  const workerCwd = app.isPackaged ? desktopPaths.appHome : desktopPaths.repoRoot;

  const newWorker = spawn(process.execPath, [workerEntry], {
    cwd: workerCwd,
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
      DESKTOP_V2_PACKAGED: String(app.isPackaged),
      DESKTOP_V2_APP_HOME: desktopPaths.appHome,
      DESKTOP_V2_RESOURCES_PATH: process.resourcesPath,
    },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
    windowsHide: true,
  });

  newWorker.stdout.on('data', (data) => {
    writeWorkerLog(`stdout[${workerName}]`, data.toString().trim());
  });

  newWorker.stderr.on('data', (data) => {
    writeWorkerLog(`stderr[${workerName}]`, data.toString().trim());
  });

  newWorker.on('error', (error) => {
    writeWorkerLog(`spawn-error[${workerName}]`, error.stack || error.message);
    clearPendingRequests(`Failed to start ${workerName} render worker: ${error.message}`, workerName);
    setWorkerRef(workerName, null);
  });

  newWorker.on('message', (message) => {
    if (!message || typeof message !== 'object') return;

    if (message.type === 'progress') {
      sendProgress(message.payload);
      return;
    }

    if (message.type !== 'response') return;

    const pending = pendingRequests.get(message.id);
    if (!pending) return;

    pendingRequests.delete(message.id);

    if (message.ok) {
      pending.resolve(message.payload);
      return;
    }

    pending.reject(new Error(message.error || `${workerName} worker failed`));
  });

  newWorker.on('exit', (code, signal) => {
    writeWorkerLog(`exit[${workerName}]`, `code=${code ?? 'null'} signal=${signal ?? 'null'}`);
    clearPendingRequests(`${workerName} worker stopped unexpectedly`, workerName);
    setWorkerRef(workerName, null);
  });

  setWorkerRef(workerName, newWorker);

  return newWorker;
}

function requestWorker(action, payload) {
  return new Promise((resolve, reject) => {
    const activeWorker = spawnRenderWorker(payload?.model);

    const id = `req-${Date.now()}-${++requestCounter}`;
    const workerName = getWorkerName(payload?.model);
    pendingRequests.set(id, { resolve, reject, workerName });

    if (!activeWorker || !activeWorker.connected) {
      pendingRequests.delete(id);
      reject(new Error('Render worker is not available'));
      return;
    }

    activeWorker.send({ id, action, payload }, (error) => {
      if (!error) {
        return;
      }

      pendingRequests.delete(id);
      reject(new Error(`Failed to send render request: ${error.message}`));
    });
  });
}

async function createWindow() {
  ensureDesktopDirs(desktopPaths);

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 920,
    minWidth: 1100,
    minHeight: 760,
    show: false,
    backgroundColor: '#f4f1ec',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: desktopPaths.preloadScript,
    },
  });

  mainWindow.webContents.on('context-menu', (_event, params) => {
    const template = [];
    const hasSelection = Boolean(params.selectionText && params.selectionText.trim());

    if (params.isEditable) {
      template.push(
        { role: 'undo', label: 'تراجع' },
        { role: 'redo', label: 'إعادة' },
        { type: 'separator' },
        { role: 'cut', label: 'قص' },
        { role: 'copy', label: 'نسخ' },
        { role: 'paste', label: 'لصق' },
        { role: 'pasteAndMatchStyle', label: 'لصق مع مطابقة التنسيق' },
        { role: 'delete', label: 'حذف' },
        { type: 'separator' },
        { role: 'selectAll', label: 'تحديد الكل' },
      );
    } else if (hasSelection) {
      template.push(
        { role: 'copy', label: 'نسخ' },
        { type: 'separator' },
        { role: 'selectAll', label: 'تحديد الكل' },
      );
    } else {
      template.push({ role: 'selectAll', label: 'تحديد الكل' });
    }

    Menu.buildFromTemplate(template).popup({ window: mainWindow });
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  await mainWindow.loadFile(desktopPaths.rendererHtml);
}

function buildBootstrapPayload() {
  const logoPath = findAssetPath(desktopPaths, 'root', 'logo.png');
  const fontPath = findAssetPath(desktopPaths, 'fonts', 'alfont_com_AlFont_com_AvenirArabic-Heavy.otf')
    || findAssetPath(desktopPaths, 'root', 'alfont_com_AlFont_com_AvenirArabic-Heavy.otf');
  const displayFontPath = findAssetPath(desktopPaths, 'fonts', 'rb.ttf')
    || findAssetPath(desktopPaths, 'root', 'rb.ttf');
  const qawalebDefaultBackgroundPath = path.join(
    desktopPaths.publicDir,
    'assets',
    'qawaleb',
    'backgrounds',
    'rm380-05.jpg',
  );
  return {
    mode: app.isPackaged ? 'packaged' : 'development',
    appHome: desktopPaths.appHome,
    outputDir: desktopPaths.outputDir,
    assetsDir: desktopPaths.assetsDir,
    appVersion: getAppVersion(),
    logoDataUrl: readFileAsDataUrl(logoPath),
    fontDataUrl: readFileAsDataUrl(fontPath),
    rbFontDataUrl: readFileAsDataUrl(displayFontPath),
    qawalebDefaultBackgroundDataUrl: readFileAsDataUrl(qawalebDefaultBackgroundPath),
    assets: listAssetsSnapshot(desktopPaths),
    placeholderPath: ensurePlaceholderPng(),
  };
}

ipcMain.handle('desktop:bootstrap', async () => buildBootstrapPayload());

ipcMain.handle('project:save', async (event, payload) => {
  try {
    const config = getProjectConfigForEvent(event, payload);
    return await saveProject({
      dialog,
      browserWindow: BrowserWindow.fromWebContents(event.sender),
      payload,
      config,
      appVersion: getAppVersion(),
      forceSaveAs: false,
    });
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('project:saveAs', async (event, payload) => {
  try {
    const config = getProjectConfigForEvent(event, payload);
    return await saveProject({
      dialog,
      browserWindow: BrowserWindow.fromWebContents(event.sender),
      payload,
      config,
      appVersion: getAppVersion(),
      forceSaveAs: true,
    });
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('project:open', async (event, context) => {
  try {
    const config = getProjectConfigForEvent(event, context?.project || null);
    return await openProject({
      dialog,
      browserWindow: BrowserWindow.fromWebContents(event.sender),
      context,
      config,
      appVersion: getAppVersion(),
    });
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('desktop:refresh-assets', async () => listAssetsSnapshot(desktopPaths));

ipcMain.handle('desktop:pick-slides', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select slide media',
    filters: [{ name: 'Media', extensions: ['png', 'jpg', 'jpeg', 'webp', 'mp4', 'mov', 'webm'] }],
    properties: ['openFile', 'multiSelections'],
  });

  if (result.canceled) {
    return [];
  }

  return result.filePaths.map((filePath, index) => ({
    id: `slide-${Date.now()}-${index}`,
    imagePath: filePath,
    fileUrl: toFileUrl(filePath),
    text: '',
    isMuted: true,
  }));
});

ipcMain.handle('desktop:pick-slide-image', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select replacement slide image',
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    imagePath: filePath,
    fileUrl: toFileUrl(filePath),
  };
});

ipcMain.handle('desktop:pick-template-image', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select template image',
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    imagePath: filePath,
    fileUrl: toFileUrl(filePath),
  };
});

ipcMain.handle('desktop:pick-main-video', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select main video',
    filters: [{ name: 'Videos', extensions: ['mp4', 'mov', 'webm'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    path: filePath,
    url: toFileUrl(filePath),
  };
});

ipcMain.handle('desktop:pick-main-image', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select main image',
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    path: filePath,
    url: toFileUrl(filePath),
  };
});

ipcMain.handle('desktop:pick-voiceover', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select Voiceover audio',
    filters: [{ name: 'Audio', extensions: ['mp3', 'wav', 'm4a', 'aac'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    path: filePath,
    url: toFileUrl(filePath),
  };
});

ipcMain.handle('desktop:render', async (_event, payload) => {
  sendProgress({
    stage: 'queued',
    progress: 0,
    message: 'Preparing render job...',
  });

  return requestWorker('render', payload);
});

ipcMain.handle('desktop:cancel-render', async (_event, payload) => {
  const workerName = getWorkerName(payload?.model);
  const worker = getWorkerRef(workerName);
  if (worker && !worker.killed) {
    worker.kill('SIGINT');
    writeWorkerLog(`cancel[${workerName}]`, 'Render worker killed by user');
    return true;
  }
  return false;
});

ipcMain.handle('desktop:open-output-folder', async () => shell.openPath(desktopPaths.outputDir));

ipcMain.handle('desktop:reveal-in-folder', async (_event, targetPath) => shell.showItemInFolder(targetPath));

ipcMain.handle('desktop:open-file', async (_event, targetPath) => shell.openPath(targetPath));

function getSettingsPath() {
  return path.join(app.getPath('userData'), 'infograph-settings.json');
}

ipcMain.handle('desktop:get-settings', async () => {
  try {
    const settingsPath = getSettingsPath();
    if (!fs.existsSync(settingsPath)) return {};
    const raw = fs.readFileSync(settingsPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
});

ipcMain.handle('desktop:save-settings', async (_event, settings) => {
  try {
    const settingsPath = getSettingsPath();
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('desktop:generate-single-voiceover', async (_event, payload) => {
  const {
    text,
    voiceName = 'Charon',
    ttsModel = 'gemini-2.5-flash-preview-tts',
    apiKey: payloadKey,
    stylePrompt: payloadStylePrompt,
  } = payload;

  if (!text || !text.trim()) {
    return { success: false, error: 'النص مطلوب لتوليد التعليق الصوتي.' };
  }

  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  let stylePrompt = payloadStylePrompt && payloadStylePrompt.trim() ? payloadStylePrompt.trim() : null;
  if (!apiKey || !stylePrompt) {
    try {
      const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
      const saved = JSON.parse(raw);
      if (!apiKey) apiKey = saved.geminiApiKey || null;
      if (!stylePrompt) stylePrompt = saved.ttsStylePrompt || null;
    } catch {}
  }
  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_TTS_API_KEY || null;
  }
  if (!apiKey) {
    return { success: false, error: 'مفتاح Gemini API مفقود. أضفه في إعدادات البرنامج (⚙️).' };
  }

  try {
    const normalizedText = text.replace(/\s+/g, ' ').trim();
    const { data, mimeType } = await callGeminiTts(normalizedText, { apiKey, ttsModel, voiceName, stylePrompt });

    const pcmBuffer = Buffer.from(data, 'base64');
    const sampleRate = parseSampleRate(mimeType);
    const wavBuffer = pcmToWav(pcmBuffer, sampleRate);

    const voiceoverDir = path.join(app.getPath('userData'), 'voiceovers');
    fs.mkdirSync(voiceoverDir, { recursive: true });

    const hash = crypto.createHash('sha1').update(normalizedText).digest('hex').slice(0, 10);
    const fileName = `vo-single-${Date.now()}-${hash}.wav`;
    const filePath = path.join(voiceoverDir, fileName);
    fs.writeFileSync(filePath, wavBuffer);

    const durationMs = Math.round(((wavBuffer.length - 44) / (sampleRate * 2)) * 1000);

    return {
      success: true,
      voiceoverPath: filePath,
      voiceoverUrl: toFileUrl(filePath),
      durationMs,
    };
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('desktop:generate-content-slides', async (_event, payload) => {
  const {
    topic,
    slideCount = 10,
    contentStyle = 'وثائقي',
    textPreset = 'automatic',
    maxWords: payloadMaxWords,
    apiKey: payloadKey,
    model: payloadModel,
    systemPrompt: payloadPrompt,
  } = payload;

  if (!topic || !topic.trim()) {
    return { success: false, error: 'يرجى إدخال نص أو موضوع أولاً' };
  }

  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  let contentModel = payloadModel && payloadModel.trim() ? payloadModel.trim() : null;
  let systemPrompt = payloadPrompt && payloadPrompt.trim() ? payloadPrompt.trim() : null;

  try {
    const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
    const saved = JSON.parse(raw);
    if (!apiKey) apiKey = saved.geminiApiKey || null;
    if (!contentModel) contentModel = saved.contentModel || null;
    if (!systemPrompt) systemPrompt = saved.contentSystemPrompt || null;
  } catch {}

  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_TTS_API_KEY || null;
  }
  if (!apiKey) {
    return { success: false, error: 'مفتاح Gemini API مفقود. أضفه في إعدادات البرنامج (⚙️).' };
  }

  contentModel = contentModel || 'gemini-2.5-flash';

  const defaultSystemPrompt = `أنت كاتب إنفوجراف تلفزيوني عربي محترف ومحرر تلفزيوني وكاتب سكريبت صوتي.
مهمتك: تحويل الموضوعات العربية إلى شرائح إنفوجراف مرئية موجزة وسكريبت تعليق صوتي منفصل.
نص الشاشة يجب أن يكون قصيراً ومرئياً. السكريبت الصوتي يجب أن يكون سلساً ومهنياً بأسلوب التلفزيون العربي.
أعد JSON صارماً فقط بدون أي نص خارجه.`;

  systemPrompt = systemPrompt || defaultSystemPrompt;

  const count = Math.min(30, Math.max(3, Number(slideCount) || 10));
  const voMaxWords = Math.max(8, Math.min(30, Number(payloadMaxWords) || 18));
  const preset = textPreset === 'automatic' ? 'news-ledger' : textPreset;

  const userPrompt = `حوّل الموضوع التالي إلى ${count} شريحة إنفوجراف.

أسلوب المحتوى: ${contentStyle}
نمط حركة النص المُفضَّل: ${preset}

⚠️ قاعدة صارمة لـ voiceoverText: أقصى عدد مسموح هو ${voMaxWords} كلمة عربية فقط لكل شريحة — لا استثناءات.
إذا كتبت أكثر من ${voMaxWords} كلمة فستُقطع تلقائياً. اكتب جملة واحدة قصيرة ومكثّفة فقط.

لكل شريحة أعد:
- title: عنوان داخلي مختصر
- text: نص الشاشة — أربعة أجزاء قصيرة مفصولة بـ "++" (كيكر ++ عنوان ++ شرح ++ خلاصة)
- voiceoverText: جملة صوتية عربية واحدة، من ${Math.max(8, voMaxWords - 3)} إلى ${voMaxWords} كلمة كحد أقصى، تُعبّر عن جوهر الشريحة بأسلوب إذاعي طبيعي
- imagePrompt: وصف بالإنجليزية لصورة سينمائية واقعية بدون نص أو شعارات
- visualHint: توجيه بصري عربي مختصر

أعد هذا الشكل من JSON فقط:
{
  "slides": [
    {
      "title": "عنوان داخلي",
      "text": "كيكر ++ عنوان قوي ++ شرح مختصر ++ خلاصة",
      "voiceoverText": "سكريبت صوتي عربي طبيعي من ${Math.max(8, voMaxWords - 3)}-${voMaxWords} كلمة لهذه الشريحة.",
      "imagePrompt": "English cinematic realistic visual prompt, no text, no logos",
      "visualHint": "توجيه بصري"
    }
  ],
  "fullScript": "سكريبت الشريحة 1.\n\nسكريبت الشريحة 2.\n\n..."
}

الموضوع:
${topic}`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${contentModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result?.error?.message || `HTTP ${res.status}`);

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('لم يُرجع النموذج أي محتوى');

    let parsed;
    try { parsed = JSON.parse(rawText); } catch { throw new Error('فشل تحليل JSON من النموذج'); }

    const slides = Array.isArray(parsed.slides) ? parsed.slides : [];
    if (slides.length === 0) throw new Error('لم تُولَّد أي شرائح');

    const placeholderPath = ensurePlaceholderPng();
    const placeholderUrl = toFileUrl(placeholderPath);

    const now = Date.now();

    // First pass: hard-truncate as safety net
    const rawVoiceovers = slides.map((s) => truncateToWords(s.voiceoverText || '', voMaxWords));

    // Second pass: ask Gemini to intelligently rewrite any that were over the limit
    const reviewedVoiceovers = await reviewVoiceoverTexts(
      rawVoiceovers,
      voMaxWords,
      { apiKey, model: contentModel },
    );

    const mappedSlides = slides.map((s, i) => ({
      id: `generated-${now}-${i}`,
      title: s.title || '',
      text: s.text || '',
      voiceoverText: reviewedVoiceovers[i] || rawVoiceovers[i],
      imagePrompt: s.imagePrompt || '',
      visualHint: s.visualHint || '',
      imagePath: placeholderPath,
      fileUrl: placeholderUrl,
      isMuted: true,
    }));

    const fullScript = mappedSlides.map((s) => s.voiceoverText).filter(Boolean).join('\n\n');

    return { success: true, slides: mappedSlides, fullScript };
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});


ipcMain.handle('desktop:generate-personality-scenes', async (_event, payload) => {
  const {
    script,
    sceneCount = 12,
    visualStyleLabel = 'وثائقي واقعي مصري',
    visualStyleInjection = '',
    voiceDialect = 'msa',
    diacritics = false,
    characterReference = '',
    globalRules = '',
    prisonRules = '',
    timeRules = '',
    imageTemplate = '',
    motionTemplate = '',
    singleScene = null,
    apiKey: payloadKey,
    model: payloadModel,
  } = payload || {};

  const sourceText = singleScene?.sourceExcerpt || script || '';
  if (!sourceText.trim()) {
    return { success: false, error: 'يرجى إدخال النص الرئيسي أولاً' };
  }

  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  let contentModel = payloadModel && payloadModel.trim() ? payloadModel.trim() : null;

  try {
    const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
    const saved = JSON.parse(raw);
    if (!apiKey) apiKey = saved.geminiApiKey || null;
    if (!contentModel) contentModel = saved.contentModel || null;
  } catch {}

  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_TTS_API_KEY || null;
  }
  if (!apiKey) {
    return { success: false, error: 'مفتاح Gemini API مفقود. أضفه في إعدادات البرنامج (⚙️).' };
  }

  contentModel = contentModel || 'gemini-2.5-flash';
  const count = Math.max(1, Math.min(60, Number(sceneCount) || 12));

  const systemPrompt = `You are a professional documentary scene planner and cinematic prompt writer.
Return valid JSON only.
Do not add facts not present in the script.
Preserve chronological order.
Voiceover text must be Arabic.
Image prompts and motion prompts must be English.
Every image prompt must start with: Scene XX — Image Prompt:
Every motion prompt must start with: Scene XX — Motion Prompt:
Do not include visible text, subtitles, logos, signs, banners, or watermarks.
The selected visual style must preserve the time period and environment of each scene.`;

  const userPrompt = singleScene ? `Regenerate only this one scene as JSON with one item in scenes.

Scene to regenerate:
${JSON.stringify(singleScene, null, 2)}` : `Transform the Arabic biography/documentary script into exactly ${count} coherent scenes.

Visual style label: ${visualStyleLabel}
Visual style injection:
${visualStyleInjection}

Voice dialect: ${voiceDialect}
Diacritics requested for Arabic voiceover endings: ${diacritics ? 'yes' : 'no'}

Character reference rule:
${characterReference}

Global prompt rules:
${globalRules}

Prison scene rules:
${prisonRules}

Time accuracy rules:
${timeRules}

Image prompt template:
${imageTemplate}

Motion prompt template:
${motionTemplate}

Return JSON only in this shape:
{
  "scenes": [
    {
      "sceneNumber": 1,
      "title": "",
      "sourceExcerpt": "",
      "timePeriod": "",
      "location": "",
      "voiceoverText": "",
      "imagePrompt": "Scene 01 — Image Prompt:\n...",
      "motionPrompt": "Scene 01 — Motion Prompt:\n..."
    }
  ]
}

Script:
${sourceText}`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${contentModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.55 },
      }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.error?.message || `HTTP ${res.status}`);
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('لم يُرجع النموذج أي محتوى');
    let parsed;
    try { parsed = JSON.parse(rawText); } catch { throw new Error('فشل تحليل JSON من النموذج'); }
    const scenes = Array.isArray(parsed.scenes) ? parsed.scenes : [];
    if (scenes.length === 0) throw new Error('لم يتم توليد أي مشاهد');
    return { success: true, scenes };
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});


ipcMain.handle('desktop:generate-voiceovers', async (_event, payload) => {
  const {
    slides = [],
    voiceName = 'Charon',
    ttsModel = 'gemini-2.5-flash-preview-tts',
    apiKey: payloadKey,
    stylePrompt: payloadStylePrompt,
    maxWords = 18,
  } = payload;

  // Resolve API key + style prompt: payload → settings file → env var
  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  let stylePrompt = payloadStylePrompt && payloadStylePrompt.trim() ? payloadStylePrompt.trim() : null;
  if (!apiKey || !stylePrompt) {
    try {
      const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
      const saved = JSON.parse(raw);
      if (!apiKey) apiKey = saved.geminiApiKey || null;
      if (!stylePrompt) stylePrompt = saved.ttsStylePrompt || null;
    } catch {}
  }
  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_TTS_API_KEY || null;
  }
  if (!apiKey) {
    return { success: false, error: 'مفتاح Gemini API مفقود. أضفه في إعدادات البرنامج (⚙️).' };
  }

  const voiceoverDir = path.join(app.getPath('userData'), 'voiceovers');
  fs.mkdirSync(voiceoverDir, { recursive: true });

  const updatedSlides = [];
  const errors = [];

  for (const slide of slides) {
    if (!slide?.text?.trim()) {
      updatedSlides.push(slide);
      continue;
    }
    try {
      const narrationText = slide.voiceoverText?.trim() || buildRuleBasedNarration(slide.text, maxWords);
      const { data, mimeType } = await callGeminiTts(narrationText, { apiKey, ttsModel, voiceName, stylePrompt });

      const pcmBuffer = Buffer.from(data, 'base64');
      const sampleRate = parseSampleRate(mimeType);
      const wavBuffer = pcmToWav(pcmBuffer, sampleRate);

      const hash = crypto.createHash('sha1').update(narrationText).digest('hex').slice(0, 10);
      const fileName = `vo-${Date.now()}-${hash}.wav`;
      const filePath = path.join(voiceoverDir, fileName);
      fs.writeFileSync(filePath, wavBuffer);

      const durationMs = Math.round(((wavBuffer.length - 44) / (sampleRate * 2)) * 1000);

      updatedSlides.push({
        ...slide,
        voiceoverText: narrationText,
        voiceoverUrl: toFileUrl(filePath),
        voiceoverPath: filePath,
        voiceoverDurationMs: durationMs,
      });
    } catch (err) {
      errors.push({ id: slide.id, error: err?.message || String(err) });
      updatedSlides.push(slide);
    }
  }

  return { success: errors.length === 0, slides: updatedSlides, errors };
});

// ─── Auto Updater (Core App) ──────────────────────────────────────────────

autoUpdater.on('checking-for-update', () => {
  log.info('AutoUpdater: checking for update');
});

autoUpdater.on('update-available', (info) => {
  log.info('AutoUpdater: update available', info);
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('core-updater:status', { phase: 'update-available', info });
  }
});

autoUpdater.on('update-not-available', (info) => {
  log.info('AutoUpdater: update not available');
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('core-updater:status', { phase: 'update-not-available', info });
  }
});

autoUpdater.on('download-progress', (progress) => {
  log.info(`AutoUpdater: download progress ${progress.percent}%`);
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('core-updater:status', { phase: 'download-progress', progress });
  }
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('AutoUpdater: update downloaded');
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('core-updater:status', { phase: 'update-downloaded', info });
  }
});

autoUpdater.on('error', (err) => {
  log.error('AutoUpdater: error', err);
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('core-updater:status', { phase: 'error', error: err.message || String(err) });
  }
});

ipcMain.handle('core-updater:check', async () => {
  try {
    autoUpdater.checkForUpdates();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('core-updater:download', async () => {
  try {
    autoUpdater.downloadUpdate();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('core-updater:install', async () => {
  try {
    setImmediate(() => autoUpdater.quitAndInstall(true, true));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// ─── Content Updater (Lightweight) ─────────────────────────────────────────

ipcMain.handle('content-updater:check', async () => {
  try {
    const mgr = initContentUpdateManager();
    const result = await mgr.check();
    return { success: true, ...result };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('content-updater:download', async () => {
  try {
    const mgr = initContentUpdateManager();
    const result = await mgr.download();
    return { success: true, ...result };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('content-updater:apply', async () => {
  try {
    const mgr = initContentUpdateManager();
    const result = await mgr.apply();
    return { success: true, ...result };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('content-updater:get-status', async () => {
  try {
    const mgr = initContentUpdateManager();
    return { success: true, status: mgr.getStatus() };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('content-updater:rollback-last', async () => {
  try {
    const mgr = initContentUpdateManager();
    const result = await mgr.rollbackLast();
    return { success: true, ...result };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('content-updater:open-runtime-folder', async () => {
  try {
    const mgr = initContentUpdateManager();
    const dir = mgr.updatesDir;
    fs.mkdirSync(dir, { recursive: true });
    shell.openPath(dir);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle('content-updater:resolve-path', async (_event, relativePath, bundledFallbackPath) => {
  try {
    const mgr = initContentUpdateManager();
    return { success: true, path: mgr.resolvePath(relativePath, bundledFallbackPath) };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

app.whenReady().then(() => {
  initContentUpdateManager();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (renderWorkerInfograph && !renderWorkerInfograph.killed) {
    renderWorkerInfograph.kill();
  }
  if (renderWorkerMotadawel && !renderWorkerMotadawel.killed) {
    renderWorkerMotadawel.kill();
  }
  if (renderWorkerPersonalities && !renderWorkerPersonalities.killed) {
    renderWorkerPersonalities.kill();
  }
  if (renderWorkerLaqtat && !renderWorkerLaqtat.killed) {
    renderWorkerLaqtat.kill();
  }
  if (renderWorkerSowar && !renderWorkerSowar.killed) {
    renderWorkerSowar.kill();
  }
  if (renderWorkerQawaleb && !renderWorkerQawaleb.killed) {
    renderWorkerQawaleb.kill();
  }
});
