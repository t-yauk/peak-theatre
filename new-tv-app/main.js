import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};
const library = jsonConfig.shows;
const pathway = "D:/peaktheatre/elements/tv/thumbnails/";
const heroPath = "D:/peaktheatre/elements/tv/artwork/";
const logoPath = "D:/peaktheatre/elements/tv/logos/";
const container = (document.getElementsByClassName("library"))[0];
const hero = (document.getElementsByClassName("hero"))[0];
let k = 0;
let x = 0;

window.onload = function() {

    populate();

}

function populate(){

    for(let i=0;i<library.length;i++){
        const item = document.createElement('div');
        item.classList.add("library-item");
        item.style.backgroundImage = "url('" + pathway + library[i].image + "')";
        item.innerHTML = "<div class='gradient'></div>";
        container.appendChild(item);
    }

    setTimeout(function() {
        syncLibrary();
    }, 1000);

}

async function syncLibrary(){

    const items = document.getElementsByClassName("library-item");

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    container.style.transform = "translateX(" + x + "vw)";

    populateHero();

}

async function populateHero(){

    const requestURL = library[k].url;
  	const request = new Request(requestURL);

  	const response = await fetch(request);
  	const rawJSON = await response.json();
    const image = rawJSON.image_url;
    const logo = rawJSON.logo;
    const desc = rawJSON.description;
    
    hero.style.backgroundImage = "url('" + heroPath + image + "')";
    document.getElementById("logo").style.backgroundImage = "url('" + logoPath + logo + "')";
    document.getElementById("description").innerHTML = desc;

}



document.addEventListener('keydown', function(event) {

    if(event.key === 'ArrowRight'){
        if(k < (library.length - 1)){
            k = k + 1;
            if(k > 1){
                x = x - 20.25;
            }
            syncLibrary();
        }
    }else if(event.key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            if(k > 0){
                x = x + 20.25;
            }
            syncLibrary();
        }
    }else if(event.key === 'Enter'){
        container.style.transition = "2s";
        hero.style.transition = "2s";
        container.style.top = "102vh";
        hero.style.transform = "translateY(-70vh)";
        document.body.style.transition = "3s";
        document.body.style.background = "black";

        localStorage.setItem('series_url', library[k].url);
        localStorage.setItem('show_id', k);

        setTimeout(function() {
            window.location.href = "episodes.html";
        }, 3500);
    }

});
