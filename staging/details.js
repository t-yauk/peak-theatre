let id = Number(localStorage.getItem("the_id"));
let library;
let genre = document.getElementsByClassName("genre-item");

function initialize(){

	load_info();
}


async function load_info(){

	const requestURL = "https://t-yauk.github.io/peak-theatre/library.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const rawJSON = await response.json();

  	library = rawJSON.movies;

  	get_info();

}



function get_info(){

	document.getElementById("movie-image").src = library[id].previewImage;

	document.getElementById("title").innerHTML = library[id].title + " <span class='year'>(" + library[id].year + ")</span>";
	document.getElementById("description").innerHTML = library[id].description;

	genre[0].innerHTML = library[id].genre[0];

	if(library[id].genre.length > 1){
		genre[1].innerHTML = library[id].genre[1];
	}else{
		genre[1].classList.add("disabled");
	}

	document.getElementById("runtime").innerHTML = "<span class='fa-regular fa-clock'></span> " + library[id].duration;

}
