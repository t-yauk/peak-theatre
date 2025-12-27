const menuItems = document.getElementsByClassName("menu-item");
let year;

window.onload = function() {

	for(let i = 0;i < menuItems.length;i++){
		menuItems[i].style.transition = "0.5s";
	}

	setTimeout(function() {
		for(let i = 0;i < menuItems.length;i++){
			setTimeout(function(){
				menuItems[i].style.transform = "translateX(0px)";
			}, i * 150);
		}
	}, 100);

};


yearItem = document.querySelectorAll('.menu-item');
yearItem.forEach(element => {
	element.addEventListener('click', function(event) {
		year = this.innerHTML;
		localStorage.setItem("timeframe", year);
		if(year !== "2025"){
			year = year.slice(0,3);
		}
		console.log(year);
		localStorage.setItem('the_filter', year);
		window.location.href = "index.html";
  	});
});
