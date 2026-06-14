import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
const data = jsonConfig.movies;
const raw_search_term = localStorage.getItem('search-term');
const container = (document.getElementsByClassName("library-container"))[0];
const pw = (document.getElementsByClassName("profile-wrapper"))[0];
let rb = (document.getElementsByClassName("return-button"))[0];
let results;
let search_term;
let action = "return";
let k = 0;
let p = 0;
let light;
let lights;
const vw = (document.getElementsByClassName("video-wrapper"))[0];
const v = document.getElementById("video");

window.onload = function() {

    search_term = (titleCase(raw_search_term));

    document.getElementById("search-title").innerHTML = "showing results for <em>" + search_term + "</em>";

    search();

}

function titleCase(str) {
    if (!str) return '';
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function search() {

    results = data.filter(movies => movies.title && movies.title.includes(search_term));
    rb.style.display = "inline-block";

    populate();

}

async function populate() {

    for(let i=0;i<results.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("movie-item");
        newItem.style.backgroundImage = "url('" + results[i].image_url + "')";
        container.appendChild(newItem);
    }

}

function populateProfile() {

    document.getElementById("image").src = results[k].image_url;
    document.getElementById("title").innerHTML = results[k].title;
    document.getElementById("director").innerHTML = "Directed By " + results[k].director;
    document.getElementById("description").innerHTML = results[k].description;
    document.getElementById("year").innerHTML = results[k].year;
    if((results[k].genre).length > 1){
            document.getElementById("genres").innerHTML = "<span class='genre'><span class='fa-solid fa-clock'></span> " + results[k].duration + "</span><span class='genre'>" + results[k].genre[0] + "</span><span class='genre'>" + results[k].genre[1] + "</span>";
        }else{
            document.getElementById("genres").innerHTML = "<span class='genre'>" + results[k].duration + "</span><span class='genre'>" + results[k].genre[0] + "</span>";
        }

    pw.classList.add("active");

}

function populateVideo() {

    v.src = "D:\\peaktheatre\\movies\\trailers\\" + results[k].trailer_id;

    pw.classList.remove("active");
    vw.classList.add("active");
    
    light = "dim";
    localStorage.setItem('lights', 'dim');
    api.controlLights({
        light
    });

    setTimeout(function() {
        v.play();
        v.volume = 0.25;
    }, 500);

}

function syncMovies(){

    const items = document.getElementsByClassName("movie-item");

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

}

function returnListener(key){

    if(key === 'Enter' || key === 'Backspace'){
        window.location.href = "movies.html";
    }if(key === 'ArrowDown'){
        action = "movies";
        rb.classList.remove("active");
        syncMovies();
    }

}

function libraryListener(key){

    const items = document.getElementsByClassName("movie-item");

    if(key === 'ArrowRight'){
        if(k < (results.length - 1)){
            k = k + 1;
            syncMovies();
        }
    }else if(key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            syncMovies();
        }
    }else if(key === 'ArrowUp'){
        action = "return";
        rb.classList.add("active");
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        k = 0;
    }else if(key === 'Enter'){
        action = "profile";
        populateProfile();
    }else if(key === 'Backspace'){
        window.location.href = "movies.html";
    }

}

function profileListener(key){
    
    let title;

    if(key === 'ArrowRight'){
        p = p + 1;
        if(p > 1){
            p = 0;
        }
    }else if(key === 'ArrowLeft'){
        p = p - 1;
        if(p < 0){
            p = 1;
        }
    }else if(key === 'Backspace'){
        action = "movies";
        pw.classList.remove("active");
    }else if(key === 'Enter'){
        if(p == 0){
            title = results[k].title;
            localStorage.setItem('the_title', title);
            light = "off";
            light;
            localStorage.setItem('lights', 'off');
            api.controlLights({
                light
            });
            window.location.href = "watch.html";
        }else if(p == 1){
            action = "video";
            populateVideo();
        }
    }

    const items = document.getElementsByClassName("profile-menu-item");

    for(let i=0;i<items.length;i++){
        if(i == p){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

}

function videoListener(key){

    if(key === 'ArrowRight'){
        v.currentTime += 10;
    }else if(key === 'ArrowLeft'){
        v.currentTime -= 10;
    }else if(key === 'Backspace'){
        light = "movies-on";
        localStorage.setItem('lights', 'on');
        api.controlLights({
            light
        });
        v.pause();
        vw.classList.remove("active");
        pw.classList.add("active");
        action = "profile";
    }

}

document.addEventListener('keydown', function(event) {

    if(action == "return"){
        returnListener(event.key);
    }else if(action == "movies"){
        libraryListener(event.key);
    }else if(action == "profile"){
        profileListener(event.key);
    }else if(action == "video"){
        videoListener(event.key);
    }

});
