// VocabReminder Service Worker - Offline Caching
const CACHE_NAME = 'vocabreminder-cache-v2';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Faqat GET requestlar
  if (event.request.method !== 'GET') return;

  // chrome-extension://, data:// va boshqa scheme'larni o'tkazib yuborish
  const url = new URL(event.request.url);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {

      if (cachedResponse) {
        // Cache'dagi faylni qaytaramiz
        // Keyin internetdan yangilashga harakat qilamiz
        fetch(event.request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === 'basic'
            ) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(
                  event.request,
                  networkResponse.clone()
                );
              });
            }
          })
          .catch(() => {});

        return cachedResponse;
      }

      // Cache'da yo'q bo'lsa internetdan olamiz
      return fetch(event.request)
        .then((networkResponse) => {

          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {

          // Internet bo'lmasa index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }

        });
    })
  );
});