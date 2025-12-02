let library;
const main_container = document.getElementsByClassName("main");

function load_library(){

	getMeta();

}

async function getMeta(){

	const requestURL = "https://t-yauk.github.io/peak-theatre/library.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const movies = await response.json();

  	library = movies.movies;

  	populateLibrary();

}

function populateLibrary(){

	console.log(library);

	for(let i = 0;i < library.length;i++){

		const movieItem = document.createElement("div");
		movieItem.classList.add = 'item-wrapper';
		movieItem.innerHTML = "<div class='movie-item'><span class='title'>" + library[i].title + "<br><span class='year'>(" + library[i].year + ")</span></span></div>";
		main_container[0].appendChild(movieItem);
		setTimeout(function() {
			const imageItem = document.getElementsByClassName('movie-item');
			imageItem[i].style.backgroundImage = "url('" + library[i].previewImage + "')";
		}, 10);

	} 

}
