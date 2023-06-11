function deleteCachedPages() {
  // Get all cached pages
  var cachedPages = await caches.keys();

  // For each cached page, delete it
  for (var i = 0; i < cachedPages.length; i++) {
    caches.delete(cachedPages[i]);
  }
}

// Listen for the event that the service worker is activated
self.addEventListener('activate', function() {
  // Delete all cached pages
  deleteCachedPages();
});
