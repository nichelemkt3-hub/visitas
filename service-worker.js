const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
  "/index.html",
  "/topo.png",
  "/baixo.png",
  "/capa.png",
  "/icone.png"
];

// Instalando o service worker e cacheando arquivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Ativando o service worker
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Interceptando requisições e servindo do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
