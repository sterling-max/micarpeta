
const CACHE_NAME = 'micarpeta-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Basic pass-through for now, just to satisfy PWA requirements
    event.respondWith(fetch(event.request));
});
