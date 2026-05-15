const fs = require('fs');
const path = require('path');

function _backupPrefix(fileIdentifier) {
  return encodeURIComponent(fileIdentifier);
}

function createBackup(updatesDir, relativePath) {
  const backupRoot = path.join(updatesDir, 'backups');
  const prefix = _backupPrefix(relativePath);
  const safeName = prefix + '.' + Date.now() + '.bak';
  const backupFile = path.join(backupRoot, safeName);
  const sourcePath = path.join(updatesDir, relativePath);
  if (fs.existsSync(sourcePath)) {
    fs.mkdirSync(backupRoot, { recursive: true });
    fs.copyFileSync(sourcePath, backupFile);
  }
  return backupFile;
}

// ─── Backup lookup ──────────────────────────────────────────────
// New format:  encodeURIComponent(relPath) + '.' + timestamp + '.bak'
//   Example:   templates%2Fbg_image.png.1712345678.bak
// Old format:  relPath.replace(/[\\/]/g, '_') + '.' + timestamp + '.bak'
//   Example:   templates_bg_image.png.1712345678.bak
//   Note:      Old format cannot distinguish underscores in filename
//              from path separators (known limitation).

function _findBackup(backupDir, fileIdentifier) {
  const files = fs.readdirSync(backupDir);
  const newPrefix = _backupPrefix(fileIdentifier);
  let match = files.filter(f => f.startsWith(newPrefix + '.')).sort().pop();
  if (match) return match;
  const oldPrefix = fileIdentifier.replace(/[\\/]/g, '_') + '.';
  match = files.filter(f => f.startsWith(oldPrefix)).sort().pop();
  return match;
}

// Timestamps are purely numeric; use this to isolate path + ext from the
// timestamp segment (the last dot-separated part before .bak).
const _TIMESTAMP_RE = /^\d+$/;

function _originalName(target, fileIdentifier) {
  const bakPos = target.lastIndexOf('.bak');
  if (bakPos === -1) return null;
  const timeline = target.slice(0, bakPos);
  const lastDot = timeline.lastIndexOf('.');
  if (lastDot === -1) return null;
  const afterLastDot = timeline.slice(lastDot + 1);
  if (!_TIMESTAMP_RE.test(afterLastDot)) return null;
  const encodedPath = timeline.slice(0, lastDot);
  const newPrefix = _backupPrefix(fileIdentifier);
  if (encodedPath === newPrefix) {
    return decodeURIComponent(encodedPath);
  }
  return encodedPath.replace(/_/g, path.sep);
}

function restoreBackup(updatesDir, fileIdentifier) {
  const backupDir = path.join(updatesDir, 'backups');
  if (!fs.existsSync(backupDir)) return false;
  const target = _findBackup(backupDir, fileIdentifier);
  if (!target) return false;
  const backupPath = path.join(backupDir, target);
  const originalName = _originalName(target, fileIdentifier);
  if (!originalName) return false;
  const targetPath = path.join(updatesDir, originalName);
  try {
    if (fs.existsSync(backupPath)) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(backupPath, targetPath);
      return true;
    }
  } catch {}
  return false;
}

function _matchesSafeName(filename, fileIdentifier) {
  const newPrefix = _backupPrefix(fileIdentifier);
  if (filename.startsWith(newPrefix + '.')) return true;
  const oldPrefix = fileIdentifier.replace(/[\\/]/g, '_') + '.';
  if (filename.startsWith(oldPrefix)) return true;
  return false;
}

function listBackups(updatesDir, fileIdentifier) {
  const backupDir = path.join(updatesDir, 'backups');
  if (!fs.existsSync(backupDir)) return [];
  return fs.readdirSync(backupDir).filter(f => _matchesSafeName(f, fileIdentifier)).sort();
}

function clearBackupsForFile(updatesDir, fileIdentifier) {
  const backups = listBackups(updatesDir, fileIdentifier);
  const backupDir = path.join(updatesDir, 'backups');
  for (const b of backups) {
    try { fs.unlinkSync(path.join(backupDir, b)); } catch {}
  }
}

module.exports = { createBackup, restoreBackup, listBackups, clearBackupsForFile };
