const v = document.getElementById("main-video");
localStorage.setItem('filter_type', 'all');

window.onload = function() {

    v.play();


    setTimeout(function (){
        window.location.href = "home.html";
    }, 14000);

}
