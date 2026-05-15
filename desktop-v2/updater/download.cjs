const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function downloadFile(url, destPath, onProgress) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const file = fs.createWriteStream(destPath);
    let receivedBytes = 0;
    let totalBytes = 0;

    mod.get(url, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`Download failed with status ${res.statusCode}: ${url}`));
        return;
      }
      totalBytes = parseInt(res.headers['content-length'] || '0', 10);
      res.on('data', (chunk) => {
        receivedBytes += chunk.length;
        file.write(chunk);
        if (onProgress && totalBytes > 0) {
          onProgress({ receivedBytes, totalBytes, percent: Math.round((receivedBytes / totalBytes) * 100) });
        }
      });
      res.on('end', () => {
        file.end();
        resolve(destPath);
      });
      res.on('error', (err) => {
        file.destroy();
        reject(err);
      });
    }).on('error', (err) => {
      file.destroy();
      reject(err);
    });
  });
}

module.exports = { downloadFile };
