// Service Worker
self.addEventListener('push', e => {
  console.log(e)
  const n = self.registration.showNotification('收到一則通知來自 SW')

  e.waitUntil(n)
})
