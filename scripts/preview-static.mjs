// Local preview only. Deploy the out/ directory to any static web host.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const port = Number(process.env.PORT || 3000);
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.txt': 'text/plain', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
try { await stat(resolve(root, 'index.html')); }
catch { console.error('Run npm run build before starting the static preview.'); process.exit(1); }

createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return;
  }
  let file;
  try { file = resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname)); }
  catch { response.writeHead(400); response.end(); return; }
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403); response.end(); return;
  }
  for (const candidate of [file, file + '.html', resolve(file, 'index.html')]) {
    try {
      if (!(await stat(candidate)).isFile()) continue;
      const body = await readFile(candidate);
      response.writeHead(200, { 'Content-Type': mime[extname(candidate)] || 'application/octet-stream', 'Content-Length': body.length });
      response.end(request.method === 'HEAD' ? undefined : body); return;
    } catch { /* Try the next static route representation. */ }
  }
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end(request.method === 'HEAD' ? undefined : await readFile(resolve(root, '404.html')).catch(() => 'Not found'));
}).listen(port, '127.0.0.1', () => console.log(`Static preview: http://localhost:${port}`));
