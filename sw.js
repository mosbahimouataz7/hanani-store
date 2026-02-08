const cacheName = 'hanani-v2';
const assets = [
  '/hanani-store/',
  '/hanani-store/index.html',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
