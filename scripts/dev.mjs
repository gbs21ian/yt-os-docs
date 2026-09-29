import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
spawnSync(process.execPath, [path.join(root, 'scripts/build.mjs')], { stdio: 'inherit' });
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT || 4173);

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  let target = path.join(dist, decodeURIComponent(req.url.split('?')[0]));
  if (target.endsWith(path.sep)) target = path.join(target, 'index.html');
  if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) target = path.join(dist, 'index.html');
  res.setHeader('Content-Type', types[path.extname(target)] || 'application/octet-stream');
  fs.createReadStream(target).pipe(res);
}).listen(port, '0.0.0.0', () => console.log(`YT OS Docs: http://localhost:${port}`));
