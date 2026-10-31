import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};
const episodeContainer = document.getElementById("episodes");
const seasonContainer = document.getElementById("seasons");
const data = jsonConfig.shows;
let library;
let episodes;
let seasons = [];
let i;
let pathway = "Z:/elements/tv/logos/";
let k = Number(localStorage.getItem('the_episode'));
let action = "episodes";
let s = 0;
let newSeason;
let limited = false;
let light;

window.onload = function() {

    light = "movies-on";
    localStorage.setItem('lights', 'on');
    api.controlLights({
        light
    });

    getData();

    setTimeout(function() {
        episodeContainer.style.transition = "transform 0.5s ease";
    }, 500);

}

async function getData() {

    const requestURL = data[Number(localStorage.getItem('showID'))].url;
  	const request = new Request(requestURL);
  	const response = await fetch(request);
  	const rawJSON = await response.json();

    library = rawJSON;
    episodes = library.episodes;

    populateShow();

    populateEpisodes();

}

function populateShow() {

    document.getElementById("artwork").src = pathway + library.logo;
    document.getElementById("description").innerHTML = library.description;

}




async function populateEpisodes() {

    for(i=0;i<episodes.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("episode-item");
        newItem.innerHTML = `<img src="${episodes[i].thumbnail}"><div class="overlay"></div><span class="title">${episodes[i].episode_number}. ${episodes[i].title}</span>`;
        episodeContainer.appendChild(newItem);
    }

    await populateSeasons();

    syncEpisodes();

}

function populateSeasons() {
    
    for(i=0;i<episodes.length;i++){
        const the_season = episodes[i].season;
        if (!seasons.includes(the_season)) {
            seasons.push(episodes[i].season);
        }
    }

    if(seasons.length > 1){

        for(i=0;i<seasons.length;i++){
            const newItem = document.createElement('div');
            newItem.classList.add("season-item");
            newItem.dataset.id = seasons[i];
            newItem.innerHTML = "Season " + seasons[i];
            seasonContainer.appendChild(newItem);
        }

        syncSeasons();

    } else {
        seasonContainer.style.display = "none";
        limited = true;
    }

}






function syncEpisodes() {

    const items = document.getElementsByClassName("episode-item");

    for(i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        } else {
            items[i].classList.remove("active");
        }
    }

    const width = items[0].offsetWidth;
    let offset;
    
    if(newSeason){
        offset = ((((width + 30) * k)) * -1);
        newSeason = false;
    }else{
        offset = ((((width + 30) * (k - 1))) * -1);
    }

    if(k > 0){
        episodeContainer.style.transform = `translateX(${offset}px)`;
    } else {
        episodeContainer.style.transform = `translateX(0px)`;
    }

    s = Number(episodes[k].season);
    s = s - 1;

    syncSeasons();

}

function syncSeasons() {
    

    const items = document.getElementsByClassName("season-item");
    
    for(i=0;i<items.length;i++){
        if(i == s){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }
    
}





function episodeListener(key) {

    const items = document.getElementsByClassName("episode-item");

    if(key === 'ArrowRight'){
        if(k < (episodes.length - 1)){
            k = k + 1;
            syncEpisodes();
        }
    }else if(key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            syncEpisodes();
        }
    }else if(key === 'ArrowUp' && limited == false){
        seasonContainer.classList.add("active");
        action = "seasons";
        for(i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
    }else if(key === 'Enter'){
        light = "off";
        localStorage.setItem('lights', 'off');
        api.controlLights({
            light
        });
        sendEpisode();
    }

}

function seasonListener(key) {

    const items = document.getElementsByClassName("episode-item");

    if(key === 'ArrowRight'){
        if(s < (seasons.length - 1)){
            s = s + 1;
        }
    }else if(key === 'ArrowLeft'){
        if(s > 0){
            s = s - 1;
        }
    }else if(key === 'ArrowDown'){
        seasonContainer.classList.remove("active");
        action = "episodes";
        syncEpisodes();
        return;
    }

    for(i=0;i<episodes.length;i++){
        if(episodes[i].season == (s+1)){
            k = i;
            const width = items[0].offsetWidth;
            const offset = ((((width + 30) * k)) * -1);
            if(k > 0){
                episodeContainer.style.transform = `translateX(${offset}px)`;
            } else {
                episodeContainer.style.transform = `translateX(0px)`;
            }
            newSeason = true;
            break;
        }
    }

    syncSeasons();

}





document.addEventListener('keydown', function(event) {

    if(event.key === 'Backspace'){
        window.location.href = "tv.html";
    }else if(event.key === 'h'){
        window.location.href = "home.html";
    }
    
    if(action == "episodes"){
        episodeListener(event.key);
    }else if(action == "seasons"){
        seasonListener(event.key);
    }
    
});



function sendEpisode() {
    localStorage.setItem('the_episode', e);
    window.location.href = "watch-tv.html";
}
