import {Sprite} from "../Entidades/Sprite";
//Variables que cambiran constantemente
export const global = {
    musica_menu: document.getElementById("musica_menu"),
    crash: document.getElementById("crash"),
    auto_actual:1,
    sprite_auto_actual:new Sprite(new Image().src("/Recursos/Sprites/Auto-1.png"),0,0,0,0,null),
    teclas_actuales:1,
    teclas:null,
    keydown:null,
    keyup:null,
    interval_contador:null,
};