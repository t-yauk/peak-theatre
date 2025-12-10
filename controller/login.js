let users;
const error = document.getElementsByClassName("error-message");
let validated = false;
let username,password;
localStorage.setItem('logged_in', 'unconfirmed')

async function login_request(){

	username = document.getElementById("username").value;
	password = document.getElementById("password").value;

	console.log("Username: " + username);
	console.log("Password: " + password);

	const requestURL = "https://t-yauk.github.io/peak-theatre/controller/meta.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const data = await response.json();

  	users = data.users;

  	console.log(users);

  	validate(users);

}

function validate(obj){

	for(let i = 0;i < obj.length;i++){
		if((obj[i].username == username) && (obj[i].password == password)){
			validated = true;
			localStorage.setItem('logged_in', 'confirmed');
			window.location.href = "home.html";
			break;
		}
	}

	if(validated == false){
		error[0].style.display = "block";
	}

}
