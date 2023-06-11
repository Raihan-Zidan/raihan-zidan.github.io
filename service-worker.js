self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Mengecek apakah browser dalam kondisi offline
    fetch(event.request).catch(function() {
      // Jika terjadi kesalahan saat fetch (kondisi offline), tampilkan pesan offline
      return new Response(
        "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'></head><body><h1>Anda sedang offline</h1><p>Periksa koneksi internet Anda.</p></body></html>",
        {
          headers: { 'Content-Type': 'text/html' }
        }
      );
    })
  );
});
