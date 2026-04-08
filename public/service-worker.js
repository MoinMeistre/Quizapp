const CACHE_NAME = "quizapp-cache-v9";

const ASSETS = [
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./questions.json",
  "./js/model.js",
  "./js/view.js",
  "./js/presenter.js",
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
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  // Only cache GET requests. POST/PUT/DELETE etc. are not supported by Cache API and shouldn't be cached.
  if (event.request.method !== "GET") {
    return;
  }

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
