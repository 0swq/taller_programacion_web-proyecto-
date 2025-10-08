window.GLOBAL = {
    mapa_actual: 1,
    musica_menu: document.getElementById("musica_menu"),
    click: document.getElementById("click"),
    click2: document.getElementById("click2"),
    crash: document.getElementById("crash"),

};
let intervalfondo = null;
GLOBAL.musica_menu.loop=true
GLOBAL.musica_menu.volume=0.4

window.dar_click = function(){
    GLOBAL.click.pause();
    GLOBAL.click.currentTime = 0;
    GLOBAL.click.play();
}

 