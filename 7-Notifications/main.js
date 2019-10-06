// // Progressive Enhancement (SW supported)
// 判斷瀏覽器是否支援 Notification
if (window.Notification) {
  // 確認權限狀態
  // 1.) granted 允許
  // 2.) denied 拒絕
  // 3.) default 使用用戶自訂在瀏覽器上的預設值

  // 如果允許, 直接調用顯示通知方法
  if (Notification.permission === 'granted') {
    showNotification()

    // 如果不是拒絕, 發送詢問是否同意使用通知功能
    // 注意, 詢問時機非常重要，只有一次詢問機會，當用戶選擇完後，系統將無法再次詢問，除非用戶自己從瀏覽器設定內找到，自行修改設定
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(permission => {
      // 用戶回應如果是允許，調用通知方法
      if (permission === 'granted') {
        showNotification()
      }
    })
  }

  function showNotification() {
    const options = {
      body: '王小明發送了一則留言給您',
      icon: '/icon.png',
    }

    const n = new Notification('您有一則新的通知', options)

    // 監聽通知被點擊事件
    n.onclick = () => {
      console.log('通知已被點擊')
    }
  }
}
