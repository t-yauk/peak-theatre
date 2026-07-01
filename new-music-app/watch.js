import jsonConfig from 'https://t-yauk.github.io/peak-theatre/lists/music-videos.json' with {type: "json"};
const id = Number(localStorage.getItem('video_id'));
const video = jsonConfig.music[id];
const v = document.getElementById("video");
let light;

window.onload = function() {

    v.src = "/Users/troyyauk/Downloads/music-videos/" + video.id;
    v.play();

}


document.addEventListener('keydown', function(event) {

    if(event.key === 'ArrowRight'){
        v.currentTime += 10;
    }else if(event.key === 'ArrowLeft'){
        v.currentTime -= 10;
    }else if(event.key === 'Backspace'){
        light = "on";
        localStorage.setItem('lights', 'on');
        api.controlLights({
            light
        });
        window.location.href = "index.html";
    }

});
