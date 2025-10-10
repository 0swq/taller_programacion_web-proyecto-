import * as eventos from "/eventos.js"
import {global} from "./global";
import * as utils from "./utils.js"
import {boton_continuar} from "./utils.js";
import {Sprite} from "../Entidades/Sprite";
import {datos} from "../data_prehecha/datos.js"

//Estados de las teclas
export let moverDerecha = false;
export let moverIzquierda = false;
export let moverArriba = false;
export let shift_activado = false;


let velocidad_general = 0;
let velocidad_lateral_shift = 2;
let velocidad_lateral = 1;
let velocidad_avanzar = 1;
let velocidad_retroceso = 0.01;
let cuadricula_horizontal=6

let velocidad_inicial = 5;
let teclas_actuales = 1;

//Objetos en pantalla
let fondos_izquierda = [];
let fondos_derecha = [];
let fondos_centro = [];
let obstaculos = [];
let bonificadores = [];

//Tiempos
let tiempo_previo = performance.now()
let tiempo_transcurrido = 0
//Canvas
let canvas_izquierda=document.getElementById("canvasIzquierda")
let canvas_derecha=document.getElementById("canvasDerecha")
let canvas_centro=document.getElementById("canvasCamino")


function gameLoop() {
    //Definimos el tiempo delta
    let delta = performance.now() - tiempo_previo;
    tiempo_previo = performance.now();
    //Actualizamos el tiempo transcurrido
    tiempo_transcurrido += delta
    //Actualizamos la velocidad que crece con uan función exponencial para aumentar la velocidad
    velocidad_general = velocidad_inicial * Math.pow(1.01, tiempo_transcurrido);
    //Esta sección son para todos los métodos que se ejecutan en el loop

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


//Contador de tiempo transcurrido convencional
function iniciar_contador() {
    //Inicializamos variables
    let minutos = 0;
    let segundos = 0;
    let seg_f = "00", min_f = "00";
    //Limpiamos el contador
    document.getElementById("temporizador").textContent = "00:00";
    global.interval_contador = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos += 1;
        }
        if (segundos < 10) {
            seg_f = "0" + segundos
        } else {
            seg_f = segundos
        }
        if (minutos < 10) {
            min_f = "0" + minutos
        } else {
            min_f = minutos
        }
        //Concatenamos resultados
        document.getElementById("temporizador").textContent = min_f + ":" + seg_f;
        //Repetir cada 1 segundo
    }, 1000);
}

function finalizar_contador() {
    //Removemos el interval
    clearInterval(global.interval_contador);

}


//Metodo para iniciar
let gameplay = document.getElementById("gameplay")
let musica_gameplay = document.getElementById("musica_gameplay");
let cuenta_regresiva = document.getElementById("cuenta_regresiva");

export function comenzar_gameplay(mapa) {
    //Primero llamamos al método que activa las entradas de teclado
    eventos.agregar_input_tecla()
    //Cambiamos el fondo y música
    gameplay.style.backgroundImage = "url(" + mapa.fondo_principal_src + ")";
    musica_gameplay.src = mapa.cancion_src;
    //Pausamos la musica de menu
    global.musica_menu.pause();
    //Iniciamos el audio de cuenta regresiva
    cuenta_regresiva.play();


    //Luego de 5 segundos (osea lo que dura la cuenta regresiva ejecutar el resto de código)
    setTimeout(() => {
        //Iniciamos la música de fondo y activamos el loop
        musica_gameplay.play();
        musica_gameplay.loop = true;
        //Iniciamos el loop del juego


    }, 5000);


}

//Metodo para finalizar el juego

export function finalizar_gameplay() {
    //Removemos las entradas de teclado
    eventos.remover_input_tecla();
    //Removemos el contador
    finalizar_contador();

}




function renderizar_pre_loop(){
    //Dibuja un fondo inicial
    let fondo_iz =generar_fondo(canvas_izquierda);
    let fondo_de=generar_fondo(canvas_derecha);
    fondo_iz.dibujar(fondo_iz.x, fondo_iz.y);
    fondo_de.dibujar(fondo_de.x, fondo_de.y);
    //let fondo_cen=generar_fondo(canvas_centro);
    fondos_izquierda.push(fondo_iz);
    fondos_derecha.push(fondo_de);

    //Auto
    let auto=global.sprite_auto_actual
    //Calcula las dimensiones del auto

    let auto_lado = canvas_centro.width/cuadricula_horizontal;
    auto.alto = auto_lado
    auto.ancho=auto_lado
    //Calcula la posicion del auto inicialmente
    auto.x=(canvas_centro.width/2)-(auto.ancho/2)
    auto.y=-canvas.height+((canvas.height*0.07)+auto.alto)
    //Dibuja el auto
    auto.dibujar(auto.x,auto.y);


}

function actualizar(delta){

}
function renderizar(delta) {
    fondos_izquierda.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y);
    })
    fondos_derecha.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y);
    })
    fondos_centro.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y);
    })
    obstaculos.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y);
    })
    bonificadores.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y);
    })

}
function generar_fondo(Mapa,canvas){
    let numero = utils.generar_random(0,7)
    let img  = new Image().src(Mapa.fondos_movibles_src[numero]);
    return new Sprite(img,0,0,canvas.height,canvas.width,canvas);
}

function generar_obstaculo(){
    obstaculos.push()
}
function generar_bonificador(){
    bonificadores.push()
}
