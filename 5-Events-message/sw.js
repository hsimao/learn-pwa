// Service Worker
self.addEventListener('message', e => {
  // 如果接收到用戶更新通知
  // if (e.data === 'update_self') {
  //   console.log('Service Worker Updating')
  //   self.skipWaiting()
  // }

  const messageId = e.source.id

  // 監聽用戶當前瀏覽器，如果開啟多個 tag, 只要其中一個觸發，另一個也會同步發送訊息
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      // 使用  id 來核對發送消息來源是哪個 tag 頁面, 只針對該 tag 頁面回應
      if (messageId === client.id) {
        client.postMessage('Hello from Service Worker')
      }
    })
  })
})
