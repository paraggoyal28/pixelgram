self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker ...', event)
  event.waitUntil(
    caches.open('static').then(cache => {
      console.log('[Service Worker] PreCaching App shell')
      cache.addAll([
        '/src/js/app.js',
        '/index.html',
        '/',
        '/src/js/feed.js',
        '/src/js/promise.js',
        '/src/js/fetch.js',
        '/src/js/material.min.js',
        '/src/css/app.css',
        '/src/css/feed.css',
        '/src/images/main-image.jpg',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
      ])
    })
  )
})

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker ...', event)
  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // null response if the request not in cache
      if (response) {
        return response
      } else {
        return fetch(event.request).then(res => {
          return caches.open('dynamic').then(cache => {
            cache.put(event.request.url, res.clone())
            return res
          })
        })
      }
    })
  )
})
