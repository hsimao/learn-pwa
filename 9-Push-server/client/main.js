let swReg

const serverUrl = 'http://localhost:3333'

const setSubscribedStatus = state => {
  document.getElementById('subscribe').className = state ? 'hidden' : ''
  document.getElementById('unsubscribe').className = state ? '' : 'hidden'
}

// 註冊 Server Worker
navigator.serviceWorker
  .register('sw.js')
  .then(registration => {
    swReg = registration

    // 依據訂閱狀態，如果已經訂閱就調用改變 UI 方法
    swReg.pushManager.getSubscription().then(setSubscribedStatus)
  })
  .catch(console.error)

// Get public key from server
const getApplicationServerKey = () => {
  return (
    fetch(`${serverUrl}/key`)
      // 解析已加密公鑰
      .then(res => res.arrayBuffer())
      .then(key => new Uint8Array(key))
  )
}

// PWA 推播通知 訂閱流程
// 1.) 從 push server 取得 公鑰
// 2.) 將 公鑰註冊到 client 端的 pushManager
// 3.) 將用戶訂閱資訊傳送回 push server 儲存
const subscribe = () => {
  console.log('訂閱')

  if (!swReg) return console.log('Service Worker Not Found')

  // 取得公鑰, 將取得 key api 返回值，設定到 pushManager
  getApplicationServerKey()
    .then(applicationServerKey => {
      // 收到後端的 key, 產生 PWA 訂閱資訊
      // PWA 訂閱
      swReg.pushManager
        .subscribe({ userVisibleOnly: true, applicationServerKey })
        .then(res => res.toJSON())
        .then(subscription => {
          // 將訂閱資訊發送到後端儲存
          console.log('subscription', subscription)
          fetch(`${serverUrl}/subscribe`, { method: 'POST', body: JSON.stringify(subscription) })
            // 後端訂閱資料儲存成功後更新 UI 訂閱按鈕
            .then(setSubscribedStatus)
            // 儲存失敗取消 PWA 已訂閱狀態
            .catch(unsubscribe)
        })
    })
    .catch(console.error)
}

// PWA 推播通知 取消訂閱
const unsubscribe = () => {
  swReg.pushManager.getSubscription().then(subscription => {
    subscription.unsubscribe().then(() => {
      setSubscribedStatus(false)
    })
  })
}
