self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('to-do').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/index.css',
                '/pwa.js',
                '/uomTrack.js',
                '/manifest.webmanifest',
                '/assets/copy.png',
                '/assets/delete.png',
                '/assets/logo.png',
                '/assets/logo.svg',
                '/assets/menu.svg',
                '/assets/person.png',
                '/assets/2020_Summer_Olympics_text_logo.svg'
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