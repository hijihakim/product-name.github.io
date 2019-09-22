// Your web app's Firebase configuration	
var firebaseConfig = {
	apiKey: "AIzaSyCOTq7G6aM7i_f0rBTDrj1ZgkOwEVX1tg8",
	authDomain: "myfirstpwa-a9708.firebaseapp.com",
	databaseURL: "https://myfirstpwa-a9708.firebaseio.com",
	projectId: "myfirstpwa-a9708",
	storageBucket: "myfirstpwa-a9708.appspot.com",
	messagingSenderId: "969376296017",
	appId: "1:969376296017:web:408de49b5b30227a4f9c70"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



$('a[data-toggle="list"]').on('shown.bs.tab', function (e) {
  e.target // newly activated tab
  e.relatedTarget // previous active tab
});

const show = document.querySelector('#myList');

function addData(data, id){
	const html = `
	<a class="list-group-item list-group-item-action" data-toggle="list" role="tab" data-id="${id}" class="list-product">
	    <div>
	      <div class="name">${data.name}</div>
	      <div class="text-primary price">Price : RP. ${data.price}</div>
	      <span class="details"  data-toggle="modal" data-target="#detail">detail</span>
	    </div>
  	</a>
	`;

	show.innerHTML += html;
}

function removeData(id){
	let data = document.querySelector(`a[data-id="${id}"]`);
	data.remove();
}



show.addEventListener('click', e =>{
	if(e.target.className == 'details'){
		let datashow = {
			id : e.target.parentElement.parentElement.getAttribute('data-id'),
			name : e.target.parentElement.querySelector('.name').innerHTML,
			price : e.target.parentElement.querySelector('.price').innerHTML
		}
		document.querySelector('#detail .modal-body .id').innerHTML = datashow.id;
		document.querySelector('#detail .modal-body .name').innerHTML = datashow.name;
		document.querySelector('#detail .modal-body .price').innerHTML = datashow.price;
		
	}
})



