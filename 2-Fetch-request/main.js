
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register('/sw.js').then(function(registration){

    console.log('SW Registered');

  }).catch(console.log);

}

// Get camera feed
fetch('camera_feed.html')
  .then((res) => {
  return res.text();
}).then((html) => {
  document.getElementById('camera').innerHTML = html;
});
