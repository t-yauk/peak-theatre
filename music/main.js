import jsonConfig from 'https://t-yauk.github.io/peak-theatre/lists/music.json' with {type: "json"};
import jsonConfig2 from 'https://t-yauk.github.io/peak-theatre/lists/music-videos.json' with {type: "json"};
const container = document.getElementById("library");
const trackWrapper = (document.getElementsByClassName("track-wrapper"))[0];
const albumWrapper = (document.getElementsByClassName("album-wrapper"))[0];
const trackContaienr = document.getElementById("tracks");
const player = (document.getElementsByClassName("player"))[0];
const library = jsonConfig.music;
const videos = jsonConfig2.music;
const audio = document.getElementById("audio");
let tracks;
let i;
let k = 0;
let m = 0;
let a = 0;
let c = 1;
let playerAction = 0;
let t;
let action = "menu";
let count = library.length;
let pathway = "Z:/elements/music";
let trackPath;
let staticInterval = setInterval(inactivity, 30000);
let light;

window.onload = function (){

    populate();

    light = "fifty";
    localStorage.setItem('lights', 'on');
    api.controlLights({
        light
    });

}

function populate() {

    if(m == 0){
        for(i=0;i<library.length;i++){
            const newItem = document.createElement('div');
            newItem.classList.add("library-item");
            newItem.innerHTML = `<img src="${pathway}/${library[i].artwork}"><div class="overlay"></div>`;
            container.appendChild(newItem);
        }
    }else if(m == 3){
        for(i=0;i<videos.length;i++){
            const newItem = document.createElement('div');
            newItem.classList.add("library-item");
            newItem.innerHTML = `<img src="${videos[i].thumbnail}"><div class="overlay"></div>`;
            container.appendChild(newItem);
        }
    }

    setTimeout(function (){
        const items = document.getElementsByClassName("library-item");
        for(i=0;i<items.length;i++){
            const delay = 50 * i;
            const the_id = i;
            setTimeout(function (){
                items[the_id].style.transform = "translateX(0px)";
            }, delay);
        }
    }, 500);

}

async function populateAlbum() {

    document.getElementById("artwork").src = pathway + "/" + library[k].artwork;
    document.getElementById("title").innerHTML = library[k].title;
    document.getElementById("artist").innerHTML = library[k].artist;

    tracks = library[k].tracks;
    
    for(i=0;i<tracks.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("track-item");
        newItem.innerHTML = (i+1) + ". " + tracks[i].title;
        trackContaienr.appendChild(newItem);
    }

    albumWrapper.classList.add("active");

    const artworkHeight = document.getElementById("artwork").offsetHeight;
    const titleHeight = document.getElementById("title").offsetHeight;
    const artistHeight = document.getElementById("artist").offsetHeight;

    if(tracks.length > 6){
        const theOffset = artworkHeight - (titleHeight + artistHeight + 10);
        trackWrapper.style.height = `${theOffset}px`;
    }else{
        const sample = (document.getElementsByClassName("track-item"))[0];
        const height = sample.offsetHeight;
        trackWrapper.style.height = `${height * tracks.length}px`;
    }

    syncAlbum();

}

function populatePlayer() {

    player.style.backgroundImage = `url('${pathway}/${library[k].artwork}')`;

    document.getElementById("player-artwork").src = `${pathway}/${library[k].artwork}`;

    document.getElementById("track-title").innerHTML = tracks[t].title;

    document.getElementById("track-details").innerHTML = `${library[k].title}&emsp;<span style='font-size:0.7em'>•</span>&emsp;${library[k].artist}`;

    trackPath = `Z:/music/${library[k].id}/`;

    audio.src = trackPath + tracks[t].id;

    audio.play();

    const audioTimecode = setInterval(timecode, 1000);
    const timelineInterval = setInterval(timeline, 10);

    player.classList.add("active");

}

function syncItems() {

    const items = document.getElementsByClassName("library-item");

    for(i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    let offset;

    if(k < 1){
        offset = 0;
    }else if(k > ((items.length)-4)){
        offset = ((35 * (items.length - 5) + 15.5) * -1);
        console.log("End of the Line");
    }else{
        offset = (((35 * k) - 35) * -1);
    }

    document.getElementById("library").style.transform = `translateX(${offset}vh)`;
    

}

function syncMenu() {

    const items = document.getElementsByClassName("menu-item");

    for(i=0;i<items.length;i++){
        if(i == m){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

}

function syncAlbum() {

    const items = document.getElementsByClassName("track-item");

    for(i=0;i<items.length;i++){
        if(i == a){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    if(a > 0){
        const height = items[0].offsetHeight;
        const position = (((height * a) - height) * -1);
        trackContaienr.style.transform = `translateY(${position}px)`;
    }else{
        trackContaienr.style.transform = `translateY(0px)`;
    }

}

function syncTracks() {

    document.getElementById("track-title").innerHTML = tracks[t].title;
    audio.src = trackPath + tracks[t].id;
    audio.play();

}


function libraryListener(key) {

    const items = document.getElementsByClassName("library-item");

    if(key === 'ArrowRight'){
        if(k < (library.length - 1)){
            k = k + 1;
            syncItems();
        }
    }else if(key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            syncItems();
        }
    }else if(key === 'ArrowUp' || key === 'm'){
        action = "menu";
        syncMenu();
        for(i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
    }else if(key === 'Enter'){
        if(m == 0){
            a = 0;
            action = "album";
            populateAlbum();
        }else if(m == 3){
            localStorage.setItem('video_id', k);
            light = "off";
            localStorage.setItem('lights', 'off');
            api.controlLights({
                light
            });
            window.location.href = "watch-2.html";
        }
    }

}

function menuListener(key) {

    const items = document.getElementsByClassName("menu-item");

    if(key === 'ArrowRight'){
        m = m + 1;
        k = 0;
        container.innerHTML = "";
        container.style.transform = "translateX(0px)";
        populate();
        syncMenu();
    }else if(key === 'ArrowLeft'){
        if(m > 0){
            m = m - 1;
            k = 0;
            container.innerHTML = "";
            container.style.transform = "translateX(0px)";
            populate();
            syncMenu();
        }
    }else if(key === 'ArrowDown' || key === 'Enter'){
        action = "library";
        syncItems();
        for(i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
    }

}

function albumListener(key) {

    const items = document.getElementsByClassName("track-item");

    if(key === 'ArrowDown'){
        if(a < (items.length - 1)){
            a = a + 1;
            syncAlbum();
        }
    }else if(key === 'ArrowUp'){
        if(a > 0){
            a = a - 1;
            syncAlbum();
        }
    }else if(key === 'Backspace'){
        action = "library";
        trackContaienr.innerHTML = "";
        trackWrapper.style.height = "0px";
        albumWrapper.classList.remove("active");
    }else if(key === 'Enter'){
        action = "player";
        t = a;
        populatePlayer();
        light = "dim";
        localStorage.setItem('lights', 'off');
        api.controlLights({
            light
        });
    }

}

function playerListener(key) {

    const items = document.getElementsByClassName("control-item");

    if(playerAction == 0){
        if(key === 'ArrowUp'){
            playerAction += 1;
            for(i=0;i<items.length;i++){
                if(i == c){
                    items[i].classList.add("active");
                }else{
                    items[i].classList.remove("active");
                }
            }
        }else if(key === 'ArrowRight'){
            audio.currentTime += 10;
        }else if(key === 'ArrowLeft'){
            audio.currentTime -= 10;
        }
    }else{
        if(key === 'Enter'){
            if(c == 0){
                if(audio.currentTime < 3){
                    t = t - 1;
                    c = 1;
                    playerAction -= 1;
                    syncTracks();
                }else{
                    audio.currentTime = 0;
                }
            }else if(c == 1){
                if(!audio.paused){
                    audio.pause();
                }else{
                    audio.play();
                }
            }else{
                t = t + 1;
                c = 1;
                playerAction -= 1;
                syncTracks();
            }
        }else if(key === 'ArrowRight'){
            if(c < 2){
                c = c + 1;
            }
        }else if(key === 'ArrowLeft'){
            if(c > 0){
                c = c - 1;
            }
        }else if(key === 'ArrowDown'){
            playerAction -= 1;
        }

        if(playerAction > 0){
            for(i=0;i<items.length;i++){
                if(i == c){
                    items[i].classList.add("active");
                }else{
                    items[i].classList.remove("active");
                }
            }
        }else{
            for(i=0;i<items.length;i++){
                items[i].classList.remove("active");
            }
        }
    }
    
    if(key === 'Backspace'){
        player.classList.remove("active");
        action = "album";
        syncAlbum();
        light = "fifty";
        localStorage.setItem('lights', 'on');
        api.controlLights({
            light
        });
    }

}


document.addEventListener('keydown', function(event) {

    clearInterval(staticInterval);
    staticInterval = setInterval(inactivity, 30000);

    if(action == "library"){
        libraryListener(event.key);
    }else if(action == "menu"){
        menuListener(event.key);
    }else if(action == "album"){
        albumListener(event.key);
    }else if(action == "player"){
        playerListener(event.key);
    }

});



function timecode() {

    document.getElementById("timecode").innerHTML = `${convertSecondsToHHMMSS(audio.currentTime)}&emsp;|&emsp;${convertSecondsToHHMMSS(audio.duration)}`;

    const remaining = audio.duration - audio.currentTime;

    if(remaining < 1){
        if(t < (tracks.length - 1)){
            setTimeout(function (){
                t = t + 1;
                syncTracks();
            }, remaining);
        }else{
            setTimeout(function (){
                if(action == "player"){
                    a = 0;
                    action = "album";
                    player.classList.remove("active");
                    syncAlbum();
                    light = "fifty";
                    localStorage.setItem('lights', 'on');
                    api.controlLights({
                        light
                    });
                }
            }, remaining);
        }
    }

}

function timeline() {

    const item = (document.getElementsByClassName("control-item"))[1];

    const percentage = ((audio.currentTime / audio.duration) * 100);
    document.getElementById("timeline").style.width = `${percentage}%`;
    document.getElementById("timeline-position").style.left = `${percentage}%`;

    if(!audio.paused){
        item.innerHTML = "<i class='fa-solid fa-pause'></i>";
    }else{
        item.innerHTML = "<i class='fa-solid fa-play'></i>";
    }

}





function convertSecondsToHHMMSS(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}


function inactivity() {

    if(audio.paused){
        console.log("Audio is not playing");
    }else{
        action = "player";
        player.classList.add("active");
        light = "dim";
        localStorage.setItem('lights', 'off');
        api.controlLights({
            light
        });
    }

}
