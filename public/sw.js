// Simple service worker for PWA installability
const CACHE_NAME = 'pdfdock-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // We can just let the network handle it, 
  // PWA requires fetch event listener to trigger install prompt.
  event.respondWith(fetch(event.request).catch(() => new Response('Offline')));
});
