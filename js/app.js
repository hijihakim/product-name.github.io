document.addEventListener('DOMContentLoaded', e =>{
	if("serviceWorker" in navigator){
		navigator.serviceWorker.register('/sw2.js')
			.then(e => console.log('serviceWorker register'), e )
			.catch(e => console.log('serviceWorker not register'));
	}else{
		console.log('the browser not support serviceWorker')
	}
});