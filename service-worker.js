self.addEventListener('fetch', function(event) {
  if (!navigator.onLine) {
    // The page is offline, so return a 404 response
    event.respondWith(new Response('Not Found', {status: 404}));
  } else {
    // The page is online, so continue as normal
    event.respondWith(fetch(event.request));
  }
});
