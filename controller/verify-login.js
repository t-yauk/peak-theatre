const logged_in = localStorage.getItem("logged_in");

if(logged_in !== "confirmed"){
	window.location.href = "login.html";
}
