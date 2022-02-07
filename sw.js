self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('UoM-Project').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/index.css',
                '/pwa.js',
                '/uomTrack.js',
                '/app.js',
                '/manifest.json',
                '/package-lock.json',
                '/package.json',
                '/assets/copy.png',
                '/assets/delete.png',
                '/assets/logo.png',
                '/assets/logo.svg',
                '/assets/menu.svg',
                '/assets/person.png',
                '/assets/2020_Summer_Olympics_text_logo.svg',
                '/assets/flags/ca.svg',
                '/assets/flags/cn.svg',
                '/assets/flags/gb.svg',
                '/assets/flags/it.svg',
                '/assets/flags/ng.svg',
                '/assets/flags/us.svg',
                '/assets/flags/za.svg',
                '/assets/fontawesome/css/all.css',
                '/assets/fontawesome/js/all.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || caches.match('/index.html');
        })
    );
});

// self.addEventListener('fetch', function (event) {
//     console.log('The service worker is serving the asset.');
//     const req = event.request;
//     const url = new URL(req.url);

//     if (url.origin === location.origin){
//         event.respondWith(cacheFirst(req));
//     }else{
//         event.respondWith(networkAndCache(req));
//     }
//     // event.respondWith(
//     //     caches.match(event.request).then(function (response) {
//     //         return response || caches.match('/index.html');
//     //     })
//     // );
// });

// async function cacheFirst(req){
//     const cache = await caches.open(cacheName);
//     const cached = await cache.match(req);
//     return cached || fetch(req);
// }

// async function networkAndCache(req){
//     const cache = await caches.open(cacheName);
//     try{
//         const fresh = await fetch(req);
//         await cache.put(req, fresh.clone());
//         return fresh;
//     }catch (e){
//         const cached = await cache.match(req);
//         return cached;
//     }
// }