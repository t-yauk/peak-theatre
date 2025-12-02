let library;
const main_container = document.getElementsByClassName("main");
let movieItems;
let setGenre = localStorage.getItem('the_genre');
const the_menu = document.getElementsByClassName("menu");
const menu_icon = document.getElementsByClassName("control-wrapper");
let menu_toggle = false;
let menuItems;
let data;
let genre_block;
const site_wrapper = document.getElementsByClassName("site-wrapper");

function menu_01(){
	toggle_menu();
}

function menu_02(){
	toggle_menu();
}

function toggle_menu(){
	if(menu_toggle == true){
		the_menu[0].style.top = "-72vh";
		menu_icon[0].style.transform = "rotate(0deg)";
		menu_icon[1].style.transform = "rotate(0deg)";
		site_wrapper[0].style.opacity = "1";
		menu_toggle = false;
	}else{
		the_menu[0].style.top = "165px";
		menu_icon[0].style.transform = "rotate(180deg)";
		menu_icon[1].style.transform = "rotate(180deg)";
		setTimeout(function(){
			site_wrapper[0].style.opacity = "0";
		}, 500);
		menu_toggle = true;
	}
}

function load_library(){

	window.scrollTo(0, 0);

	if(setGenre == null || setGenre == "All Genres"){
		setGenre = "all";
	}

	document.getElementById("current-list").innerHTML = setGenre + " Movies";
	
	getMeta();

}

async function getMeta(){

	const requestURL = "https://t-yauk.github.io/peak-theatre/library.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const movies = await response.json();
  	data = movies.movies;

  	if(setGenre == "all"){
  		library = data;
  	}else{
  		library = data.filter(movies => movies.genre && movies.genre.includes(setGenre));
  	}

  	localStorage.clear();

  	populateLibrary();

}

function populateLibrary(){

	for(let i = 0;i < library.length;i++){

		const movieItem = document.createElement("div");
		movieItem.classList.add('item-wrapper');
		if((library[i].genre).length > 1){
			movieItem.innerHTML = "<div class='movie-item'><span class='title'>" + library[i].title + "<br><span class='year'>(" + library[i].year + ")</span></span></div><div class='movie-details'><span class='title'>" + library[i].title + " (" + library[i].year + ")</span><span class='director'>Directed By: " + library[i].director + "</span><p class='description'>" + library[i].description + "</p><span class='genre'>" + library[i].genre[0] + "</span><span class='genre'>" + library[i].genre[1] + "</span></div>";
		}else{
			movieItem.innerHTML = "<div class='movie-item'><span class='title'>" + library[i].title + "<br><span class='year'>(" + library[i].year + ")</span></span></div><div class='movie-details'><span class='title'>" + library[i].title + " (" + library[i].year + ")</span><span class='director'>Directed By: " + library[i].director + "</span><p class='description'>" + library[i].description + "</p><span class='genre'>" + library[i].genre[0] + "</span></div>";
		}
		main_container[0].appendChild(movieItem);
		setTimeout(function() {
			const imageItem = document.getElementsByClassName('movie-item');
			imageItem[i].style.backgroundImage = "url('" + library[i].previewImage + "')";
		}, 10);

	}

	movieItems = document.querySelectorAll('.item-wrapper');
	movieItems.forEach(element => {
		element.addEventListener('click', function(event) {
			for(let i = 0;i < movieItems.length;i++){
				movieItems[i].classList.remove("selected");
			}
    		this.classList.add("selected");
  		});
	});

	genre_block = document.querySelectorAll('.genre');
	genre_block.forEach(element => {
		element.addEventListener('click', function(event) {
			const genre = this.innerHTML;
			localStorage.setItem('the_genre', genre);
			window.location.reload();
  		});
	});

}

setTimeout(function() {
	menuItems = document.querySelectorAll('.menu-item');
	menuItems.forEach(element => {
		element.addEventListener('click', function(event) {
			const genre = this.innerHTML;
			localStorage.setItem('the_genre', genre);
			window.location.reload();
		});
	});
}, 10);
