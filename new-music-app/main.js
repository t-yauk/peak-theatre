import jsonConfig from 'https://t-yauk.github.io/peak-theatre/lists/music.json' with {type: "json"};
const container = (document.getElementsByClassName("library"))[0];
const album = (document.getElementsByClassName("album"))[0];
const player = (document.getElementsByClassName("player"))[0];
const timeline = (document.getElementsByClassName("timeline"))[0];
const timespot = (document.getElementsByClassName("timespot"))[0];
const aud = document.getElementById("audio");
const pathway = "D:/peaktheatre/elements/music/";
const trackPath = "D:\\peaktheatre\\music\\";
const library = jsonConfig.music;
let k = 0;
let a = 0;
let action = "library";
let y = 0;
let ay = 0;
let c = 1;
let inCount = 0;
let trackCount;
let theTrack;
let theAlbum;
let interval1;
let interval2;
let controls = false;
let previous;
let light;
console.log(library);

window.onload = function() {

    console.log(window.innerWidth)

    populate();

}

function populate() {

    for(let i=0;i<library.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("library-item");
        newItem.innerHTML = "<div class='artwork' style=\"background-image:url('" + pathway + library[i].artwork + "')\"><div class='gradient'></div></div><div class='content'><span class='title'>" + library[i].title + "</span><span class='artist'>" + library[i].artist + "</span></div>";
        container.appendChild(newItem);
    }

    setTimeout(function() {
        syncLibrary();
    }, 500);

}

function populateAlbum() {

    const top = (document.getElementsByClassName("top-sec"))[0];
    const tw = (document.getElementsByClassName("track-wrapper"))[0];
    const tc = (document.getElementsByClassName("track-container"))[0];

    const tracks = library[k].tracks;
    trackCount = tracks.length;

    document.getElementById("artwork").src = pathway + library[k].artwork;
    document.getElementById("album-title").innerHTML = library[k].title;
    document.getElementById("the-artist").innerHTML = library[k].artist;

    if((library[k].title).length >= 15){
        document.getElementById("album-title").style.fontSize = "4vw";
    }else if((library[k].title).length >= 12){
        document.getElementById("album-title").style.fontSize = "5vw";
    }else{
        document.getElementById("album-title").style.fontSize = "5.8vw";
    }

    const topHeight = top.getBoundingClientRect().height;
    const artHeight = document.getElementById("artwork").getBoundingClientRect().height;

    const trackHeight = artHeight - topHeight;

    tw.style.maxHeight = (trackHeight - 50) + "px";

    for(let i=0;i<tracks.length;i++){
        const newTrack = document.createElement('span');
        newTrack.classList.add("track");
        if(tracks.length > 1){
            newTrack.innerHTML = (i+1) + ". " + tracks[i].title;
        }else{
            newTrack.innerHTML = tracks[i].title;
        }
        tc.appendChild(newTrack);
    }

    syncAlbum();

    album.classList.add("active");

}

async function syncLibrary() {

    const items = document.getElementsByClassName("library-item");

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    container.style.transform = "translateY(" + y + "px)";

}

function populatePlayer(){

    const artwork = (document.getElementsByClassName("album-artwork"))[0];

    aud.src = trackPath + theAlbum.id + "/" + theAlbum.tracks[theTrack].id;

    player.style.backgroundImage = "url('" + pathway + theAlbum.artwork + "')";
    artwork.src = pathway + theAlbum.artwork;
    document.getElementById("the-album-title").innerHTML = theAlbum.tracks[theTrack].title;
    document.getElementById("details").innerHTML = theAlbum.title + " <span style='font-size:0.7em'>•</span> " + theAlbum.artist;

    player.classList.add("active");

    setTimeout(function() {
        document.getElementsByClassName("main-wrapper")[0].style.background = "rgba(0,0,0,0.5)";
    }, 1000);

    aud.play();

    interval1 = setInterval(updateTimeline, 300);
    interval2 = setInterval(seconds, 1000);

    light = "dim";
    localStorage.setItem('lights', 'off');
    api.controlLights({
        light
    });

}

function syncAlbum() {

    const tracks = document.getElementsByClassName("track");
    const tc = (document.getElementsByClassName("track-container"))[0];

    for(let i=0;i<tracks.length;i++){
        if (i == a){
            tracks[i].classList.add("active");
        }else{
            tracks[i].classList.remove("active");
        }
    }

    tc.style.transform = "translateY(" + ay + "px)";
    
}

function syncControls() {

    const items = document.getElementsByClassName("control-item");

    for(let i=0;i<items.length;i++){
        if(c == i){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

}

function libraryListener(key){

    const items = document.getElementsByClassName("library-item");

    if(key === 'ArrowRight'){
        if(k < (items.length - 1)){
            k = k + 1;
            if(k % 4 === 0){
                y = y - 375;
            }
            syncLibrary();
        }
    }else if(key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            if((k + 1) % 4 === 0){
                y = y + 375;
            }
            syncLibrary();
        }
    }else if(key === 'ArrowDown'){
        if((k + 4) < (library.length)){
            k = k + 4;
            y = y - 375;
            syncLibrary();
        }
    }else if(key === 'ArrowUp'){
        if(k > 3){
            k = k - 4;
            y = y + 375;
            syncLibrary();
        }
    }else if(key === 'Enter'){

        action = "album";
        populateAlbum();

    }

}

function albumListener(key){
    
    const tracks = (document.getElementsByClassName("track-container"))[0];

    if(key === 'ArrowDown'){
        if(a < (trackCount - 1)){
            a = a + 1;
            if(a > 1){
                ay = ay - 44.5;
            }
            syncAlbum();
        }
    }else if(key === 'ArrowUp'){
        if(a > 0){
            a = a - 1;
            if(a > 0){
                ay = ay + 44.5;
            }
            syncAlbum();
        }
    }else if(key === 'Backspace'){
        action = "library";
        album.classList.remove("active");
        tracks.innerHTML = "";
        a = 0;
        ay = 0;
        tracks.style.transform = "translateY(" + ay + "px)";
    }else if(key === 'Enter'){
        previous = action;
        action = "player";
        theAlbum = library[k];
        theTrack = a;
        populatePlayer();
    }

}

function playerListener(key) {

    const items = document.getElementsByClassName("control-item");

    if(key === 'Backspace'){
        action = previous;
        player.classList.remove("active");
        light = "on";
        localStorage.setItem('lights', 'on');
        api.controlLights({
            light
        });
    }

    if(controls == true){
        if(key === 'ArrowRight'){
            if(c < 2){
                c = c + 1;
                syncControls();
            }
        }else if(key === 'ArrowLeft'){
            if(c > 0){
                c = c - 1;
                syncControls();
            }
        }else if(key === 'ArrowDown'){
            for(let i=0;i<items.length;i++){
                items[i].classList.remove("active");
            }
            controls = false;
        }else if(key === 'Enter'){
            if(c == 0){
                if(aud.currentTime > 3){
                    aud.currentTime = 0;
                }else{
                    theTrack = theTrack - 1;
                    aud.src = trackPath + theAlbum.id + "/" + theAlbum.tracks[theTrack].id;
                    document.getElementById("the-album-title").innerHTML = theAlbum.tracks[theTrack].title;
                    aud.play();
                    for(let i=0;i<items.length;i++){
                        items[i].classList.remove("active");
                    }
                    controls = false;
                }
            }else if(c == 1){
                if(aud.paused){
                    aud.play();
                }else{
                    aud.pause();
                }
            }else if(c == 2){
                theTrack = theTrack + 1;
                aud.src = trackPath + theAlbum.id + "/" + theAlbum.tracks[theTrack].id;
                document.getElementById("the-album-title").innerHTML = theAlbum.tracks[theTrack].title;
                aud.play();
                for(let i=0;i<items.length;i++){
                    items[i].classList.remove("active");
                }
                controls = false;
            }
        }
    }else{
        if(key === 'ArrowRight'){
            aud.currentTime += 10;
        }else if(key === 'ArrowLeft'){
            aud.currentTime -= 10;
        }else if(key === 'ArrowUp'){
            controls = true;
            syncControls();
        }
    }

}


document.addEventListener('keydown', function(event) {

    inCount = 0;

    if(event.key === "h"){
        window.location.href = "home.html";
    }

    if(action == "library"){
        libraryListener(event.key);
    }else if(action == "album"){
        albumListener(event.key);
    }else if(action == "player"){
        playerListener(event.key);
    }

});




function updateTimeline() {
    const perc = (aud.currentTime / aud.duration) * 100;

    timeline.style.width = perc + "%";
    //timeline.style.transform = `scaleX(${perc / 100})`;
    timespot.style.left = perc + "%";

    requestAnimationFrame(updateTimeline);
}


function seconds() {
    const rem = aud.duration - aud.currentTime;
    document.getElementById("the-time").innerHTML = convertSecondsToHHMMSS(aud.currentTime) + "&emsp;&emsp;<span style='font-weight:normal'>|</span>&emsp;&emsp;" + convertSecondsToHHMMSS(aud.duration);
    if(rem < 0.5){
        theTrack = theTrack + 1;
        /*if(theTrack == (theAlbum.tracks).length){
            light = "music";
            api.controlLights({
                light
            });
            //window.location.href = "album-2.html";
        }*/
        aud.src = trackPath + theAlbum.id + "/" + theAlbum.tracks[theTrack].id;
        document.getElementById("the-album-title").innerHTML = theAlbum.tracks[theTrack].title;
        aud.play();
    }

    const isPlaying = !aud.paused && !aud.ended && aud.currentTime > 0;
    const isPaused = aud.paused;

    if(isPaused){
        const control = (document.getElementsByClassName("control-item"))[1];
        control.innerHTML = "<span class='fa-solid fa-play'></span>"
    }else{
        const control = (document.getElementsByClassName("control-item"))[1];
        control.innerHTML = "<span class='fa-solid fa-pause'></span>"
    }

    if(action !== "player" && isPlaying){
        inCount += 1;
        if(inCount > 30){
            player.classList.add("active");
            previous = action;
            action = "player";
            light = "dim";
            localStorage.setItem('lights', 'off');
            api.controlLights({
                light
            });
        }
    }
}


function convertSecondsToHHMMSS(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
