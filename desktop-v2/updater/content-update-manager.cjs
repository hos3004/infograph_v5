const fs = require('fs');
const path = require('path');
const { sha256 } = require('./hash.cjs');
const { downloadFile } = require('./download.cjs');
const { validateManifest } = require('./manifest-schema.cjs');
const { createBackup, restoreBackup } = require('./rollback.cjs');

const RUNTIME_UPDATES_ROOT = 'runtime-updates';
const STATE_FILE = 'update-state.json';
const LOCK_FILE = '.updater.lock';

function getUpdatesDir(app) {
  return path.join(app.getPath('userData'), RUNTIME_UPDATES_ROOT);
}

function getStatePath(updatesDir) {
  return path.join(updatesDir, STATE_FILE);
}

function getLockPath(updatesDir) {
  return path.join(updatesDir, LOCK_FILE);
}

function acquireLock(updatesDir) {
  const lockPath = getLockPath(updatesDir);
  fs.mkdirSync(updatesDir, { recursive: true });
  try {
    const fd = fs.openSync(lockPath, 'wx');
    fs.writeSync(fd, String(process.pid));
    fs.closeSync(fd);
    return true;
  } catch (e) {
    if (e.code === 'EEXIST') {
      const stats = fs.statSync(lockPath);
      const staleMs = Date.now() - stats.mtimeMs;
      if (staleMs > 300000) {
        fs.rmSync(lockPath, { force: true });
        return acquireLock(updatesDir);
      }
      return false;
    }
    return false;
  }
}

function releaseLock(updatesDir) {
  try {
    fs.rmSync(getLockPath(updatesDir), { force: true });
  } catch {}
}

function loadState(updatesDir) {
  const statePath = getStatePath(updatesDir);
  try {
    if (fs.existsSync(statePath)) {
      const raw = fs.readFileSync(statePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore corrupt state
  }
  return {
    lastCheckedAt: null,
    lastAppliedUpdateId: null,
    assetsVersion: '1.0.0',
    templatesVersion: '1.0.0',
    promptsVersion: '1.0.0',
    bundlesVersion: '1.0.0',
    installedFiles: [],
    failedUpdates: [],
    updateHistory: [],
  };
}

function saveState(updatesDir, state) {
  try {
    fs.mkdirSync(updatesDir, { recursive: true });
    const tmpPath = getStatePath(updatesDir) + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2), 'utf-8');
    fs.renameSync(tmpPath, getStatePath(updatesDir));
  } catch (e) {
    // state save failure must never block the app
  }
}

function getRuntimePath(updatesDir, relativePath) {
  return path.join(updatesDir, relativePath);
}

function resolveWithOverlay(updatesDir, relativePath, bundledFallbackPath) {
  if (!relativePath) return bundledFallbackPath;
  const runtimePath = getRuntimePath(updatesDir, relativePath);
  try {
    if (fs.existsSync(runtimePath)) {
      return runtimePath;
    }
  } catch {}
  return bundledFallbackPath;
}

class ContentUpdateManager {
  constructor(app, manifestUrl) {
    this.app = app;
    this.manifestUrl = manifestUrl;
    this.updatesDir = getUpdatesDir(app);
    this.state = loadState(this.updatesDir);
    this._onStatus = null;
    this._latestManifest = null;
    this._changedFiles = [];
    this._pendingFiles = [];
    this._isApplying = false;
  }

  setStatusCallback(cb) {
    this._onStatus = cb;
  }

  _emit(status) {
    if (this._onStatus) this._onStatus(status);
  }

  async check() {
    if (!this.manifestUrl) {
      const msg = 'لم يتم تعيين رابط manifest التحديثات';
      this._emit({ phase: 'error', message: msg });
      return { success: false, error: msg };
    }

    this._emit({ phase: 'checking', message: 'جاري فحص تحديثات المحتوى...' });
    const tmpDir = path.join(this.updatesDir, '.tmp');
    try { fs.mkdirSync(tmpDir, { recursive: true }); } catch {}
    const tmpManifest = path.join(tmpDir, 'remote-manifest.json');

    try {
      await dl(this.manifestUrl, tmpManifest);
    } catch (e) {
      this._emit({ phase: 'error', message: 'فشل تحميل manifest التحديثات', error: e.message });
      return { success: false, error: e.message };
    }

    let remoteManifest;
    try {
      const raw = fs.readFileSync(tmpManifest, 'utf-8');
      remoteManifest = JSON.parse(raw);
    } catch (e) {
      this._emit({ phase: 'error', message: 'manifest غير صالح', error: e.message });
      return { success: false, error: 'Invalid manifest: ' + e.message };
    }

    const validation = validateManifest(remoteManifest);
    if (!validation.valid) {
      this._emit({ phase: 'error', message: 'manifest غير صالح', error: validation.error });
      return { success: false, error: validation.error };
    }

    const appVersion = this._getAppVersion();
    if (this._compareVersions(appVersion, remoteManifest.appMinVersion) < 0) {
      this._emit({ phase: 'error', message: `يتطلب إصدار ${remoteManifest.appMinVersion} على الأقل` });
      return { success: false, error: `App version too old: ${appVersion} < ${remoteManifest.appMinVersion}` };
    }

    if (remoteManifest.appMaxVersion && this._compareVersions(appVersion, remoteManifest.appMaxVersion) > 0) {
      this._emit({ phase: 'error', message: 'manifest غير متوافق مع هذا الإصدار' });
      return { success: false, error: `App version too new: ${appVersion} > ${remoteManifest.appMaxVersion}` };
    }

    const changedFiles = [];
    for (const f of remoteManifest.files) {
      const localPath = getRuntimePath(this.updatesDir, f.path);
      let needsUpdate = true;
      try {
        if (fs.existsSync(localPath)) {
          const localHash = await sha256(localPath);
          needsUpdate = localHash !== f.sha256;
        }
      } catch (e) {
        needsUpdate = true;
      }
      if (needsUpdate) {
        changedFiles.push({ ...f });
      }
    }

    const totalSize = changedFiles.reduce((s, f) => s + (f.size || 0), 0);

    this._latestManifest = remoteManifest;
    this._changedFiles = changedFiles;

    if (changedFiles.length === 0) {
      this.state.lastCheckedAt = new Date().toISOString();
      saveState(this.updatesDir, this.state);
      this._emit({ phase: 'up-to-date', message: 'جميع الملفات محدثة', changedFiles: [], totalSize: 0 });
      return { success: true, upToDate: true, changedFiles: [], totalSize: 0 };
    }

    this._emit({
      phase: 'changes-found',
      message: `تم العثور على ${changedFiles.length} ملفات للتحديث`,
      changedFiles,
      totalSize,
    });

    return { success: true, upToDate: false, changedFiles, totalSize };
  }

  async download(callbacks) {
    if (!this._changedFiles || this._changedFiles.length === 0) {
      this._emit({ phase: 'nothing-to-download', message: 'لا توجد ملفات للتنزيل' });
      return { success: true, downloaded: 0 };
    }

    const tmpDir = path.join(this.updatesDir, '.tmp');
    try { fs.mkdirSync(tmpDir, { recursive: true }); } catch {}
    this._pendingFiles = [];
    let downloaded = 0;
    const total = this._changedFiles.length;

    for (let i = 0; i < this._changedFiles.length; i++) {
      const f = this._changedFiles[i];
      this._emit({
        phase: 'downloading',
        message: `تنزيل ${f.path}`,
        current: i + 1,
        total,
        file: f,
      });

      const tmpFile = path.join(tmpDir, 'dl_' + f.path.replace(/[\\/]/g, '_'));

      try {
        await downloadFile(f.url, tmpFile, (progress) => {
          this._emit({
            phase: 'downloading',
            message: `تنزيل ${f.path} (${progress.percent}%)`,
            current: i + 1,
            total,
            file: f,
            progress,
          });
          if (callbacks && callbacks.onProgress) callbacks.onProgress(progress);
        });

        const actualSize = fs.statSync(tmpFile).size;
        if (f.size && actualSize !== f.size) {
          throw new Error(`Size mismatch for ${f.path}: expected ${f.size}, got ${actualSize}`);
        }

        const actualHash = await sha256(tmpFile);
        if (actualHash !== f.sha256) {
          throw new Error(`SHA256 mismatch for ${f.path}`);
        }

        this._pendingFiles.push({ file: f, tmpFile });
        downloaded++;
      } catch (e) {
        this._emit({ phase: 'error', message: `فشل تنزيل ${f.path}`, error: e.message });
        this._changedFiles = [];
        this._pendingFiles = [];
        return { success: false, error: e.message, downloaded };
      }
    }

    this._changedFiles = [];
    this._emit({ phase: 'download-complete', message: `تم تنزيل ${downloaded} ملفات بنجاح`, downloaded });
    return { success: true, downloaded };
  }

  async apply() {
    if (!this._pendingFiles || this._pendingFiles.length === 0) {
      this._emit({ phase: 'nothing-to-apply', message: 'لا توجد ملفات لتطبيقها' });
      return { success: true, applied: 0 };
    }

    if (!acquireLock(this.updatesDir)) {
      const msg = 'تحديث قيد التطبيق بالفعل. حاول مرة أخرى بعد قليل.';
      this._emit({ phase: 'error', message: msg });
      return { success: false, error: msg };
    }

    if (this._isApplying) {
      releaseLock(this.updatesDir);
      this._emit({ phase: 'error', message: 'تحديث قيد التطبيق بالفعل' });
      return { success: false, error: 'Already applying' };
    }
    this._isApplying = true;

    const appliedCount = this._pendingFiles.length;
    let needsRestart = false;
    const updateRecord = {
      updateId: this._latestManifest ? this._latestManifest.updateId : 'unknown-' + Date.now(),
      appliedAt: new Date().toISOString(),
      files: [],
    };

    try {
      for (const { file: f, tmpFile } of this._pendingFiles) {
        this._emit({ phase: 'applying', message: `تطبيق ${f.path}` });

        createBackup(this.updatesDir, f.path);

        const targetPath = getRuntimePath(this.updatesDir, f.path);
        try { fs.mkdirSync(path.dirname(targetPath), { recursive: true }); } catch {}
        fs.copyFileSync(tmpFile, targetPath);

        const existing = this.state.installedFiles.find(e => e.path === f.path);
        if (existing) {
          existing.sha256 = f.sha256;
          existing.appliedAt = new Date().toISOString();
        } else {
          this.state.installedFiles.push({
            path: f.path,
            sha256: f.sha256,
            category: f.category || 'unknown',
            appliedAt: new Date().toISOString(),
          });
        }

        updateRecord.files.push({
          path: f.path,
          sha256: f.sha256,
          category: f.category || 'unknown',
          restartRequired: !!f.restartRequired,
        });

        if (f.restartRequired) {
          needsRestart = true;
        }
      }

      if (this._latestManifest) {
        this.state.lastAppliedUpdateId = this._latestManifest.updateId;
        this.state.lastCheckedAt = new Date().toISOString();
        if (this._latestManifest.assetsVersion) this.state.assetsVersion = this._latestManifest.assetsVersion;
        if (this._latestManifest.templatesVersion) this.state.templatesVersion = this._latestManifest.templatesVersion;
        if (this._latestManifest.promptsVersion) this.state.promptsVersion = this._latestManifest.promptsVersion;
        if (this._latestManifest.bundlesVersion) this.state.bundlesVersion = this._latestManifest.bundlesVersion;
      }

      if (!this.state.updateHistory) this.state.updateHistory = [];
      this.state.updateHistory.push(updateRecord);
      if (this.state.updateHistory.length > 20) {
        this.state.updateHistory = this.state.updateHistory.slice(-20);
      }

      saveState(this.updatesDir, this.state);
      this._cleanupTmp();
      this._pendingFiles = [];

      if (needsRestart) {
        this._emit({ phase: 'restart-required', message: 'تتطلب بعض الملفات إعادة تشغيل التطبيق' });
      } else {
        this._emit({ phase: 'applied', message: `تم تطبيق ${appliedCount} تحديثات بنجاح` });
      }

      return { success: true, applied: appliedCount, needsRestart };
    } catch (e) {
      this._emit({ phase: 'error', message: 'فشل تطبيق التحديثات', error: e.message });
      return { success: false, error: e.message, applied: 0 };
    } finally {
      this._isApplying = false;
      releaseLock(this.updatesDir);
    }
  }

  getStatus() {
    return {
      ...this.state,
      updatesDir: this.updatesDir,
      isApplying: this._isApplying,
    };
  }

  async rollbackLast() {
    if (!this.state.updateHistory || this.state.updateHistory.length === 0) {
      if (this.state.installedFiles && this.state.installedFiles.length > 0) {
        return await this._rollbackLegacy();
      }
      this._emit({ phase: 'error', message: 'لا يوجد تحديث سابق للتراجع عنه' });
      return { success: false, error: 'No previous update to rollback' };
    }

    const lastUpdate = this.state.updateHistory.pop();
    let restored = 0;

    for (const file of lastUpdate.files) {
      const result = restoreBackup(this.updatesDir, file.path);
      if (result) {
        restored++;
        const idx = this.state.installedFiles.findIndex(e => e.path === file.path);
        if (idx !== -1) {
          this.state.installedFiles.splice(idx, 1);
        }
      }
    }

    this.state.lastAppliedUpdateId = this.state.updateHistory.length > 0
      ? this.state.updateHistory[this.state.updateHistory.length - 1].updateId
      : null;

    saveState(this.updatesDir, this.state);

    this._emit({ phase: 'rolled-back', message: `تم التراجع عن ${restored} ملفات` });
    return { success: true, restored };
  }

  async _rollbackLegacy() {
    const backupDir = path.join(this.updatesDir, 'backups');
    if (!fs.existsSync(backupDir)) {
      this._emit({ phase: 'error', message: 'لا توجد نسخ احتياطية للتراجع' });
      return { success: false, error: 'No backups found' };
    }

    let restored = 0;
    for (const entry of this.state.installedFiles || []) {
      const result = restoreBackup(this.updatesDir, entry.path);
      if (result) restored++;
    }

    this.state.lastAppliedUpdateId = null;
    this.state.installedFiles = [];
    saveState(this.updatesDir, this.state);

    this._emit({ phase: 'rolled-back', message: `تم التراجع عن ${restored} ملفات` });
    return { success: true, restored };
  }

  resolvePath(relativePath, bundledFallbackPath) {
    return resolveWithOverlay(this.updatesDir, relativePath, bundledFallbackPath);
  }

  _getAppVersion() {
    try {
      let pkgPath;
      if (this.app.isPackaged) {
        pkgPath = path.join(path.dirname(this.app.getPath('exe')), 'package.json');
        if (!fs.existsSync(pkgPath)) {
          pkgPath = path.join(this.app.getPath('userData'), '..', 'package.json');
        }
      } else {
        pkgPath = path.join(__dirname, '..', '..', 'package.json');
      }
      if (!fs.existsSync(pkgPath)) pkgPath = path.join(__dirname, '..', '..', 'package.json');
      if (fs.existsSync(pkgPath)) {
        return JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).version || '1.0.0';
      }
    } catch {}
    return '1.0.0';
  }

  _compareVersions(a, b) {
    const clean = (v) => v.replace(/[^0-9.]/g, '').split('.').map(Number);
    const pa = clean(a);
    const pb = clean(b);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const va = pa[i] || 0;
      const vb = pb[i] || 0;
      if (va > vb) return 1;
      if (va < vb) return -1;
    }
    return 0;
  }

  _cleanupTmp() {
    const tmpDir = path.join(this.updatesDir, '.tmp');
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

module.exports = { ContentUpdateManager, getUpdatesDir, getRuntimePath, resolveWithOverlay };
