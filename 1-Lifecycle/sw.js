
// Service Worker

self.addEventListener('install', (e) => {

  self.skipWaiting();
});

self.addEventListener('activate', (e) => {

  console.log('SW3 Activated');
});
