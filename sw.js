// Service Worker für den Vorlesungskalender
//
// Strategie: "Network-first" für HTML-Seiten – ist Internet da, wird immer
// die aktuellste Version geladen (wichtig, da wir laufend Änderungen
// pushen). Erst wenn kein Netz verfügbar ist, greift der Cache. Statische
// Assets (Icons) werden "Cache-first" behandelt, da die sich kaum ändern.
//
// WICHTIG: CACHE_VERSION bei jedem inhaltlichen Update erhöhen (z.B. an die
// CHANGELOG-Version angleichen), sonst bleiben alte, veraltete Caches liegen.
const CACHE_VERSION = 'v3.0.0';
const CACHE_NAME = `kalender-cache-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './module.html',
  './manifest.webmanifest',
  './icons/favicon.ico',
  './icons/favicon-32x32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => {}) // einzelne fehlende Assets sollen die Installation nicht blockieren
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network-first: immer versuchen, frisch zu laden; Cache nur als Offline-Fallback
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first für alles andere (Icons, Manifest, Fonts, ...)
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return res;
      }).catch(() => cached);
    })
  );
});
