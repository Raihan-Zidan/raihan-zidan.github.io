self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'offline-cache') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
