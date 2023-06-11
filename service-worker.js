self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/style.css',
        '/script.js',
        '/index.html',
        // Daftar semua aset statis yang ingin Anda cache di sini
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Jika respons ditemukan di cache, kembalikan respons dari cache
      if (response) {
        return response;
      }

      // Jika respons tidak ditemukan di cache, biarkan peramban menangani permintaan
      return fetch(event.request);
    })
  );
});
