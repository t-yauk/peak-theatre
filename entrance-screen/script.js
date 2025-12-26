let playing;
let library;
let the_movie;
let the_poster = localStorage.getItem('the_poster');
const poster = document.getElementById("poster");
let hour;
let minute;
let start_time;

window.onload = function() {

    getMeta();
    getPlaying();

}

async function getPlaying(){

    const requestURL = "https://t-yauk.github.io/peak-theatre/entrance-screen/now-playing.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const movie = await response.json();
    const data = movie.now_playing;

    the_movie = data[0].name;
    start_time = data[0].start_time;

    getTime(start_time);

    console.log("Now Playing: " + the_movie);

    setTimeout(function(){
        loadImage();
    }, 500);

}

async function getMeta(){

    const requestURL = "https://t-yauk.github.io/peak-theatre/library.json";
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const movies = await response.json();
  	library = movies.movies;

}

function loadImage(){

    if(the_movie == "none"){
        document.getElementById("default").style.top = "0px";
    }else{
        for(let i = 0;i < library.length;i++){
            if(library[i].title == the_movie){
                console.log("Movie Found in the Library");
                //localStorage.setItem('the_poster', library[i].image_url);
                poster.src = library[i].image_url;
                setTimeout(function(){
                    const poster_height = poster.offsetHeight;
                    const top_box = document.getElementsByClassName("top-box");
                    console.log(poster_height + "px");
                    const top_box_height = 1920 - Number(poster_height);
                    console.log(top_box_height + "px");
                    top_box[0].style.height = top_box_height + "px";
                    
                }, 500);
                break;
            }
        }
        setTimeout(function(){
            document.getElementById("default").style.top = "-100vh";
        }, 500);
    }

}

const intervalId = setInterval(reloadMeta, 5000);


function reloadMeta() {
    console.clear();
    getMeta();
    getPlaying();
}

function getTime(time){
    hour = start_time.slice(0, 2);
    minute = start_time.slice(2, 5);
    hour = Number(hour);
    if(hour > 12){
        hour = hour - 12;
    }
    //console.log("Start Time - " + hour + ":" + minute);
    document.getElementById("showtime").innerHTML = hour + ":" + minute;
}
