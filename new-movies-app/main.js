import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
import jsonConfig2 from 'https://t-yauk.github.io/peak-theatre/lists/features.json' with {type: "json"};
import jsonConfig3 from 'https://t-yauk.github.io/peak-theatre/directors.json' with {type: "json"};
const data = jsonConfig.movies;
const features = jsonConfig2.movies;
const directors = jsonConfig3.directors;
const pw = (document.getElementsByClassName("profile-wrapper"))[0];
const lights = localStorage.getItem('lights');
let featured = [];
let library;
let f = 4;
let fK = 0;
let m = 0;
let k = 0;
let s = 0;
let action = "sidebar";
let xVal = 0;
let libX = 0;
let category;
let catalog;
let profType;
let p = 0;
let light;
let keyVal = 0;
let searchArray = [];
let filter = "genre";
let menuHTML = "2026 Movies";
const vw = (document.getElementsByClassName("video-wrapper"))[0];
const v = document.getElementById("video");
let xOff = 200;

window.onload = function() {

    const startItem = (document.getElementsByClassName("menu-item"))[0];

    startItem.style.border = "solid 2px #f9f8ff";

    library = data;


    light = "movies-on";
    localStorage.setItem('lights', 'on');
    api.controlLights({
        light
    });

    
    defineFeatures();

    populate();

}

function search(){

    const keys = document.getElementsByClassName("key");

    if(keys[keyVal].innerHTML == "space"){
        searchArray.push(" ");
    }else if(keys[keyVal].innerHTML == "back"){
        searchArray.length = searchArray.length - 1;
    }else if(keys[keyVal].innerHTML == "enter"){
        const searchString = searchArray.join("");
        localStorage.setItem('search-term', searchString);
        window.location.href = "search-results.html";
    }else{
        searchArray.push(keys[keyVal].innerHTML);
    }

    document.getElementById("search").innerHTML = searchArray.join("") + "|";

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

    if(filter == "genre"){
        category = menuHTML.replaceAll(" Movies", "");
        if(category == "2026"){
            catalog = data.filter(movies => movies.year && movies.year.includes("2026"));
        }else{
            catalog = data.filter(movies => movies.genre && movies.genre.includes(category));
        }
    }else if(filter == "year"){
        if(m == 0){
            catalog = data.filter(movies => movies.year && movies.year.includes("2026"));
        }else{
            category = menuHTML.slice(0,3);
            catalog = data.filter(movies => movies.year && movies.year.includes(category));
        }
    }else if(filter == "director"){
        category = menuHTML;
        catalog = data.filter(movies => movies.director && movies.director.includes(category));
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
        if((catalog[k].genre).length > 1){
            document.getElementById("genres").innerHTML = "<span class='genre'><span class='fa-solid fa-clock'></span> " + featured[fK].duration + "</span><span class='genre'>" + featured[fK].genre[0] + "</span><span class='genre'>" + featured[fK].genre[1] + "</span>";
        }else{
            document.getElementById("genres").innerHTML = "<span class='genre'>" + featured[fK].duration + "</span><span class='genre'>" + featured[fK].genre[0] + "</span>";
        }
    }else if(profType == "library"){
        document.getElementById("image").src = catalog[k].image_url;
        document.getElementById("title").innerHTML = catalog[k].title;
        document.getElementById("director").innerHTML = "Directed By " + catalog[k].director;
        document.getElementById("description").innerHTML = catalog[k].description;
        document.getElementById("year").innerHTML = catalog[k].year;
        if((catalog[k].genre).length > 1){
            document.getElementById("genres").innerHTML = "<span class='genre'><span class='fa-solid fa-clock'></span> " + catalog[k].duration + "</span><span class='genre'>" + catalog[k].genre[0] + "</span><span class='genre'>" + catalog[k].genre[1] + "</span>";
        }else{
            document.getElementById("genres").innerHTML = "<span class='genre'>" + catalog[k].duration + "</span><span class='genre'>" + catalog[k].genre[0] + "</span>";
        }
    }

    pw.classList.add("active");

}

function populateVideo() {

    if(profType == "features"){
        v.src = "D:\\peaktheatre\\movies\\trailers\\" + featured[fK].trailer_id;
    }else{
        v.src = "D:\\peaktheatre\\movies\\trailers\\" + catalog[k].trailer_id;
    }

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

    menuHTML = items[m].innerHTML;
    console.log(category);
    populate();

}

function syncLibrary(){

    const items = document.getElementsByClassName("library-item");
    const container = (document.getElementsByClassName("library"))[0];
    const hero = (document.getElementsByClassName("hero-item"))[0];

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    hero.style.backgroundImage = "url('" + catalog[k].previewImage + "')";
    hero.innerHTML = "<span class='title'>" + catalog[k].title + "<span class='year'>" + catalog[k].year + "</span></span>";
    container.style.transform = "translateX(" + libX + "px)";

}

function syncKeyboard(){

    const items = document.getElementsByClassName("key");

    for(let i=0;i<items.length;i++){
        if(i == keyVal){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

}

function syncSidebar() {

    const items = document.getElementsByClassName("sidebar-menu-item");

    for(let i=0;i<items.length;i++){
        if(i == s){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

}

function featuresListener(key){

    const container = (document.getElementsByClassName("featured-players-container"))[0];
    const items = document.getElementsByClassName("featured-player");

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
        }else{
            action = "sidebar";
            for(let i=0;i<items.length;i++){
                items[i].classList.remove("active");
            }
            syncSidebar();
        }
    }else if(key === 'ArrowDown'){
        container.classList.remove("active");
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        action = "menu";
        syncMenu(key);
    }else if(key === 'ArrowUp'){
        action = "awaitSearch";
        const sb = document.getElementsByClassName("searchbar");
        sb[0].style.border = "solid 5px white";
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
    }else if(key === 'Enter'){
        profType = "features";
        action = "profile";
        populateProfile();
    }else if(key === 'Backspace'){
        window.location.href = "home.html";
    }else if(key === 'm'){
        action = "sidebar";
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        syncSidebar();
    }

}

function menuListener(key){

    const items = document.getElementsByClassName("menu-item");
    const container = (document.getElementsByClassName("library"))[0];
    const featuredItems = document.getElementsByClassName("featured-player");
    const hero = (document.getElementsByClassName("hero"))[0];

    if(key === 'ArrowRight'){
        if(m < (items.length-1)){
            m = m + 1;
            xVal = xVal - xOff;
            container.style.transition = "0s";
            container.style.transform = "translateX(0px)";
            syncMenu();
        }
    }else if(key === 'ArrowLeft'){
        if(m > 0){
            m = m - 1;
            xVal = xVal + xOff;
            container.style.transition = "0s";
            container.style.transform = "translateX(0px)";
            syncMenu();
        }
    }else if(key === 'ArrowUp'){
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        for(let f=0;f<featuredItems.length;f++){
            featuredItems[f].classList.add("active");
        }
        action = "features";
        hero.classList.remove("active");
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
        hero.classList.add("active");
        syncLibrary();
    }else if(key === 'Backspace'){
        window.location.href = "home.html";
    }else if(key === 'm'){
        action = "sidebar";
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        syncSidebar();
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
    }else if(key === 'ArrowUp' || key === 'Backspace'){
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
    }else if(key === 'm'){
        action = "sidebar";
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        syncSidebar();
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

function searchListener(key){

    if(key === 'ArrowRight'){
        if(keyVal == 9 || keyVal == 19 || keyVal == 28){
            keyVal = keyVal;
        }else{
            keyVal = keyVal + 1;
        }
    }else if(key === 'ArrowLeft'){
        if(keyVal == 0 || keyVal == 10 || keyVal == 20){
            keyVal = keyVal;
        }else{
            keyVal = keyVal - 1;
        }
    }else if(key === 'ArrowDown'){
        if(keyVal < 20){
            if(keyVal == 19){
                keyVal = 28;
            }else{
                keyVal = keyVal + 10;
            }
        }
    }else if(key === 'ArrowUp'){
        if(keyVal > 9){
            keyVal = keyVal - 10;
        }
    }else if(key === 'Enter'){
        search();
    }else if(key === 'Backspace'){
        action = "features";
        const sb = document.getElementsByClassName("searchbar");
        const sw = document.getElementsByClassName("search-wrapper");
        document.getElementById("search").innerHTML = "search";
        sb[0].style.border = "solid 5px #393e3f";
        sw[0].classList.remove("active");
    }

    syncKeyboard();

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

function sidebarListener(key){

    const items = document.getElementsByClassName("sidebar-menu-item");
    const featuredItems = document.getElementsByClassName("featured-player");

    if(key === 'ArrowRight'){
        for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
        }
        if(s == 0){
            action = "awaitSearch";
            const sb = document.getElementsByClassName("searchbar");
            sb[0].style.border = "solid 5px white";
        }else{
            for(let x=0;x<featuredItems.length;x++){
                featuredItems[x].classList.add("active");
            }
            action = "features";
        }
    }else if(key === 'ArrowDown'){
        if(s < (items.length - 1)){
            s = s + 1;
            syncSidebar();
        }
    }else if(key === 'ArrowUp'){
        if(s > 0){
            s = s - 1;
            syncSidebar();
        }
    }else if(key === 'Enter'){
        actionSidebar();
    }

}

document.addEventListener('keydown', function(event) {

    const featuredItems = document.getElementsByClassName("featured-player");

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
    }else if(action == "search"){
        searchListener(event.key);
    }else if(action == "video"){
        videoListener(event.key);
    }else if(action == "sidebar"){
        sidebarListener(event.key);
    }else if(action == "awaitSearch"){
        if(event.key === 'ArrowDown'){
            action = "features";
            const sb = document.getElementsByClassName("searchbar");
            sb[0].style.border = "solid 5px #393e3f";
            for(let x=0;x<featuredItems.length;x++){
                featuredItems[x].classList.add("active");
            }
        }else if(event.key === 'ArrowLeft'){
            action = "sidebar";
            const sb = document.getElementsByClassName("searchbar");
            sb[0].style.border = "solid 5px #393e3f";
            syncSidebar();
        }else if(event.key === 'Enter'){
            action = "search";
            const sw = document.getElementsByClassName("search-wrapper");
            sw[0].classList.add("active");
        }
    }

});

function actionSidebar() {

    let the_container = (document.getElementsByClassName("categories-menu")[0]);
    const sidebarItems = document.getElementsByClassName("sidebar-menu-item");
    the_container.innerHTML = "";
    xVal = 0;
    document.getElementsByClassName("library")[0].style.transform = "translateX(0px)";
    m = 0;

    for(let i=0;i<sidebarItems.length;i++){
        sidebarItems[i].classList.remove("active");
    }

    if(s == 1){
        filter = "genre";
        the_container.innerHTML = "<div class='menu-item'>2026 Movies</div><div class='menu-item'>Action Movies</div><div class='menu-item'>Adventure Movies</div><div class='menu-item'>Comedy Movies</div><div class='menu-item'>Crime Movies</div><div class='menu-item'>Documentary Movies</div><div class='menu-item'>Drama Movies</div><div class='menu-item'>Family Movies</div><div class='menu-item'>Fantasy Movies</div><div class='menu-item'>Horror Movies</div><div class='menu-item'>Musical Movies</div><div class='menu-item'>Mystery Movies</div><div class='menu-item'>Noir Movies</div><div class='menu-item'>Romance Movies</div><div class='menu-item'>Sci-Fi Movies</div><div class='menu-item'>Sport Movies</div><div class='menu-item'>Thriller Movies</div><div class='menu-item'>War Movies</div><div class='menu-item'>Western Movies</div>";
        xOff = 200;
        syncMenu();
    }else if(s == 2){
        filter = "year";
        the_container.innerHTML = "<div class='menu-item'>2026 Movies</div><div class='menu-item'>2020 - 2026</div><div class='menu-item'>2010 - 2019</div><div class='menu-item'>2000 - 2009</div><div class='menu-item'>1990 - 1999</div><div class='menu-item'>1980 - 1989</div><div class='menu-item'>1970 - 1979</div><div class='menu-item'>1960 - 1969</div><div class='menu-item'>1950 - 1959</div><div class='menu-item'>1949 - 1940</div><div class='menu-item'>1930 - 1939</div><div class='menu-item'>1920 - 1929</div>";
        xOff = 150;
        syncMenu();
    }else if(s == 3){
        filter = "director";
        xOff = 225;
        for(let d=0;d<directors.length;d++){
            const newItem = document.createElement('div');
            newItem.classList.add("menu-item");
            newItem.innerHTML = directors[d];
            the_container.appendChild(newItem);
        }
        syncMenu();
    }

    action = "menu";

}
