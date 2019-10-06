// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {
  // Register the SW
  navigator.serviceWorker
    .register('/sw.js')
    .then(function(registration) {
      console.log('serviceWorker registration!')
    })
    .catch(console.log)
}
