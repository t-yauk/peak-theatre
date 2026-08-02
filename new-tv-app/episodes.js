import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};
const cover = (document.getElementsByClassName("cover"))[0];
const ec = (document.getElementsByClassName("episode-container"))[0];
const data = jsonConfig.shows;
const id = Number(localStorage.getItem('showID'));
let library;
let episodes = [];
let seasons = [];
let s = 0;
let e = Number(localStorage.getItem('the_episode'));
let seasonItems;
let episodeItems;
let action = "episodes";
let epOffset = 20.8;
let light;

window.onload = function() {

    light = "movies-on";
    localStorage.setItem('lights', 'on');
    api.controlLights({
        light
    });

    findShow();

    setTimeout(function() {

        cover.classList.remove("active");
        ec.style.transition = "1s";

    }, 500);

}

async function findShow() {

    const requestURL = data[id].url;
    const request = new Request(requestURL);

    const response = await fetch(request);
    library = await response.json();

    showDetails();

}

async function showDetails() {

    episodes = library.episodes;

    for(let i=0;i<episodes.length;i++){
        if(!seasons.includes(episodes[i].season)){
            seasons.push(episodes[i].season);
        }
    }

    ec.style.width = `${episodes.length * 23}vw`

    populate();

}

async function populate() {

    document.getElementById("poster").src = `D:/peaktheatre/elements/tv/thumbnails/${data[id].image}`;
    document.getElementById("show-description").innerHTML = library.description;
    
    const sw = document.getElementById("seasons");

    for(let i=0;i<seasons.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("season-item");
        newItem.innerHTML = `Season ${seasons[i]}`;
        sw.appendChild(newItem);
    }

    for(let i=0;i<episodes.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("episode-item");
        newItem.innerHTML = `<img src="${episodes[i].thumbnail}"><div class="details"><span class="title">${episodes[i].episode_number}. ${episodes[i].title}</span><p class="description">${episodes[i].description}</p></div>`;
        ec.appendChild(newItem);
    }

    seasonItems = document.getElementsByClassName("season-item");
    episodeItems = document.getElementsByClassName("episode-item");

    activeItem();

}

async function activeItem() {

    s = Number(episodes[e].season) - 1;

    if(action == "episodes"){
        for(let i=0;i<seasonItems.length;i++){
            if(i == s){
                seasonItems[i].classList.add("active");
            }else{
                seasonItems[i].classList.remove("active");
            }
        }
    }
    
    const x = (((epOffset * e) + (1 * e)) * -1);
    
    if(e > 0){
        ec.style.transform = `translateX(${x}vw)`;
    }else{
        ec.style.transform = "translateX(0vw)";
    }

    if(action == "episodes"){
        for(let i=0;i<episodeItems.length;i++){
            if(i == e){
                episodeItems[i].classList.add("active");
                episodeItems[i].classList.remove("previous");
                episodeItems[i].classList.remove("a1");
            }else if(i < e){
                episodeItems[i].classList.add("previous");
                episodeItems[i].classList.remove("active");
            }else{
                if(i == (e+1)){
                    episodeItems[i].classList.add("a1");
                }else{
                    episodeItems[i].classList.remove("a1");
                }
                episodeItems[i].classList.remove("active");
                episodeItems[i].classList.remove("previous");
            }
        }
    }



}





function episodeListener(key) {

    if(key === 'ArrowRight'){
        if(e < (episodes.length-1)){
            e = e + 1;
            activeItem();
        }
    }else if(key === 'ArrowLeft'){
        if(e > 0){
            e = e - 1;
            activeItem();
        }
    }else if(key === 'ArrowUp'){
        if(seasons.length > 1){
            for(let i=0;i<seasonItems.length;i++){
                seasonItems[i].classList.remove("active");
            }
            for(let i=0;i<episodeItems.length;i++){
                episodeItems[i].classList.remove("active");
                episodeItems[i].classList.remove("previous");
                episodeItems[i].classList.remove("a1");
            }
            actionSeasons();
            action = "seasons";
        }
    }else if(event.key === 'Enter'){
        light = "off";
        localStorage.setItem('lights', 'off');
        api.controlLights({
            light
        });
        sendEpisode();
    }

}

async function actionSeasons() {

    for(let i=0;i<seasonItems.length;i++){
        if(i == s){
            seasonItems[i].classList.add("focus");
        }else{
            seasonItems[i].classList.remove("focus");
        }
    }

    for(let i=0;i<episodeItems.length;i++){
        if(i == e){
            episodeItems[i].classList.add("a1");
        }else{
            episodeItems[i].classList.remove("a1");
        }
    }

}

function seasonListener(key) {

    if(key === 'ArrowRight'){
        for(let i=0;i<episodes.length;i++){
            if(episodes[i].season == (s + 2)){
                e = i;
                break;
            }
        }
        s = Number(episodes[e].season) - 1;
        actionSeasons();
        activeItem();

    }else if(key === 'ArrowLeft'){
        for(let i=0;i<episodes.length;i++){
            if(episodes[i].season == s){
                e = i;
                console.log(episodes[i]);
                break;
            }
        }
        s = Number(episodes[e].season) - 1;
        actionSeasons();
        activeItem();
    }else if(key === 'ArrowDown' || key === 'Enter'){
        for(let i=0;i<seasonItems.length;i++){
            seasonItems[i].classList.remove("focus");
        }
        action = "episodes";
        activeItem();
    }

}





function sendEpisode() {
    localStorage.setItem('the_episode', k);
    window.location.href = "watch-tv.html";
}










document.addEventListener('keydown', function(event) {

    if(event.key === 'Backspace'){
        window.location.href = "tv.html";
    }else if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(action == "episodes"){
        episodeListener(event.key);
    }else if(action == "seasons"){
        seasonListener(event.key);
    }

});
