self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        console.log('Nama Cache:', cacheName);
        // Anda dapat memeriksa apakah cache tersebut berisi offline page
        // dan menghapusnya jika perlu
      });
    })
  );
});
