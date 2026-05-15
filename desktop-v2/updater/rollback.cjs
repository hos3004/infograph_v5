const fs = require('fs');
const path = require('path');

function createBackup(updatesDir, relativePath) {
  const backupRoot = path.join(updatesDir, 'backups');
  const safeName = relativePath.replace(/[\\/]/g, '_') + '.' + Date.now() + '.bak';
  const backupFile = path.join(backupRoot, safeName);
  const sourcePath = path.join(updatesDir, relativePath);
  if (fs.existsSync(sourcePath)) {
    fs.mkdirSync(backupRoot, { recursive: true });
    fs.copyFileSync(sourcePath, backupFile);
  }
  return backupFile;
}

function restoreBackup(updatesDir, fileIdentifier) {
  const backupDir = path.join(updatesDir, 'backups');
  if (!fs.existsSync(backupDir)) return false;
  const files = fs.readdirSync(backupDir);
  const safeName = fileIdentifier.replace(/[\\/]/g, '_');
  const target = files.filter(f => f.startsWith(safeName)).sort().pop();
  if (!target) return false;
  const backupPath = path.join(backupDir, target);
  const originalName = target.replace(/\.\d+\.bak$/, '').replace(/_/g, path.sep);
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

function listBackups(updatesDir, fileIdentifier) {
  const backupDir = path.join(updatesDir, 'backups');
  if (!fs.existsSync(backupDir)) return [];
  const safeName = fileIdentifier.replace(/[\\/]/g, '_');
  return fs.readdirSync(backupDir).filter(f => f.startsWith(safeName)).sort();
}

function clearBackupsForFile(updatesDir, fileIdentifier) {
  const backups = listBackups(updatesDir, fileIdentifier);
  const backupDir = path.join(updatesDir, 'backups');
  for (const b of backups) {
    try { fs.unlinkSync(path.join(backupDir, b)); } catch {}
  }
}

module.exports = { createBackup, restoreBackup, listBackups, clearBackupsForFile };
