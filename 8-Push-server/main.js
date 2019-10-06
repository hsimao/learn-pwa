if (navigator.serviceWorker) {
  // Register the SW
  navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      const pubKey = 'BKq0mJX9qsbEb1ghFga1jVmCdbNkkjw1A-lyZwbIrzNV0OkVPAM1lpeM-id8E7x77YtVFvqbCcVKfkH0VzS4xhM'

      registration.pushManager
        .getSubscription()
        .then(sub => {
          // 有訂閱就回傳
          if (sub) return sub

          // 解密公鑰
          const applicationServerKey = urlBase64ToUint8Array(pubKey)

          // 訂閱
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey,
          })
        })
        // 將訂閱資料解析成陣列格式印出, 並將該用戶訂閱資訊儲存到 server, 讓 webpush 可以發送到該用戶
        .then(sub => sub.toJSON())
        .then(console.log)
        .catch(console.log)
    })
    .catch(console.log)

  // Convert key to Uint8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
}
