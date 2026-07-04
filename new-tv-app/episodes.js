const url = localStorage.getItem('series_url');
const container = (document.getElementsByClassName("episode-container"))[0];
const seasonContainer = (document.getElementsByClassName("season-wrapper"))[0];
let show;
let episodes;
let k = 0;
let action = "episodes";
let epX = 0;
let a = 0;
let dynamic = false;
const seasons = [];
let curS;
let limited;

window.onload = function() {

    getJSON();

    setTimeout(function() {
        const blur = (document.getElementsByClassName("blur"))[0];
        blur.style.background = "rgba(0,0,0,0.5)";
        blur.style.backdropFilter = "blur(0px)";
    }, 500);

}

async function getJSON() {

    const requestURL = url;
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	show = await response.json();
    episodes = show.episodes;

    for(let s=0;s<episodes.length;s++){
        if(!seasons.includes(episodes[s].season)){
            seasons.push(episodes[s].season);
        }
    }

    populate();
    
}

async function populate() {

    document.body.style.backgroundImage = "url('D:/peaktheatre/elements/tv/artwork/" + show.image_url + "')";

    for(let i=0;i<episodes.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add('episode');
        newItem.innerHTML = "<img class='thumbnail' src='" + episodes[i].thumbnail + "'><div class='content'><span class='title'>" + (episodes[i].episode_number) + ". " + episodes[i].title + "</span><p class='description'>" + episodes[i].description + "</p></div>";
        container.appendChild(newItem);
    }

    for(let s=0;s<seasons.length;s++){
        const newItem = document.createElement('div');
        newItem.classList.add("season-item");
        newItem.setAttribute('value', seasons[s]);
        newItem.innerHTML = "Season " + seasons[s];
        seasonContainer.appendChild(newItem);
    }

    if(seasons.length < 2){
        seasonContainer.style.display = "none";
        limited = true;
    }else{
        limited = false;
    }

    syncEpisodes();

}



function sendEpisode() {

    localStorage.setItem('the_episode', k);
    window.location.href = "watch-tv.html";

}



function syncEpisodes() {
    const items = document.getElementsByClassName("episode");
    const seasonItems = document.getElementsByClassName("season-item");

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    for(let s=0;s<seasonItems.length;s++){
        const val = seasonItems[s].getAttribute('value');
        if(episodes[k].season == val){
            seasonItems[s].classList.add("active");
        }else{
            seasonItems[s].classList.remove("active");
        }
    }

    container.style.transform = "translateX(" + epX + "vw)";
}

function syncSeasons(){

    const items = document.getElementsByClassName("season-item");

    for(let i=0;i<items.length;i++){
        if(i == a){
            items[i].classList.add("selected");
        }else{
            items[i].classList.remove("selected");
        }
    }

}

function episodeListner(key){

    const items = document.getElementsByClassName("episode");
    const seasonItems = document.getElementsByClassName("season-item");

    if(key === 'ArrowRight'){
        if(k < (episodes.length - 1)){
            k = k + 1;
            if(dynamic == true){
                epX = epX - 25;
            }else{
                dynamic = true;
            }
            syncEpisodes();
        }
    }else if(key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            if(k > 0){
                epX = epX + 25;
            }
            syncEpisodes();
        }
    }else if(key === 'ArrowUp'){
        if(limited == false){
            action = "seasons";
            for(let i=0;i<items.length;i++){
                items[i].classList.remove("active");
            }
            for(let s=0;s<seasonItems.length;s++){
                seasonItems[s].classList.remove("active");
            }
            syncSeasons();
        }
    }else if(key === 'Enter'){
        sendEpisode();
    }

}

function seasonListener(key){

    const items = document.getElementsByClassName("season-item");

    if(key === 'ArrowRight'){
        if(a < (seasons.length - 1)){
            a = a + 1;
            syncSeasons();
        }
    }else if(key === 'ArrowLeft'){
        if(a > 0){
            a = a - 1;
            syncSeasons();
        }
    }else if(key === 'ArrowDown'){
        action = "episodes";
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("selected");
        }
        syncEpisodes();
        a = 0;
    }else if(key === 'Enter'){
        curS = items[a].getAttribute('value');
        let firstEp;
        for(let i=0;i<episodes.length;i++){
            if(episodes[i].season == curS){
                firstEp = i;
                break;
            }
        }
        k = firstEp;
        epX = 0 - (25 * k);
        action = "episodes";
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("selected");
        }
        dynamic = false;
        syncEpisodes();
    }

}


document.addEventListener('keydown', function(event) {

    if(event.key === 'Backspace'){
        window.location.href = "tv.html";
    }

    if(action == "episodes"){
        episodeListner(event.key);
    }else if(action == "seasons"){
        seasonListener(event.key);
    }

});
