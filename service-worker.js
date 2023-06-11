self.addEventListener('fetch', function(event) {
  if (!navigator.onLine) {
    event.respondWith(
      new Response("<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>Tidak ada koneksi internet. Silakan cek kembali nanti.</body></html>", {
        headers: { 'Content-Type': 'text/plain' }
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('offline', function(event) {
  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage({ type: 'offline', message: 'Tidak ada koneksi internet. Silakan cek kembali nanti.' });
    });
  });
});

self.addEventListener('online', function(event) {
  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage({ type: 'online' });
    });
  });
});
