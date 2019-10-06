// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {
  // Register the SW
  navigator.serviceWorker
    .register('/sw.js')
    .then(function(registration) {
      // 發送訊息請用戶確認是否要更新
      // registration.onupdatefound = () => {
      //   let newSW = registration.installing

      //   // 提示用用是否要更新
      //   if (confirm('App update found. Do you want to update now?')) {
      //     newSW.postMessage('update_self')
      //   }
      // }

      if (registration.active) {
        registration.active.postMessage('respond to this')
      }
    })
    .catch(console.log)

  navigator.serviceWorker.addEventListener('message', e => {
    console.log(e.data)
  })
}
