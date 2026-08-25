// Service Worker für den Vorlesungskalender
//
// Strategie: "Network-first" für HTML-Seiten – ist Internet da, wird immer
// die aktuellste Version geladen (wichtig, da wir laufend Änderungen
// pushen). Erst wenn kein Netz verfügbar ist, greift der Cache. Statische
// Assets (Icons) werden "Cache-first" behandelt, da die sich kaum ändern.
//
// WICHTIG: CACHE_VERSION bei jedem inhaltlichen Update erhöhen (z.B. an die
// CHANGELOG-Version angleichen), sonst bleiben alte, veraltete Caches liegen.
const CACHE_VERSION = 'v3.9.2';
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
  // Der ICS-Feed muss für die Feed-Aktualitäts-Anzeige im Verwalten-Menü
  // immer frisch vom Netz kommen, sonst zeigt der Cache-first-Ansatz unten
  // fälschlich immer den alten Stand als "aktuell" an.
  const isFeed = req.url.endsWith('.ics');
  // Die Notiz-Sync-Gist-API muss aus demselben Grund immer frisch vom Netz
  // kommen: ohne diese Ausnahme fängt der Cache-first-Zweig unten die
  // GET-Anfrage an api.github.com ab und liefert für immer den Stand des
  // allerersten erfolgreichen Pulls aus, egal was sich im Gist seither
  // geändert hat (gefunden, weil eigene Termine nie auf Lesegeräten
  // ankamen, obwohl Notizen es taten).
  const isGistApi = req.url.startsWith('https://api.github.com/gists/');

  if (isHTML || isFeed || isGistApi) {
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
