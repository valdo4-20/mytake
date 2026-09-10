const CACHE = 'mytake-v21';
const CORE = ['./', './index.html', './styles.css?v=3', './icon.svg', './manifest.webmanifest', './src/app.js?v=14', './src/data.js', './src/storage.js', './src/diary.js', './src/tmdb.js'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE))));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
