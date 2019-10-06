// Service Worker
self.addEventListener('activate', e => {
  console.log('SW Activate')
})

self.addEventListener('fetch', e => {
  console.log('SW Fetch ' + e.request.url)
})
