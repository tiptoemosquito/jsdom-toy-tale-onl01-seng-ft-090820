let addToy = false;
let toysURL = "http://localhost:3000/toys";

function fetchToys(toysUrl) {
	return fetch(toysUrl)
	.then(resp => resp.json())
	.then(json => renderToys(json));
}

function renderToys(toys) {
	const toysDiv = document.getElementById('toy-collection')
	toys.forEach(function(toy) {
		const cardDiv = document.createElement('div')
		cardDiv.className = "card";
		cardDiv.innerHTML = `
		<h2>${toy.name}</h2>
		<img src = ${toy.image} class = "toy-avatar">
		<p> ${toy.likes} Likes </p>`
		const btn = document.createElement('button');
		btn.className = "like-btn";
		btn.innerText = "Like <3"
		btn.id = toy.id;
		btn.addEventListener('click', addLike );
		cardDiv.appendChild(btn);
		toysDiv.appendChild(cardDiv);
	})
}

function addLike(e) {
	console.log(e.target.parentElement.querySelector('p').innerText.split(' '))
	likes = parseInt(e.target.parentElement.querySelector('p').innerText.split(' ')[0])
	console.log(likes)
	configurationObject = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({likes: `${likes + 1}`})
	}
	return fetch(`http://localhost:3000/toys/${e.target.id}`, configurationObject)
	.then(function(response) {
		return response.json()
	})
	.then(function(json){
		e.target.parentElement.querySelector('p').innerText = likes + 1 + " likes"
	});
}

function postToys(name, image) {
	let numString = '0'
	let newToy = {
		name: name,
		image: image,
		likes: numString
	};
	configurationObject = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(newToy)
	};
	return fetch(toysUrl, configurationObject)
	.then(function(response) {
		response.json().then(function(parsedJson) {
		  createToyCard(parsedJson)
		})
	})
};

function createToyCard(toy) {
	console.log(toy)
	document.getElementById('toy-collection').innerHTML += `
		<div class="card">
		<h2>${toy.name}</h2>
		<img src=${toy['image']} class="toy-avatar" />
		<p>${toy['likes']} likes</p>
		<button id=${toy.id} class="like-btn">Like <3</button>
		</div>
		`
		btn = document.getElementById(toy.id)
		btn.addEventListener('click', addLike)
}

function formReset() {
	var a = document.getElementsByClassName('input-text');
	for (var i = 0; i < a.length; i++) {
		a[i].value = "";
	}
}


document.addEventListener("DOMContentLoaded", () => {
	let form = document.getElementsByClassName('add-toy-form')
	const addBtn = document.querySelector("#new-toy-btn");
	const toyFormContainer = document.querySelector(".container");
  const likeBtn = document.querySelector(".like-btn")
  toyFormContainer.addEventListener('submit', function(e){
    e.preventDefault()
		// let form = document.getElementsByClassName('add-toy-form')
		const name = document.querySelector("[name='name']").value
		const image = document.querySelector("[name='image']").value
		postToys(name, image);
		formReset()  
  });
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys(toysUrl)
});
