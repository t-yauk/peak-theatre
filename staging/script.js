let library;
let data;
let the_id = "0";
let filter = localStorage.getItem('the_filter');
const clearB = document.getElementsByClassName("clear-button");

if (filter == null){
	filter = "all";
}

const container = document.getElementsByClassName("library-container");


function initialize() {


	the_library();
}


async function the_library(){

	const requestURL = "https://t-yauk.github.io/peak-theatre/library.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const rawJSON = await response.json();

  	if(filter == "all"){
  		library = rawJSON.movies;
  		document.getElementById("the-title").innerHTML = "All Movies";
  		clearB[0].style.display = "none";
  	}else if((filter.includes("19") == true) || (filter.includes("20") == true)){
  		data = rawJSON.movies;
  		library = data.filter(movies => movies.year && movies.year.includes(filter));
  		document.getElementById("the-title").innerHTML = localStorage.getItem("timeframe");
  	}else{
  		data = rawJSON.movies;
  		library = data.filter(movies => movies.genre && movies.genre.includes(filter));
  		document.getElementById("the-title").innerHTML = filter + " Movies";
  	}

  	document.getElementById("count").innerHTML = library.length + " Movies Found";

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
			const id = Number(this.id);
			const selectedName = library[id].title;
			localStorage.setItem("the_id", selectedName);
			window.location.href = "details.html";
  		});
	});

}


function clear_filters(){
	localStorage.setItem("the_filter", "all");
	window.location.reload();
}








