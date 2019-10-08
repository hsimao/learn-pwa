const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64')
const Storage = require('node-storage')

// Vapid keys
const vapid = require('./vapid.json')

// 設置 push-push
webpush.setVapidDetails('mailto:e087754958@gmail.com', vapid.publicKey, vapid.privateKey)

// 存放 client PWA 已訂閱用戶資料
const store = new Storage(`${__dirname}/db`)
let subscriptions = store.get('subscriptions') || []

// 使用 urlsafeBase64 加密 public key
module.exports.getKey = () => urlsafeBase64.decode(vapid.publicKey)

// 儲存 client PWA 訂閱用戶資料
module.exports.addSubscription = subscription => {
  // 儲存到變數
  subscriptions.push(subscription)

  // 儲存本地 db 檔案上
  store.put('subscriptions', subscriptions)
}

// 發送通知到給所有已訂閱用戶
module.exports.send = message => {
  // 推播通知 promises
  let notifications = []

  // Loop 所有訂閱用戶
  subscriptions.forEach((subscription, i) => {
    let p = webpush.sendNotification(subscription, message).catch(status => {
      // 如果錯誤代碼是 410 (資源消失，表示該訂閱用戶已經不存在)
      // 加上刪除標記，便於後續刪除
      if (status.statusCode === 410) {
        subscriptions[i]['delete'] = true
      }

      // 在此 return null 是為了阻擋因為 410 讓接下來的 Promise.all 事件終止
      return null
    })

    notifications.push(p)
  })

  // 等所有推播送完後執行，開始清除需要 delete 的用戶
  Promise.all(notifications).then(() => {
    // 抓出沒有 delete 標記的用戶
    subscriptions = subscriptions.filter(subscription => !subscription.delete)

    // 更新本地訂閱用戶儲存檔案
    store.put('subscriptions', subscriptions)
  })
}
