const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8089;
const LAB_ROOT = path.resolve(__dirname, '..', '..', 'lab-update-server');

const MIME_TYPES = {
  '.json': 'application/json',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.exe': 'application/octet-stream',
  '.blockmap': 'application/octet-stream',
  '.yml': 'text/yaml',
  '.yaml': 'text/yaml',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(LAB_ROOT, req.url === '/' ? '' : req.url);
  filePath = path.resolve(filePath);

  if (!filePath.startsWith(LAB_ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found: ' + req.url);
      console.log(`404 ${req.url}`);
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        filePath = indexPath;
      } else {
        fs.readdir(filePath, (err, files) => {
          if (err) { res.writeHead(500); res.end('Error'); return; }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<ul>' + files.map(f => `<li><a href="${req.url.replace(/\/$/, '')}/${f}">${f}</a></li>`).join('') + '</ul>');
        });
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    console.log(`200 ${req.url}`);
  });
});

server.listen(PORT, () => {
  console.log(`Lab update server running at http://127.0.0.1:${PORT}`);
  console.log(`Core updates:  http://127.0.0.1:${PORT}/core-updates/`);
  console.log(`Content manifest: http://127.0.0.1:${PORT}/content-updates/update-manifest.json`);
});
