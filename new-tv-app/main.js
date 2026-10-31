import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};
const data = jsonConfig.shows;
const library = [];
let light;

const container = document.getElementById("library");
const pathway = "Z:/elements/tv/thumbnails";

let i;
let k = Number(localStorage.getItem('showID'));

window.onload = function() {

    light = "movies-on";
    localStorage.setItem('lights', 'on');
    api.controlLights({
        light
    });

    populate();

    setTimeout(function() {
        container.style.transition = "transform 1s ease";
    }, 500);

}

function populate() {

    for(i=0;i<data.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("library-item");
        newItem.innerHTML = `<img src="${pathway}/${data[i].image}">`;
        container.appendChild(newItem);
    }

    syncLibrary();

}

function syncLibrary() {

    const items = document.getElementsByClassName("library-item");

    for(i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
            items[i].classList.remove("nearby");
        } else if((i == (k+1)) || (i == (k-1))) {
            items[i].classList.remove("active");
            items[i].classList.add("nearby");
        } else {
            items[i].classList.remove("active");
            items[i].classList.remove("nearby");
        }
    }

    const width = items[0].offsetWidth;
    
    const offset = (((width + 50) * (k - 1)) * -1);

    if(k > 0){
        container.style.transform = `translateX(${offset}px)`;
    } else {
        container.style.transform = `translateX(0px)`;
    }

}





document.addEventListener('keydown', function(event) {

    if(event.key === 'Backspace' || event.key === 'h'){
        window.location.href = "home.html";
    }

    if(event.key === 'ArrowRight'){
        if(k < (data.length - 1)){
            k = k + 1;
            syncLibrary();
        }
    }else if(event.key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            syncLibrary();
        }
    }else if(event.key === 'Enter'){
        localStorage.setItem('showID', k);
        localStorage.setItem('the_episode', '0');
        window.location.href = "episodes.html";
    }

});
