const Name = 'V1';
const Dc = 'dv1';

const assets = [
	"/",
	"/index.html",
	"/css/style.css",
	"/css/bootstrap.css",
	"/js/script.js",
	"/js/jquery.js",
	"/js/bootstrap.js",
	"/pages/about.html",
	"/pages/contact.html"
];

const limitSizeCache = (name, size) =>{
	caches.open(name).then(cache =>{
		cache.keys().then(keys =>{
			if(key.length > size){
				cache.delete(key[0]).then(limitSizeCache(name, size))
			}
		})
	})
}

self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(Name).then(cache => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener('activate', e => {
	e.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== Name)
				.map(key => caches.delete(key))
			)
		})
	);
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then( cacheRes => {
			return cacheRes || fetch(e.request).then(fetchRes => {
				return caches.open(Dc).then(cache =>{
					cache.put(e.request.url, fetchRes.clone());
					limitSizeCache(Dc,15)
					return fetchRes
				})
			});
		})
	);
});