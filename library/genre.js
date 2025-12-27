const menuItems = document.getElementsByClassName("menu-item");
let genre;

window.onload = function() {

	for(let i = 0;i < menuItems.length;i++){
		if(i % 2 === 0){
			menuItems[i].classList.add("alt");
		}
	}

	for(let i = 0;i < menuItems.length;i++){
		setTimeout(function(){
			menuItems[i].style.transform = "translateX(0px)";
		}, i * 100);
	}

};


genreItem = document.querySelectorAll('.menu-item');
genreItem.forEach(element => {
	element.addEventListener('click', function(event) {
		genre = this.innerHTML;
		genre = genre.replace(" Movies", "");
		console.log(genre);
		localStorage.setItem('the_filter', genre);
		window.location.href = "index.html";
  	});
});
