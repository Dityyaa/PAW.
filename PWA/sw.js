const CACHE_NAME = "pwa-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/style.css",
  "/app.js",
  "/offline.html",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-512x512.png"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // langsung activate
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim(); // langsung kontrol semua tab
});

// Fetch
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => caches.match("/offline.html"))
      );
    })
  );
});
