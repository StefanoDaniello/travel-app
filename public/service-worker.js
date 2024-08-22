// const CACHE_NAME = 'my-app-cache-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/assets/styles/main.css',
//   '/assets/js/main.js',
//   '/img/icons/vue.js-logo.png',
// ];

// // Install event: caching files
// self.addEventListener('install', function(e) {
//   console.log('Service Worker: Installed');
//   // self.skipWaiting();  // Forza l'attivazione immediata
//   e.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       console.log('Service Worker: Caching files');
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Activate event: cleaning old caches
// self.addEventListener('activate', function(e) {
//   console.log('Service Worker: Activated');
//   e.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cache) {
//           if (cache !== CACHE_NAME) {
//             console.log('Service Worker: Clearing old cache');
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// // Fetch event: serving cached content or fetching from network
// self.addEventListener('fetch', function(e) {
//   console.log('Service Worker: Fetching', e.request.url);

//   // Aggiungi un controllo per evitare di memorizzare risorse non pertinenti
//   if (e.request.url.startsWith(self.location.origin)) {
//     e.respondWith(
//       caches.match(e.request).then(function(res) {
//         // Serve dalla cache se disponibile, altrimenti fetch dalla rete
//         return res || fetch(e.request).then(function(fetchRes) {
//           // Clone la risposta per metterla in cache e restituire la risposta originale
//           return caches.open(CACHE_NAME).then(function(cache) {
//             // Memorizza la risposta nella cache
//             cache.put(e.request, fetchRes.clone());
//             return fetchRes;
//           });
//         });
//       }).catch(function() {
//         // Opzionalmente, ritorna una pagina di fallback in caso di errore
//         console.error('Fetch failed; returning offline page.');
//         return caches.match('/offline.html');  // Assicurati che questo file esista nella cache
//       })
//     );
//   } else {
//     // Per risorse non pertinenti, fetch direttamente dalla rete
//     e.respondWith(fetch(e.request));
//   }
// });

