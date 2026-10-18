// VocabReminder Service Worker - Offline Caching & Real Push Notifications
const CACHE_NAME = 'vocabreminder-cache-v3';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
];

// Install: Cache critical static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches and claim clients immediately
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

// Fetch: Stale-while-revalidate / Network fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === 'basic'
            ) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {});

        return cachedResponse;
      }

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
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// 🔔 PUSH NOTIFICATION EVENT (Background push from server or Web Push API)
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: 'VocabReminder', body: event.data.text() };
    }
  }

  const title = data.title || '⚡ VocabReminder — Takrorlash vaqti!';
  const options = {
    body: data.body || 'Yangi so\'zingizni eslaysizmi? Tarjimasini tekshiring!',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [150, 60, 150],
    tag: 'vocab-reminder-quiz',
    renotify: true,
    data: {
      wordId: data.wordId || null,
      word: data.word || '',
      url: data.url || '/?popup=quiz'
    },
    actions: [
      { action: 'quiz', title: '🎯 Savolga javob berish' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 👆 NOTIFICATION CLICK EVENT (When user taps notification in mobile status bar)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const notifData = event.notification.data || {};
  const targetUrl = notifData.url || '/?popup=quiz';
  const wordId = notifData.wordId;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 1. If an existing tab/window of the app is already open -> focus and postMessage
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({
            type: 'OPEN_QUICK_QUIZ',
            wordId: wordId || null,
            word: notifData.word || null
          });
          return client.focus();
        }
      }

      // 2. If app is completely closed -> open new window with query param
      if (clients.openWindow) {
        const fullUrl = wordId 
          ? `${self.location.origin}/?popup=quiz&wordId=${encodeURIComponent(wordId)}`
          : `${self.location.origin}/?popup=quiz`;
        return clients.openWindow(fullUrl);
      }
    })
  );
});
