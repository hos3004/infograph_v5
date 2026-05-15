const fs = require('fs');
const path = require('path');

function createBackup(updatesDir, relativePath) {
  const backupRoot = path.join(updatesDir, 'backups');
  const backupFile = path.join(backupRoot, relativePath.replace(/[\\/]/g, '_') + '.' + Date.now() + '.bak');
  const sourcePath = path.join(updatesDir, relativePath);
  if (fs.existsSync(sourcePath)) {
    fs.mkdirSync(path.dirname(backupFile), { recursive: true });
    fs.copyFileSync(sourcePath, backupFile);
  }
  return backupFile;
}

function restoreBackup(updatesDir, backupId) {
  const backupDir = path.join(updatesDir, 'backups');
  if (!fs.existsSync(backupDir)) return false;
  const files = fs.readdirSync(backupDir);
  const target = files.filter(f => f.includes(backupId)).sort().pop();
  if (!target) return false;
  const backupPath = path.join(backupDir, target);
  const originalName = target.replace(/\.\d+\.bak$/, '').replace(/_/g, path.sep);
  const targetPath = path.join(updatesDir, originalName);
  if (fs.existsSync(backupPath)) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(backupPath, targetPath);
    return true;
  }
  return false;
}

module.exports = { createBackup, restoreBackup };
