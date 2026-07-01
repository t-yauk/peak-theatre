const container = (document.getElementsByClassName("menu"))[0];
const items = document.getElementsByClassName("menu-item");
let k = 0;
let x = 0;
let action;

window.onload = function() {

    syncMenu();

}

function syncMenu(){

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    container.style.transform = "translateX(" + x + "vw)";

}

document.addEventListener('keydown', function(event) {

    if(event.key === 'ArrowRight'){
        if(k < (items.length - 1)){
            k = k + 1;
            if(k > 1 && (k < (items.length - 2))){
                x = x - 24.25;
            }
            syncMenu();
        }
    }else if(event.key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
            if(k > 0 && (k < (items.length - 3))){
                x = x + 24.25;
            }
            syncMenu();
        }
    }else if(event.key === 'h' || event.key === 'Backspace'){
        window.location.href = "home.html";
    }else if(event.key === 'Enter'){
        if(k == 0){
            window.location.href = "home.html";
        }else if(k == 1){
            action = "restart";
            api.controlLights({
                action
            });
        }
    }

});
