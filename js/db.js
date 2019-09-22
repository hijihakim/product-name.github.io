// offline data

db.enablePersistence()
	.catch( err => {
		if(err.code == 'failed-precondition') console.log('persistence failed');
		else if(err.code == 'unimplemented') console.log('persistence unvaible');
	})

db.collection('pwa').onSnapshot( (snapshot) => {
	// console.log(snapshot.docChanges())
	snapshot.docChanges().forEach(change =>{
		if(change.type == 'added') addData(change.doc.data(), change.doc.id);
		if(change.type == 'removed') removeData(change.doc.id);
	});

})


const add = document.querySelector('#save-data');
add.addEventListener('click', e => {
	e.preventDefault();

	const form = document.querySelector('#add-data');

	const product = {
		name : form.name.value,
		price : form.price.value
	}

	if (form.name.value !== '' && form.price.value !== ''){
		db.collection('pwa').add(product)
			.catch(err => console.log(err));
	}

	form.name.value = '';
	form.price.value = '';
	console.log('tstadd');
});

const rm = document.querySelector('#remove');
rm.addEventListener('click', e => {
	let id = e.target.parentElement.parentElement.querySelector('.modal-body .id').innerHTML;
	db.collection('pwa').doc(id).delete();
})