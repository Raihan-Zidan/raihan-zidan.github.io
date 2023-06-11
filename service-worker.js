self.addEventListener('fetch', function(event) {
  if (!navigator.onLine) {
    event.respondWith(
      new Response("Tidak ada koneksi internet. Silakan cek kembali nanti.", {
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
