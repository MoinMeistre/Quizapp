const CAHSE_NAME = "quizapp-cache-v1";

const ASSETS = [
  "/",
  "/index.php",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/questions.json",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }),
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      cacheNames.map(function (cacheName) {
        if (cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
      });
    }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) return response;
      return fetch(event.request).then(function (fetchResponse) {
        return caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }),
  );
});
