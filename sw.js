// Đổi version v3 để ép điện thoại tải lại
const CACHE_NAME = 'toulouse-v3'; 

const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // ÉP BUỘC KÍCH HOẠT BẢN MỚI NGAY LẬP TỨC
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Chiếm quyền điều khiển ngay lập tức
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('script.google.com')) return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
