// 監聽[推播通知]
self.addEventListener('push', e => {
  // 顯示瀏覽器上的通知視窗
  self.registration.showNotification(e.data.text())
})
