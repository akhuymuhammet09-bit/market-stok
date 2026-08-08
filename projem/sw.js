self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('marketpos-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/src/css/style.css',
        '/src/js/app.js',
        '/src/js/scanner.js',
        '/src/js/excel.js',
        '/src/js/storage.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});