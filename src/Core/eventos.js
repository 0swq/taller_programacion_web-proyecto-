//Este archivo contiene los eventos atribuidos a etiquetas de html
import {cambiarFondo, intervalfondo, dar_click} from "./utils";
import {mapa1, data_a_mapa} from "../data_prehecha/mapas";
import {comenzar_gameplay} from "./gameplay";
import * as gameplay from "./gameplay";
import {global} from "./global";


//Evento para cuando se de click al boton continuar en la intro de el juego

let boton_continuar = document.getElementById("continuarBtn");
boton_continuar.addEventListener("click", function () {
    if (intervalfondo !== null) {
        clearInterval(intervalfondo);
    }
    dar_click()
    intervalfondo = setInterval(cambiarFondo, 7000);
});


//Eventos para las 3 opciones en la sección de mapas
let mapa1 = document.getElementById("mapa1_btn");
let mapa2 = document.getElementById("mapa2_btn");
let mapa3 = document.getElementById("mapa3_btn");

mapa1.addEventListener("click", function () {
    comenzar_gameplay(data_a_mapa(mapa1));
});
mapa2.addEventListener("click", function () {

});
mapa3.addEventListener("click", function () {

});

//Evento y funciones comunes para elementos

//Botones menu
let botones = [
    document.getElementById("mapas_btn"),
    document.getElementById("autos_btn"),
    document.getElementById("instrucciones_btn"),
    document.getElementById("configuraciones_btn"),
    document.getElementById("configuraciones_btn"),
    document.getElementById("volver_gameplay_btn")
];

//Este evento hace que al presionar suene el sonido de click
botones.forEach(boton => {
    boton.addEventListener("click", function () {
        dar_click();
    });
});

//Este metodo agrega el evento de deteccion de teclas para cuando comience el gameplay
export function agregar_input_tecla() {
    if (global.teclas_actuales === 1) {
        global.teclas = {
            arrowright: "derecha",
            arrowleft: "izquierda",
            arrowup: "arriba",
        };
    } else if (global.teclas_actuales === 0) {
        global.teclas = {
            d: "derecha",
            a: "izquierda",
            w: "arriba",
        };
    }

    global.keydown = (e) => {
        let key = e.key.toLowerCase();
        if (key === "shift") gameplay.shift_activado = true;
        switch (global.teclas[key]) {
            case "derecha":
                gameplay.moverDerecha = true;
                break;
            case "izquierda":
                gameplay.moverIzquierda = true;
                break;
            case "arriba":
                gameplay.moverArriba = true;
                break;
        }
    };

    global.keyup = (e) => {
        let key = e.key.toLowerCase();
        if (key === "shift") gameplay.shift_activado = false;
        switch (global.teclas[key]) {
            case "derecha":
                gameplay.moverDerecha = false;
                break;
            case "izquierda":
                gameplay.moverIzquierda = false;
                break;
            case "arriba":
                gameplay.moverArriba = false;
                break;
        }
    };

    document.addEventListener("keydown", global.keydown);
    document.addEventListener("keyup", global.keyup);
}


export function remover_input_tecla() {
    document.removeEventListener("keydown", global.keydown);
    document.removeEventListener("keyup", global.keyup);
    global.keydown = null;
    global.keyup = null;
}


//Seleccion de autos
let auto1 = document.getElementById("seleccionar_auto_1")
let auto2 = document.getElementById("seleccionar_auto_2")
let auto3 = document.getElementById("seleccionar_auto_3")
let auto_actual_menu = document.getElementById("auto_actual_menu")

//Agrega un evento para cada opcion de auto, este modifica la variable global de auto actual cambiando
//su img ya que es una instancia de un sprite a la vez que cambia el gif del menu principal
auto1.addEventListener("click", function() {
    global.sprite_auto_actual.img=new Image().src("/Recursos/Sprites/Auto-1.png");
    auto_actual_menu.src = "/Recursos/Assets/Car1.gif"
    window.dar_click()
});

auto2.addEventListener("click", function() {
    global.sprite_auto_actual.img=new Image().src("/Recursos/Sprites/Auto-2.png");
    auto_actual_menu.src = "/Recursos/Assets/Car2.gif"
    window.dar_click()
});


auto3.addEventListener("click", function() {
    global.sprite_auto_actual.img=new Image().src("/Recursos/Sprites/Auto-3.png");
    auto_actual_menu.src = "/Recursos/Assets/Car3.gif"
    window.dar_click()
});


//
