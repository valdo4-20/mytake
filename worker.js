const TMDB_API = 'https://api.themoviedb.org/3';
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept, Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers: cors});
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/tmdb/')) return new Response('Not found', {status: 404, headers: cors});
    const path = url.pathname.slice('/api/tmdb'.length);
    if (!/^\/(search\/multi|discover\/(movie|tv)|movie\/\d+|tv\/\d+)$/.test(path)) {
      return new Response('Not found', {status: 404, headers: cors});
    }
    if (!env.TMDB_TOKEN) return Response.json({error: 'TMDB_TOKEN nao configurado.'}, {status: 503, headers: cors});
    const target = `${TMDB_API}${path}${url.search}`;
    const response = await fetch(target, {
      headers: {Authorization: `Bearer ${env.TMDB_TOKEN}`, accept: 'application/json'}
    });
    const headers = new Headers(cors);
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Cache-Control', 'no-store');
    return new Response(response.body, {status: response.status, headers});
  }
};
