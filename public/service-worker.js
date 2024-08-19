const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/assets/styles/main.scss',
  '/src/main.js',
  '/img/icons/vue.js-logo.png',
];


self.addEventListener('install', function(e) {
  console.log('Service Worker: Installed');
  e.waitUntil(
      caches
      .open(CACHE_NAME)
      .then(function(cache) {
          return cache.addAll(urlsToCache);
      })
  )
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
      caches
      .match(e.request)
      .then(function(res) {
          return res || fetch(e.request);
      })
  );
});