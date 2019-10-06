const webpush = require('web-push')
const vapid = require('./vapid.json')

// 配置 keys
webpush.setVapidDetails('mailto:e087754958@gmail.com', vapid.publicKey, vapid.privateKey)

const pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/dcaG1QzJmbc:APA91bEWyDn7MPYYCEtl4BwXjUc5VIapNXKqYbFzNEUZQqCRCnDVibH4Hdy5ShMUCa_wSyUAPWK_Iljbp2lx4DIRT6TqfYyNu8RuwwWJirBV1z8P9KMFwLplF0dJ91lKHaFmRSgCzYNE',
  keys: {
    auth: 'f0bneKYu6e76uawszd8DeA',
    p256dh: 'BHK9w_VGawg7ju0y26DtUH1WYdeVJpgj70HaIHbpTrIrZcKffOR3lMyhtYimd3Is-RNQOjt-tNo76-YrOgtq8as',
  },
}

const message = '王小明對您發送了一則留言'

webpush.sendNotification(pushSubscription, message)

console.log('推送消息到用戶端')
