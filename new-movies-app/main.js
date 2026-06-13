import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
import jsonConfig2 from 'https://t-yauk.github.io/peak-theatre/lists/features.json' with {type: "json"};
const data = jsonConfig.movies;
const features = jsonConfig2.movies;
const pw = (document.getElementsByClassName("profile-wrapper"))[0];
const lights = localStorage.getItem('lights');
let featured = [];
let library;
let f = 4;
let fK = 0;
let m = 0;
let k = 0;
let action = "features";
let xVal = 0;
let libX = 0;
let category = "2026";
let catalog;
let profType;
let p = 0;
let light;

window.onload = function() {

    const startItem = (document.getElementsByClassName("menu-item"))[0];

    startItem.style.border = "solid 2px #f9f8ff";

    library = data;

    if(lights == 'off'){
        light = "movies-on";
        localStorage.setItem('lights', 'on');
        api.controlLights({
            light
        });
    }
    
    defineFeatures();

    populate();

}


async function defineFeatures() {

    for(let x=0;x<features.length;x++){
        const title = features[x].name;
        let id;
        for(let i=0;i<data.length;i++){
            if(title == data[i].title){
                id = i;
                break;
            }
        }
        featured.push(data[id]);
    }

    populateFeatures();

}

async function populateFeatures(){

    const container = (document.getElementsByClassName("featured-players-container"))[0];

    for(let i=((featured.length)-1);i>-1;i--){
        const newItem = document.createElement('div');
        newItem.classList.add("featured-player");
        newItem.style.backgroundImage = "url('" + featured[i].previewImage + "')";
        newItem.innerHTML = "<span class='title'>" + featured[i].title + "</span>";
        container.appendChild(newItem);
    }

    syncFeatures();

}

function populate() {

    const container = (document.getElementsByClassName("library"))[0];
    const hero = (document.getElementsByClassName("hero"))[0];
    container.innerHTML = "";

    if(category == "2026"){
        catalog = data.filter(movies => movies.year && movies.year.includes("2026"));
    }else{
        catalog = data.filter(movies => movies.genre && movies.genre.includes(category));
    }

    for(let i=0;i<catalog.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("library-item");
        newItem.style.backgroundImage = "url('" + catalog[i].image_url + "')";
        container.appendChild(newItem);
    }

    const newHero = document.createElement('div');
    newHero.classList.add("hero-item");
    newHero.style.backgroundImage = "url('" + catalog[0].previewImage + "')";
    hero.appendChild(newHero);

}

function populateProfile() {

    if(profType == "features"){
        document.getElementById("image").src = featured[fK].image_url;
        document.getElementById("title").innerHTML = featured[fK].title;
        document.getElementById("director").innerHTML = "Directed By " + featured[fK].director;
        document.getElementById("description").innerHTML = featured[fK].description;
        document.getElementById("year").innerHTML = featured[fK].year;
    }else if(profType == "library"){
        document.getElementById("image").src = catalog[k].image_url;
        document.getElementById("title").innerHTML = catalog[k].title;
        document.getElementById("director").innerHTML = "Directed By " + catalog[k].director;
        document.getElementById("description").innerHTML = catalog[k].description;
        document.getElementById("year").innerHTML = catalog[k].year;
    }

    pw.classList.add("active");

}

function syncFeatures(){

    const items = document.getElementsByClassName("featured-player");
    const container = (document.getElementsByClassName("featured-players-container"))[0];

    for(let i=0;i<items.length;i++){
        if(i > f){
            items[i].style.opacity = "0";
            items[i].style.transform = "scale(0.9)";
        }else if(i == f){
            items[i].classList.remove("hidden");
            items[i].style.opacity = "1";
            items[i].style.transform = "scale(1.0)";
            items[i].style.marginLeft = "0px";
        }else if(i < f){
            const d = (f - i) * 100;
            const s = 1.0 - (d * 0.001);
            console.log(s);
            items[i].classList.add("hidden");
            items[i].style.opacity = "1";
            items[i].style.transform = "scale(" + s + ")";
            items[i].style.opacity = s;
            items[i].style.marginLeft = d*1.95 + "px";
        }
    }

    container.classList.add("active");

}

function syncMenu() {

    const items = document.getElementsByClassName("menu-item");
    const container = (document.getElementsByClassName("categories-menu"))[0];

    for(let i=0;i<items.length;i++){
        if(i == m){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    container.style.transform = "translateX(" + xVal + "px)";

    const menuHTML = items[m].innerHTML;
    category = menuHTML.replaceAll(" Movies", "");
    console.log(category);
    populate();

}

function syncLibrary(){

    const items = document.getElementsByClassName("library-item");
    const container = (document.getElementsByClassName("library"))[0];

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    container.style.transform = "translateX(" + libX + "px)";

}

function featuresListener(key){

    const container = (document.getElementsByClassName("featured-players-container"))[0];

    if(key === 'ArrowRight'){
        if(f > 0){
            f = f - 1;
            fK = fK + 1;
            syncFeatures();
        }
    }else if(key === 'ArrowLeft'){
        if(f < (featured.length - 1)){
            f = f + 1;
            fK = fK - 1;
            syncFeatures();
        }
    }else if(key === 'ArrowDown'){
        container.classList.remove("active");
        action = "menu";
        syncMenu(key);
    }else if(key === 'Enter'){
        profType = "features";
        action = "profile";
        populateProfile();
    }

}

function menuListener(key){

    const items = document.getElementsByClassName("menu-item");
    const container = (document.getElementsByClassName("library"))[0];

    if(key === 'ArrowRight'){
        if(m < 18){
            m = m + 1;
            xVal = xVal - 200;
            container.style.transition = "0s";
            container.style.transform = "translateX(0px)";
            syncMenu();
        }
    }else if(key === 'ArrowLeft'){
        if(m > 0){
            m = m - 1;
            xVal = xVal + 200;
            container.style.transition = "0s";
            container.style.transform = "translateX(0px)";
            syncMenu();
        }
    }else if(key === 'ArrowUp'){
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        action = "features";
        syncFeatures();
    }else if(key === 'ArrowDown'){
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        items[m].style.border = "solid 2px #f9f8ff";
        container.style.transition = "1s";
        libX = 0;
        k = 0;
        action = "movies";
        syncLibrary();
    }

}

function libraryListener(key){

    const items = document.getElementsByClassName("library-item");

    if(key === 'ArrowRight'){
        if(k < (items.length - 1)){
            k = k + 1;
            if(items.length > 7){
                libX = libX - 212;
            }
            syncLibrary();
        }
    }else if(key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            if(items.length > 7){
                libX = libX + 212;
            }
            syncLibrary();
        }
    }else if(key === 'ArrowUp'){
        const menuItems = document.getElementsByClassName("menu-item");
        action = "menu";
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        for(let i=0;i<menuItems.length;i++){
            menuItems[i].style.border = "solid 5px #393e3f";
        }
        syncMenu();
    }else if(key === 'Enter'){
        action = "profile";
        profType = "library";
        populateProfile();
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
        if(profType == "features"){
            action = "features";
        }else if(profType == "library"){
            action = "movies";
        }
        p = 0;
        pw.classList.remove("active");
    }else if(key === 'Enter'){
        if(p == 0){
            if(profType == "features"){
                title = featured[fK].title;
            }else if(profType == "library"){
                title = catalog[k].title;
            }
            localStorage.setItem('the_title', title);
            light = "off";
            light;
            localStorage.setItem('lights', 'off');
            api.controlLights({
                light
            });
            window.location.href = "watch.html";
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

document.addEventListener('keydown', function(event) {

    if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(action == "features"){
        featuresListener(event.key);
    }else if(action == "menu"){
        menuListener(event.key);
    }else if(action == "movies"){
        libraryListener(event.key);
    }else if(action == "profile"){
        profileListener(event.key);
    }

});
