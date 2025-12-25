let data;
let library;
const container = document.getElementsByClassName("library-container");
const mobile_container = document.getElementsByClassName("mobile-library-container");
let genre = "all";
let year = "all";
let libraryLength;
let year_label;

const menu_toggle = document.getElementsByClassName("menu-toggle");
const menu_main = document.getElementsByClassName("main-menu");
const menu_genre = document.getElementsByClassName("genre-menu");
const menu_year = document.getElementsByClassName("year-menu");

let in_menu = false
let main_menu = false;
let genre_menu = false;
let release_menu = false;

let changeGenre = false;
let changeYear = false;


if (typeof window.history.replaceState === 'function') {
	history.replaceState({}, '', window.location.href.split('#')[0]);
}


function loadData(){
	getMeta();

	setTimeout(function() {
		menu_toggle[0].style.left = "0px";
	}, 750);
}

async function getMeta(){

	const requestURL = "https://t-yauk.github.io/peak-theatre/library.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const movies = await response.json();

  	console.log(genre);

  	if(genre == "all" && year == "all"){
  		library = movies.movies;
  		document.getElementById("clear").style.display = "none";
  		document.getElementById("title").innerHTML = "All Movies";
  	}else if(changeGenre == true){
  		console.log("Filtering Genre");
  		data = movies.movies;
  		library = data.filter(movies => movies.genre && movies.genre.includes(genre));
  		document.getElementById("title").innerHTML = genre + " Movies";
  		changeGenre = false;
  		document.getElementById("clear").style.display = "block";
  	}else if(changeYear == true){
  		console.log("Filtering Year");
  		data = movies.movies;
  		library = data.filter(movies => movies.year && movies.year.includes(year));
  		document.getElementById("title").innerHTML = year_label;
  		changeYear = false;
  		document.getElementById("clear").style.display = "block";
  	}

  	libraryLength = library.length;
  	document.getElementById("library-length").innerHTML = libraryLength + " Movies Found";

  	populateLibrary();
  	populateMobile();

}


function populateLibrary(){

	for(let i = 0;i < library.length;i++){
		const newItem = document.createElement("div");
		const padding = document.createElement("span");
		const genreLength = library[i].genre.length;

		newItem.classList.add("movie-item");
		padding.classList.add("separator");

		if(genreLength > 1){
			newItem.innerHTML = "<div class='element-wrapper'><img src='" + library[i].image_url + "'><div class='details-wrapper'><span class='title'>" + library[i].title + "</span><span class='director'>Directed By: " + library[i].director + "</span><span class='description'>" + library[i].description + "</span><div class='genre-wrapper'><span class='genre-item'>" + library[i].genre[0] + "</span><span style='display:inline-block;padding:0px 5px'></span><span class='genre-item'>" + library[i].genre[1] + "</span></div></div><span class='year'>" + library[i].year + "</span></div>"
		}else{
			newItem.innerHTML = "<div class='element-wrapper'><img src='" + library[i].image_url + "'><div class='details-wrapper'><span class='title'>" + library[i].title + "</span><span class='director'>Directed By: " + library[i].director + "</span><span class='description'>" + library[i].description + "</span><div class='genre-wrapper'><span class='genre-item'>" + library[i].genre[0] + "</span></div></div><span class='year'>" + library[i].year + "</span></div>"
		}

		container[0].appendChild(newItem);
		container[0].appendChild(padding);
		
	}

}

function populateMobile(){

	console.log("populating mobile successfully");

	for(let i = 0;i < library.length;i++){
		const newItem = document.createElement("div");
		const padding = document.createElement("span");
		const genreLength = library[i].genre.length;

		newItem.classList.add("movie-item");
		padding.classList.add("separator");

		if(genreLength > 1){
			newItem.innerHTML = "<div class='element-wrapper'><img src='" + library[i].image_url + "'><div class='details-wrapper'><span class='title'>" + library[i].title + "</span><span class='director'>Directed By: " + library[i].director + "</span><span class='description'>" + library[i].description + "</span><div class='genre-wrapper'><span class='genre-item'>" + library[i].genre[0] + "</span><span style='display:inline-block;padding:0px 5px'></span><span class='genre-item'>" + library[i].genre[1] + "</span></div></div><span class='year'>" + library[i].year + "</span></div>"
		}else{
			newItem.innerHTML = "<div class='element-wrapper'><img src='" + library[i].image_url + "'><div class='details-wrapper'><span class='title'>" + library[i].title + "</span><span class='director'>Directed By: " + library[i].director + "</span><span class='description'>" + library[i].description + "</span><div class='genre-wrapper'><span class='genre-item'>" + library[i].genre[0] + "</span></div></div><span class='year'>" + library[i].year + "</span></div>"
		}

		mobile_container[0].appendChild(newItem);
		mobile_container[0].appendChild(padding);
	}

}



function menu_toggler(){
	if(in_menu == true){
		menu_toggle[0].innerHTML = "Open Menu";
		menu_toggle[0].style.width = "300px";
		menu_main[0].style.left = "-100vw";
		menu_genre[0].style.left = "-100vw";
		menu_year[0].style.left = "-100vw";
		main_menu = false;
		genre_menu = false;
		release_menu = false
		in_menu = false;
	}else{
		menu_toggle[0].innerHTML = "Close Menu";
		menu_toggle[0].style.width = "550px";
		menu_main[0].style.left = "0px";
		main_menu = true;
		in_menu = true;
	}
}


function open_genre_menu(){
	main_menu = false;
	genre_menu = true;
	release_menu = false;
	menu_main[0].style.left = "-100vw";
	menu_genre[0].style.left = "0px";
}

function open_year_menu(){
	main_menu = false;
	genre_menu = false;
	release_menu = true;
	menu_main[0].style.left = "-100vw";
	menu_genre[0].style.left = "-100vw";
	menu_year[0].style.left = "0px";
}

function clear_filters(){
	history.replaceState({}, '', window.location.href.split('#')[0]);
	genre = "all";
	year = "all";
	container[0].innerHTML = "";
	getMeta();
	menu_toggler();
}






window.addEventListener('hashchange', function() {
	if(genre_menu == true){
		changeGenre = true;
		genre = window.location.hash;
		genre = genre.replace("#", "");
		container[0].innerHTML = "";
	}else if(release_menu == true){
		changeYear = true;
		year = window.location.hash;
		year = year.slice(0, 4);
		year = year.replace("#", "");
		year_label = window.location.hash;
		year_label = year_label.replace("#", "");
		container[0].innerHTML = "";
	}
	getMeta();
	menu_toggler();
});

