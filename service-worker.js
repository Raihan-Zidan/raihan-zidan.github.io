// File: service-worker.js

// Menambahkan event listener untuk 'install'
self.addEventListener('install', function(event) {
  // Tidak ada operasi yang dilakukan saat instalasi
});

// Menambahkan event listener untuk 'fetch'
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Mengecek apakah request dapat diambil dari cache
    caches.match(event.request).then(function(response) {
      // Jika ada respons yang cocok di cache, maka mengembalikan respons dari cache
      if (response) {
        return response;
      }

      // Jika tidak ada respons yang cocok di cache, melakukan fetch ke server
      return fetch(event.request).then(function(response) {
        // Menyalin respons dari server
        var responseToCache = response.clone();

        // Menyimpan respons di cache untuk request yang sama
        caches.open('offline-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(function() {
      // Jika terjadi kesalahan saat mencari di cache dan fetch dari server, menampilkan pesan offline
      return new Response(
        "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'></head><body><h1>Anda sedang offline</h1><p>Periksa koneksi internet Anda.</p></body></html>",
        {
          headers: { 'Content-Type': 'text/html' }
        }
      );
    })
  );
});
