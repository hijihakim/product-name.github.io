const Ncache = 'Cache-offline-v4';
const assets = [
	'/',
	'/index.html',
	'/css/bootstrap.css',
	'/css/style.css',
	'/js/jquery.js',
	'/js/bootstrap.js',
	'/js/script.js',
	'/img/icon.png',
	'/pages/about.html',
	'/pages/contact.html'
];

// install 
self.addEventListener('install', e => {
	console.log('install');

	e.waitUntil(
		caches
			.open(Ncache)
			.then(cache => {
				console.log('SW: caching files');
				cache.addAll(assets);
			})
			.then( () => self.skipWaiting() )
	);
});

// activate
self.addEventListener('activate', e => {
	console.log('activate');

	//remove unwanted cache
	e.waitUntil(
		caches.keys().then( cacheName =>{
			return Promise.all(
				cacheName.map(cache =>{
					if(cache !== Ncache){
						console.log('SW : Clearing cache');
						return caches.delete(cache);
					}
				})
			)
		})
	);
})

// fetch
self.addEventListener('fetch', e => {
	console.log('fetch');
	if(e.request.url.indexOf('firestore.googleapis.com') === -1){
		e.respondWith(
			fetch(e.request)
			.then(res => {
				const resClone = res.clone();
				caches
				 .open(Ncache)
				 .then(cache => {
				 	cache.put(e.request, resClone);
				 });
				 return res;
			}).catch( () => caches.match(e.request).then( res => res) )
		);
	}
})

