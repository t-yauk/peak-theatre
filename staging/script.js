let library;
let data;
let the_id = "0";

const container = document.getElementsByClassName("library-container");


function initialize() {


	the_library();
}


async function the_library(){

	const requestURL = "https://t-yauk.github.io/peak-theatre/library.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const rawJSON = await response.json();

  	library = rawJSON.movies;

  	populateLibrary();

}


function populateLibrary(){

	for(let i = 0;i < library.length;i++){

		itemWrapper = document.createElement('div');
		itemWrapper.classList.add('item-wrapper');

		movieBlock = document.createElement('div');
		movieBlock.classList.add("movie-item");
		movieBlock.id = i;

		movieBlock.innerHTML = "<img src='" + library[i].image_url + "'><span class='title'>" + library[i].title + "</span>";

		itemWrapper.appendChild(movieBlock);
		container[0].appendChild(itemWrapper);
	}

	movieItems = document.querySelectorAll('.movie-item');
	movieItems.forEach(element => {
		element.addEventListener('click', function(event) {
			localStorage.setItem("the_id", this.id);
			window.location.href = "details.html";
  		});
	});

}








