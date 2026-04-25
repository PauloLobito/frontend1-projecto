const CACHE_NAME = 'moneynest-cache-v1';
const URLS_TO_CACHE = [
    './pages/index.html',
    './pages/settings.html',
    './pages/login.html',
    './pages/register.html',
    './assets/css/main.css',
    './assets/css/settings.css',
    './assets/css/auth.css',
    './assets/js/dashboard.js',
    './assets/js/settings.js',
    './assets/js/auth.js',
    './assets/js/notifications.js',
    './assets/js/mock-api.js',
    './assets/js/todo-item.js',
    './assets/js/todo.js',
    './assets/js/pwa.js',
    './assets/js/translations.js',
    './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames
                .filter((cacheName) => cacheName !== CACHE_NAME)
                .map((cacheName) => caches.delete(cacheName))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).catch(() => caches.match('./pages/index.html'));
        })
    );
});
