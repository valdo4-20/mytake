import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, relative, sep } from 'node:path';

const root = resolve(process.cwd());
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.otf':'font/otf'};
const tmdbApi = 'https://api.themoviedb.org/3';
const tmdbToken = process.env.TMDB_TOKEN;
const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Accept, Content-Type, Authorization','Access-Control-Allow-Methods':'GET, OPTIONS'};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'OPTIONS') { res.writeHead(204, cors); res.end(); return; }
    if (url.pathname.startsWith('/api/tmdb/')) {
      if (!tmdbToken) { res.writeHead(503, {...cors, 'Content-Type':'application/json; charset=utf-8'}); res.end(JSON.stringify({error:'TMDB_TOKEN não configurado.'})); return; }
      const path = url.pathname.slice('/api/tmdb'.length);
      if (!/^\/(search\/multi|discover\/(movie|tv)|movie\/\d+|tv\/\d+)$/.test(path)) { res.writeHead(404, cors); res.end(); return; }
      const targetUrl = `${tmdbApi}${path}${url.search}`;
      const tmdbResponse = await fetch(targetUrl, {headers: {Authorization: `Bearer ${tmdbToken}`, accept: 'application/json'}});
      res.writeHead(tmdbResponse.status, {...cors, 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store'});
      res.end(await tmdbResponse.text());
      return;
    }
    const requested = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const target = resolve(root, `.${requested}`);
    if (relative(root, target).startsWith(`..${sep}`) || relative(root, target) === '..') throw new Error('Forbidden');
    const info = await stat(target);
    if (!info.isFile()) throw new Error('Not a file');
    res.writeHead(200, {'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    res.end(await readFile(target));
  } catch {
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    res.end('Arquivo não encontrado.');
  }
});
server.listen(4173, process.env.HOST || '127.0.0.1', () => console.log('MyTake aberto em http://localhost:4173'));
