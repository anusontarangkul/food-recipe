const staticCacheName = 'site-static-v1';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    'js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v109/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

self.addEventListener('install', evt => {
    // console.log('sw installed')
    evt.waitUntil(caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets')
        cache.addAll(assets)
    }))

})

self.addEventListener('activate', evt => {
    // console.log('sw activated')
    evt.waitUntil(
        caches.keys().then(keys => {
            console.log(keys)//
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch', evt => {
    // console.log('fetch', evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})