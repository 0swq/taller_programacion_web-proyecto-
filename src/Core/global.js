import {Sprite} from "../Entidades/Sprite.js";

let img_auto = new Image();
img_auto.src = "/Recursos/Sprites/Auto-1.png";

export let global = {
    musica_menu: null,
    crash: null,
    auto_actual: 1,
    sprite_auto_actual: null, // se inicializa después
    teclas_actuales: 1,
    teclas: null,
    keydown: null,
    keyup: null,
    interval_contador: null,
};

export function inicializarGlobal() {
    global.musica_menu = document.getElementById("musica_menu");
    global.crash = document.getElementById("crash");

    const canvasCentro = document.getElementById("canvasCamino");

    global.sprite_auto_actual = new Sprite(img_auto, 0, 0, 0, 0, canvasCentro);
}

export const puntajes=[]
