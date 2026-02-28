import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
import dirConfig from 'https://t-yauk.github.io/peak-theatre/directors.json' with {type: "json"};
const directors = dirConfig.directors;

const filter = localStorage.getItem('filter_type');
const ft = (document.getElementsByClassName("filter-title"))[0];
let library;
let y = 0;
let origin = 0;

if(filter == "all"){
    library = jsonConfig.movies;
    ft.style.display = "none";
}else if(filter == "genre"){
    library = jsonConfig.movies;
    const the_genre = localStorage.getItem('genre');
    library = library.filter(movies => movies.genre && movies.genre.includes(the_genre));
    document.getElementById("the-title").innerHTML = the_genre + " Movies";
    y = 162;
    origin = 162;
}else if(filter == "year"){
    library = jsonConfig.movies;
    const the_year = localStorage.getItem('year');
    library = library.filter(movies => movies.year && movies.year.includes(the_year));
    if(the_year == "202"){
        document.getElementById("the-title").innerHTML = the_year + "0 - " + the_year + "6";
    }else{
        document.getElementById("the-title").innerHTML = the_year + "0 - " + the_year + "9";
    }
    y = 162;
    origin = 162;
}else if(filter == "director"){
    library = jsonConfig.movies;
    const the_director = localStorage.getItem('director');
    library = library.filter(movies => movies.director && movies.director.includes(the_director));
    document.getElementById("the-title").innerHTML = "Directed By " + the_director;
    y = 162;
    origin = 162;
}

const container = (document.getElementsByClassName('library'))[0];
const pw = (document.getElementsByClassName('profile-wrapper'))[0];
const v = document.getElementById("video");
const m = (document.getElementsByClassName("menu"))[0];
const menus = document.getElementsByClassName("menu-list");

let key = 0;
let pk = 0;
let row = 8;
let profVis = false;
let vidVis = false;
let menuVis = false;
let reset = false;
let vTime;
let init = true;
let menuID = 0;
let mm = 0;
let gm = 0;
let ym = 0;
let dm = 0;
let mY = 0;

window.onload = function() {

    console.log(container);
    
    populate();
    populateDirectors();

}

function populate(){

    for(let i=0;i<library.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add('library-item');
        newItem.style.backgroundImage = "url('" + library[i].image_url + "')";
        newItem.style.background = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + library[i].image_url + "');";
        container.appendChild(newItem);
        const img = document.createElement('img');
        img.src = library[i].previewImage;
        document.getElementById("img-db").appendChild(img);
        const titles = document.createElement('div');
        titles.classList.add('item-title');
        titles.innerHTML = "<span class='title'>" + library[i].title + "</span>";
        document.getElementById("library-titles").appendChild(titles);
    }

    setTimeout(function() {
        const the_items = document.getElementsByClassName("library-item");
        for(let i=0;i<the_items.length;i++){
            const delay = i * 100;
            setTimeout(function (){
                the_items[i].style.transform = "translateY(" + y + "px)";
            }, delay);
        }
    }, 500);

}

function populateDirectors(){
    const directorMenu = (document.getElementsByClassName("menu-list"))[3];
    for(let i=0;i<directors.length;i++){
        const newItem = document.createElement('span');
        newItem.classList.add("director-menu");
        newItem.classList.add("menu-item");
        if(i == 0){
            newItem.classList.add("active");
        }
        newItem.innerHTML = directors[i];
        directorMenu.appendChild(newItem);
    }
    const newItem = document.createElement('span');
    newItem.classList.add("director-menu");
    newItem.classList.add("menu-item");
    newItem.innerHTML = "Return To Main Menu";
    directorMenu.appendChild(newItem);
}

function active(){

    console.log(key);

    const items = document.getElementsByClassName("library-item");
    const titles = document.getElementsByClassName("item-title");

    console.log(row);
    for(let i=0;i<items.length;i++){
        if(i == key){
            items[i].classList.add("active");
            items[i].classList.remove("row");
            titles[i].classList.add("active");
            titles[i].classList.remove("row");
            items[i].style.backgroundImage = "url('" + library[i].previewImage + "')";
        }else if(i < row && i >= (row - 8)){
            items[i].classList.remove("active");
            items[i].classList.add("row");
            titles[i].classList.remove("active");
            titles[i].classList.add("row");
            items[i].style.backgroundImage = "url('" + library[i].image_url + "')";
        }else{
            items[i].classList.remove("active");
            items[i].classList.remove("row");
            titles[i].classList.remove("active");
            titles[i].classList.remove("row");
            items[i].style.backgroundImage = "url('" + library[i].image_url + "')";
        }
        items[i].style.transform = "translateY(" + y + "px)";
        titles[i].style.transform = "translateY(" + y + "px)";
    }

}




function getProfile(){
    document.getElementById('profile-picture').src = library[key].image_url;
    if(library[key].subtitle == undefined){
        document.getElementById('title').innerHTML = library[key].title;
    }else{
        document.getElementById('title').innerHTML = library[key].title + "<span class='subtitle'>" + library[key].subtitle + "</span>";
    }
    document.getElementById('director').innerHTML = "Directed By: " + library[key].director;
    document.getElementById('description').innerHTML = library[key].description;
    
}

function profileMenu(){
    const menuItems = document.getElementsByClassName("profile-menu-item");
    for(let i=0;i<menuItems.length;i++){
        if(i == pk){
            menuItems[i].classList.add("active");
        }else{
            menuItems[i].classList.remove("active");
        }
    }
}

function getVideo(){
    setTimeout(function() {
        v.src = "/Volumes/pkTH/library/trailers/" + library[key].trailer_id;
        v.play();
        v.volume = 0.3;
        vTime = setInterval(timecode, 1000);
    }, 2500);
}

function timecode(){
    const time = v.duration - v.currentTime;
    console.log(time);
    if(time < 1){
        profVis = true;
        vidVis = false;
        v.classList.remove("active");
        v.pause();
        v.src = "../media/elements/v/0001.mp4";
        clearInterval(vTime);
        vTime = "";
    }
}








function findMenu(){
    for(let i=0;i<menus.length;i++){
        if(i == menuID){
            menus[i].classList.add("active");
        }else{
            menus[i].classList.remove("active");
        }
    }
}

function mainMenu(){
    const mainMenu = document.getElementsByClassName("main-menu");

    if(mm == mainMenu.length){
        mm = 0;
    }else if(mm < 0){
        mm = mainMenu.length - 1;
    }

    for(let i=0;i<mainMenu.length;i++){
        if(i == mm){
            mainMenu[i].classList.add("active");
        }else{
            mainMenu[i].classList.remove("active");
        }
    }
}

function runMainMenu(){

    if(mm == 0){
        menuID = 1;
        menus[1].style.transform = "translate(0px, 0px)";
        genreMenu();
        findMenu();
    }else if(mm == 1){
        menuID = 2;
        menus[2].style.transform = "translate(0px, 0px)";
        yearMenu();
        findMenu();
    }else if(mm == 2){
        menuID = 3;
        menus[3].style.transform = "translate(0px, 0px)";
        directorMenu();
        findMenu();
    }else if(mm == 3){
        localStorage.setItem('filter_type', 'all');
        window.location.href = "movies.html";
    }else if(mm == 4){
        window.location.href = "index.html";
    }

}

function genreMenu(){

    const genreMenu = document.getElementsByClassName("genre-menu");

    if(gm == genreMenu.length){
        gm = 0;
        mY = 0;
    }else if(gm < 0){
        gm = genreMenu.length - 1;
        mY = -1080;
    }

    menus[1].style.transform = "translate(0px, " + mY + "px)";

    for(let i=0;i<genreMenu.length;i++){
        if(i == gm){
            genreMenu[i].classList.add("active");
        }else{
            genreMenu[i].classList.remove("active");
        }
    }

}

function runGenreMenu(){

    if(gm < 18){
        const genreList = document.getElementsByClassName("genre-menu");
        const genre = (genreList[gm].innerHTML).replace(" Movies", ""); ;
        console.log(genre);
        localStorage.setItem('filter_type', 'genre');
        localStorage.setItem('genre', genre);
        window.location.href = "movies.html";
    }else if(gm = 18){
        menuID = 0;
        mY = 0;
        gm = 0;
        mm = 0;
        menus[1].style.transform = "translate(400px, -1080px)";
        setTimeout(function (){
            menus[1].style.transform = "translate(400px, 0px)";
        }, 1000);
        findMenu();
    }

}

function yearMenu(){

    const yearMenu = document.getElementsByClassName("year-menu");

    if(ym == yearMenu.length){
        ym = 0;
    }else if(ym < 0){
        ym = yearMenu.length - 1;
    }

    for(let i=0;i<yearMenu.length;i++){
        if(i == ym){
            yearMenu[i].classList.add("active");
        }else{
            yearMenu[i].classList.remove("active");
        }
    }

}

function runYearMenu(){

    if(ym < 12){
        const yearMenu = document.getElementsByClassName("year-menu");
        let year;
        if(yearMenu[ym].innerHTML == "2026"){
            year = yearMenu[ym].innerHTML;
        }else{
            year = yearMenu[ym].innerHTML;
            year = year.slice(0, 3);
        }
        localStorage.setItem('filter_type', 'year');
        localStorage.setItem('year', year);
        window.location.href = "movies.html";
    }else if(ym = 12){
        menuID = 0;
        ym = 0;
        mm = 0;
        menus[2].style.transform = "translate(400px, 0px)";
        mainMenu();        
        findMenu();
    }

}

function directorMenu(){

    const directorMenu = document.getElementsByClassName("director-menu");

    if(dm == directorMenu.length){
        dm = 0;
        mY = 0;
    }else if(dm < 0){
        dm = directorMenu.length - 1;
        mY = -1680;
    }

    menus[3].style.transform = "translate(0px, " + mY + "px)";

    for(let i=0;i<directorMenu.length;i++){
        if(i == dm){
            directorMenu[i].classList.add("active");
        }else{
            directorMenu[i].classList.remove("active");
        }
    }

}

function runDirectorMenu(){

    if(dm < 28){
        const directorList = document.getElementsByClassName("director-menu");
        const director = directorList[dm].innerHTML;
        localStorage.setItem('filter_type', 'director');
        localStorage.setItem('director', director);
        window.location.href = "movies.html";
    }else if(dm == 28){
        menuID = 0;
        mY = 0;
        dm = 0;
        mm = 0;
        menus[3].style.transform = "translate(400px, -1680px)";
        setTimeout(function (){
            menus[3].style.transform = "translate(400px, 0px)";
        }, 1000);
        mainMenu();
        findMenu();
    }

}





document.addEventListener('keydown', function(event) {

    if(profVis == false && vidVis == false && menuVis == false){
        if(event.key === 'ArrowRight'){
            if(init == true){
                key = 0;
                init = false;
            }else{
                key = key + 1;
            }
            if(key == library.length){
                key = 0;
                row = 8;
                y = origin;
            }
            if(library.length > 24){
                if((key % 8 === 0) && key !== 0){
                    row = row + 8;
                    if(row > 16){
                        y = y - 360;
                    }
                }
            }else{
                if(key < 8){
                    row = 8;
                }if(key > 7 && key < 16){
                    row = 16;
                }else if(key > 15 && key < 24){
                    row = 25;
                }
            }
            active();
        }else if(event.key === 'ArrowLeft' && init == false){
            if(key > 0){
                key = key - 1;
                if(library.length > 23){
                    if((key+1) % 8 === 0){
                        row = row - 8;
                        y = y + 360;
                    }
                }else{
                    if(key < 8){
                        row = 8;
                    }else if(key > 7 && key < 16){
                        row = 16;
                    }else if(key > 15 && key < 24){
                        row = 24;
                    }
                }
            }
            active();
        }else if(event.key === 'ArrowDown'){
            if(library.length > 15){
                if(init == true){
                    key = 0;
                    init = false;
                }else{
                    key = key + 8;
                    row = row + 8;
                }
                if(row > 16){
                    y = y - 360;
                }
                if(key > (library.length - 1)){
                    key = 0;
                    row = 8;
                    y = origin;
                    reset = true;
                }
            }
            active();
        }else if(event.key === 'ArrowUp' && init == false){
            if(row > 8){
                key = key - 8;
                row = row - 8;
                if(row > 8){
                    y = y + 360;
                }
            }
            active();
        }else if(event.key === 'm'){
            menuVis = true;
            m.classList.add("active");
            findMenu();
        }else if(event.key === 'Enter'){
            pw.classList.add('active');
            getProfile();
            profVis = true;
        }
    }else if(menuVis == true){

        if(event.key === 'ArrowDown'){

            if(menuID == 0){
                mm = mm + 1;
                mainMenu();
            }else if(menuID == 1){
                gm = gm + 1;
                mY = mY - 60;
                genreMenu();
            }else if(menuID == 2){
                ym = ym + 1;
                yearMenu();
            }else if(menuID == 3){
                dm = dm + 1;
                mY = mY - 60;
                directorMenu();
            }

        }else if(event.key === 'ArrowUp'){

            if(menuID == 0){
                mm = mm - 1;
                mainMenu();
            }else if(menuID == 1){
                gm = gm - 1;
                mY = mY + 60;
                genreMenu();
            }else if(menuID == 2){
                ym = ym - 1;
                yearMenu();
            }else if(menuID == 3){
                dm = dm - 1;
                mY = mY + 60;
                directorMenu();
            }

        }else if(event.key === 'Enter'){

            if(menuID == 0){
                runMainMenu();
            }else if(menuID == 1){
                runGenreMenu();
            }else if(menuID == 2){
                runYearMenu();
            }else if(menuID == 3){
                runDirectorMenu();
            }

        }else if(event.key === 'm'){

            menuVis = false;
            menuID = 0;
            m.classList.remove('active');

        }

    }else if(profVis == true){

        if(event.key === 'ArrowRight'){
            pk = pk + 1;
            if(pk > 1){
                pk = 0;
            }
            profileMenu();
        }else if(event.key === 'ArrowLeft'){
            pk = pk - 1;
            if(pk < 0){
                pk = 1;
            }
            profileMenu();
        }else if(event.key === 'Enter'){
            if(pk == 0){
                localStorage.setItem('the_title', library[key].title);
                pw.classList.add('clicked');
                setTimeout(function(){
                    window.location.href = "watch.html";
                }, 3000);
            }else if(pk == 1){
                v.classList.add('active');
                profVis = false;
                vidVis = true;
                getVideo();
            }
        }else if(event.key === 'Backspace'){
            pw.classList.remove('active');
            pk = 0;
            profileMenu();
            profVis = false;
        }

    }else if(vidVis == true){

        if(event.key === 'ArrowRight'){
            v.currentTime = v.currentTime + 10;
        }else if(event.key === 'ArrowLeft'){
            v.currentTime = v.currentTime - 10;
        }else if(event.key === 'Backspace'){
            profVis = true;
            vidVis = false;
            v.classList.remove("active");
            v.pause();
            v.src = "../media/elements/v/0001.mp4";
            clearInterval(vTime);
            vTime = "";
        }

    }

});    
