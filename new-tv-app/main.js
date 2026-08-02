import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};
const container = document.getElementById("library");
const wrapper = (document.getElementsByClassName("library-wrapper"))[0];
const b = (document.getElementsByClassName("blur"))[0];
const data = jsonConfig.shows;
let library = [];
let k = 0;
let xOffset = 20.8;
let disabled = true;
let light;

window.onload = function() {

    light = "movies-on";
    localStorage.setItem('lights', 'on');
    api.controlLights({
        light
    });

    populateLibrary();

    setTimeout(function() {

        b.classList.remove("active");
        wrapper.style.backgroundImage = `url("D:/peaktheatre/elements/tv/artwork/${library[k].image_url}")`;

    }, 500);

}

async function populateLibrary() {

    for(let i=0;i<data.length;i++){
        const requestURL = data[i].url;
        const request = new Request(requestURL);

        const response = await fetch(request);
        const rawJSON = await response.json();

        library.push(rawJSON);
    }

    populate();

}

async function populate() {

    for(let i=0;i<library.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("library-item");
        newItem.classList.add("library-item-position");
        newItem.innerHTML = `<img src="D:/peaktheatre/elements/tv/thumbnails/${data[i].image}"><div class="gradient-overlay"></div>`
        container.appendChild(newItem);
    }

    setTimeout(function() {
        disabled = false;
        activeItem();
    }, 3000);

}

function activeItem() {

    const items = document.getElementsByClassName("library-item");

    wrapper.style.backgroundImage = `url("D:/peaktheatre/elements/tv/artwork/${library[k].image_url}")`;

    const x = ((xOffset * (k - 1) + (k * 1))) * -1;
    
    if(k == (library.length - 3)){
        container.style.transform = `translateX(${x+7.8}vw)`;
    }else if((k < (library.length - 2))){
        if((k > 1)){
            container.style.transform = `translateX(${x}vw)`;
        }else{
            container.style.transform = `translateX(0vw)`;
        }
    }

    for(let i=0;i<items.length;i++){
        if(i == k){
            if(i == 0){
                items[i].classList.add("origin-active");
            }else{
                items[i].classList.add("active");
            }
        }else{
            items[i].classList.remove("origin-active");
            items[i].classList.remove("active");
        }
    }

}










document.addEventListener('keydown', function(event) {

    if(disabled == false){
        if(event.key === 'ArrowRight'){
            if(k < (data.length - 1)){
                k = k + 1;
                activeItem();
            }
        }else if(event.key === 'ArrowLeft'){
            if(k > 0){
                k = k - 1;
                activeItem();
            }
        }else if(event.key === 'h'){
            window.location.href = "home.html";
        }else if(event.key === 'Enter'){
            localStorage.setItem('showID', k);
            localStorage.setItem('the_episode', '0');
            b.classList.add("active");

            setTimeout(function() {
                window.location.href = "episodes.html";
            }, 3000);
        }
    }

})
