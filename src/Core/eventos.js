//Este archivo contiene los eventos atribuidos a etiquetas de html
import {cambiarFondo, dar_click, mostrarSeccion} from "./utils.js";
import {mapa1, mapa2, mapa3, data_a_mapa} from "../data_prehecha/mapas.js";
import {comenzar_gameplay} from "./gameplay.js";
import * as gameplay from "./gameplay.js";
import {global, puntajes} from "./global.js";

//Evento inicializar
export function inicializar_eventos() {
    inicializar_seleccion_mapas();
    inicializar_seleccion_autos();
    iniciar_boton_continuar();
    inicializar_configuracion();
    inicializar_fx();
    inicializar_navegacion();
    inicializar_fin_gameplay();
    inicializar_leaderboard();
}

//Evento para cuando se de click al boton continuar en la intro de el juego
export let intervalfondo = null

function iniciar_boton_continuar() {
    let boton_continuar = document.getElementById("continuarBtn");

    boton_continuar.addEventListener("click", function () {
        if (intervalfondo !== null) {
            clearInterval(intervalfondo);
        }
        dar_click()
        intervalfondo = setInterval(cambiarFondo, 7000);
        mostrarSeccion("inicio");
        console.log("cambiado");
    });
}


//Eventos para las 3 opciones en la sección de mapas
let mapa1_et = document.getElementById("mapa1_btn");
let mapa2_et = document.getElementById("mapa2_btn");
let mapa3_et = document.getElementById("mapa3_btn");

function inicializar_seleccion_mapas() {
    mapa1_et.addEventListener("click", function () {
        mostrarSeccion("gameplay");
        comenzar_gameplay(data_a_mapa(mapa1));
        dar_click()
    });
    mapa2_et.addEventListener("click", function () {
        mostrarSeccion("gameplay");
        comenzar_gameplay(data_a_mapa(mapa2));
        dar_click()
    });
    mapa3_et.addEventListener("click", function () {
        mostrarSeccion("gameplay");
        comenzar_gameplay(data_a_mapa(mapa3));
        dar_click()
    });
}

//Evento y funciones comunes para elementos

//Botones menu


//Este evento hace que al presionar suene el sonido de click


function inicializar_fx() {
    let botones = [
        document.getElementById("mapas_btn"),
        document.getElementById("autos_btn"),
        document.getElementById("instrucciones_btn"),
        document.getElementById("configuraciones_btn"),
        document.getElementById("volver_gameplay_btn"),
        document.getElementById("control-flechas"),
        document.getElementById("control-wasd"),
    ];
    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            dar_click();
        });
    });
    let elementos = document.querySelectorAll(".volver");

    elementos.forEach(elemento => {
        elemento.addEventListener("click", () => {
            dar_click();
        });
    });
}

function inicializar_navegacion() {
    let mapas_btn = document.getElementById("mapas_btn");
    mapas_btn.addEventListener("click", function () {
        mostrarSeccion("mapas")
    })
    let instrucciones_btn = document.getElementById("instrucciones_btn");
    instrucciones_btn.addEventListener("click", function () {
        mostrarSeccion("instrucciones")
    })
    let configuraciones_btn = document.getElementById("configuraciones_btn");
    configuraciones_btn.addEventListener("click", function () {
        mostrarSeccion("configuraciones")
    })

    let autos_btn = document.getElementById("autos_btn");
    autos_btn.addEventListener("click", function () {
        mostrarSeccion("autos")
    })

    let laderboard_btn = document.getElementById("leaderboard_btn");
    laderboard_btn.addEventListener("click", function () {
        mostrarSeccion("leaderboard")
    })

    let elementos = document.querySelectorAll(".volver");
    elementos.forEach(elemento => {
        elemento.addEventListener("click", () => {
            mostrarSeccion("inicio");
        });
    });
}

//Este metodo agrega el evento de deteccion de teclas para cuando comience el gameplay
export function agregar_input_tecla() {
    if (global.teclas_actuales === 2) {
        global.teclas = {
            arrowright: "derecha",
            arrowleft: "izquierda",
            arrowup: "arriba",
        };
    } else if (global.teclas_actuales === 1) {
        global.teclas = {
            d: "derecha",
            a: "izquierda",
            w: "arriba",
        };
    }

    global.keydown = (e) => {
        let key = e.key.toLowerCase();
        if (key === "shift") gameplay.input.shift_activado = true;
        switch (global.teclas[key]) {
            case "derecha":
                gameplay.input.moverDerecha = true;
                break;
            case "izquierda":
                gameplay.input.moverIzquierda = true;
                break;
            case "arriba":
                gameplay.input.moverArriba = true;
                break;
        }
    };

    global.keyup = (e) => {
        let key = e.key.toLowerCase();
        if (key === "shift") gameplay.input.shift_activado = false;
        switch (global.teclas[key]) {
            case "derecha":
                gameplay.input.moverDerecha = false;
                break;
            case "izquierda":
                gameplay.input.moverIzquierda = false;
                break;
            case "arriba":
                gameplay.input.moverArriba = false;
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
function inicializar_seleccion_autos() {
    auto1.addEventListener("click", function () {
        let auto = new Image();
        auto.src = "/Recursos/Sprites/Auto-1.png"
        global.sprite_auto_actual.img = auto
        auto_actual_menu.src = "/Recursos/Assets/Car1.gif"
        dar_click()
    });

    auto2.addEventListener("click", function () {
        let auto = new Image();
        auto.src = "/Recursos/Sprites/Auto-2.png"
        global.sprite_auto_actual.img = auto
        auto_actual_menu.src = "/Recursos/Assets/Car2.gif"
        dar_click()
    });


    auto3.addEventListener("click", function () {
        let auto = new Image();
        auto.src = "/Recursos/Sprites/Auto-3.png"
        global.sprite_auto_actual.img = auto
        auto_actual_menu.src = "/Recursos/Assets/Car3.gif"
        dar_click()
    });
}

function actualizarLeaderboard(ordenarPor = 'puntaje') {
    console.log("Leaderboard actual:", puntajes);
    const tbody = document.getElementById('cuerpo-tabla-puntajes');

    const boton_puntaje = document.getElementById("puntaje_btn");
    const boton_tiempo = document.getElementById("tiempo_btn");

    if (ordenarPor === 'puntaje') {
        boton_puntaje.classList.add('activo');
        boton_tiempo.classList.remove('activo');
    } else {
        boton_tiempo.classList.add('activo');
        boton_puntaje.classList.remove('activo');
    }

    tbody.innerHTML = '';

    if (puntajes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding:40px;">No hay registros aún</td></tr>';
        return;
    }

    let puntajesOrdenados = [...puntajes];

    if (ordenarPor === 'puntaje') {
        puntajesOrdenados.sort((a, b) => b.puntaje - a.puntaje);
    } else if (ordenarPor === 'tiempo') {
        puntajesOrdenados.sort((a, b) => {
            const convertirTiempoASegundos = (tiempo) => {
                const [min, seg] = tiempo.split(':').map(Number);
                return min * 60 + seg;
            };
            return convertirTiempoASegundos(b.tiempo) - convertirTiempoASegundos(a.tiempo);
        });
    }

    puntajesOrdenados.slice(0, 10).forEach((registro, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="columna-posicion">${index + 1}</td>
            <td class="columna-puntaje">${registro.puntaje.toString().padStart(6, '0')}</td>
            <td class="columna-tiempo">${registro.tiempo}</td>
        `;
        tbody.appendChild(fila);
    });
}

function inicializar_leaderboard() {
    let leaderboard_btn = document.getElementById("leaderboard_btn");
    leaderboard_btn.addEventListener("click", function() {
        actualizarLeaderboard('puntaje');
    });

    const boton_puntaje = document.getElementById("puntaje_btn");
    const boton_tiempo = document.getElementById("tiempo_btn");

    boton_tiempo.addEventListener("click", function () {
        dar_click();
        boton_puntaje.classList.remove('activo');
        boton_tiempo.classList.add('activo');
        actualizarLeaderboard("tiempo");
    });

    boton_puntaje.addEventListener("click", function () {
        dar_click();
        boton_tiempo.classList.remove('activo');
        boton_puntaje.classList.add('activo');
        actualizarLeaderboard("puntaje");
    });
}
//Inicializar configuracion
function inicializar_configuracion() {
    const audio_menu = document.getElementById('musica_menu');
    const volumenDelSlider = document.getElementById('musica-volumen');
    const audio_juego = document.getElementById('musica_gameplay');

    audio_menu.volume = parseFloat(volumenDelSlider.value);
    audio_juego.volume = parseFloat(volumenDelSlider.value);

    volumenDelSlider.addEventListener('input', () => {
        audio_menu.volume = parseFloat(volumenDelSlider.value);
        audio_juego.volume = parseFloat(volumenDelSlider.value);
    });

    //Manejar los efectos
    const slider_sonidos = document.getElementById('sonido-volume');
    const efectos = [
        document.getElementById('click'),
        document.getElementById('crash'),
        document.getElementById('cuenta_regresiva'),
        document.getElementById('coin')
    ];
    efectos.forEach(efecto => {
        efecto.volume = parseFloat(slider_sonidos.value);
    });

    slider_sonidos.addEventListener('input', () => {
        const nuevoVolumen = parseFloat(slider_sonidos.value);
        efectos.forEach(efecto => {
            efecto.volume = nuevoVolumen;
        });
    });

    //Seleccion de teclado
    const controlFlechas = document.getElementById('control-flechas');
    const controlWASD = document.getElementById('control-wasd');

    function seleccionar_flechas() {
        global.teclas_actuales = 2
        controlFlechas.classList.add('seleccionado');
        controlWASD.classList.remove('seleccionado');
        console.log('Metodo de juego: Flechas');
    }

    function seleccionar_letras() {
        global.teclas_actuales = 1
        controlWASD.classList.add('seleccionado');
        controlFlechas.classList.remove('seleccionado');
        console.log('Metodo de juego: WASD');
    }

    controlFlechas.addEventListener('click', seleccionar_flechas);
    controlWASD.addEventListener('click', seleccionar_letras);
    seleccionar_letras()
}


function inicializar_fin_gameplay() {
    let volver_gameplay = document.getElementById('volver_gameplay_btn');
    volver_gameplay.addEventListener('click', function () {
        //Regresar audio
        global.musica_menu.play()
        //Finalizar juego
        gameplay.finalizar_gameplay();
        dar_click()
    })
}

export function reescalar_canvas() {
    let canvas_izquierda = document.getElementById("canvasIzquierda");
    let canvas_derecha = document.getElementById("canvasDerecha");
    let canvas_centro = document.getElementById("canvasCamino");

    const leftColumn = canvas_izquierda.parentElement;
    const roadColumn = canvas_centro.parentElement;
    const rightColumn = canvas_derecha.parentElement;

    // Reescalar
    canvas_izquierda.width = leftColumn.clientWidth;
    canvas_izquierda.height = leftColumn.clientHeight;
    canvas_centro.width = roadColumn.clientWidth;
    canvas_centro.height = roadColumn.clientHeight;
    canvas_derecha.width = rightColumn.clientWidth;
    canvas_derecha.height = rightColumn.clientHeight;

    if (gameplay.juegoActivo && global.sprite_auto_actual) {
        let auto = global.sprite_auto_actual;
        let cuadricula_horizontal = 6;
        let auto_lado = canvas_centro.width / cuadricula_horizontal;

        let posX_porcentaje = auto.x / auto.canvas.width;
        let posY_porcentaje = auto.y / auto.canvas.height;

        auto.alto = auto_lado;
        auto.ancho = auto_lado * 0.5552;
        auto.canvas = canvas_centro;
        auto.ctx = canvas_centro.getContext('2d');

        auto.x = posX_porcentaje * canvas_centro.width;
        auto.y = posY_porcentaje * canvas_centro.height;

        auto.x = Math.min(Math.max(auto.x, 0), canvas_centro.width - auto.ancho);
        auto.y = Math.min(Math.max(auto.y, 0), canvas_centro.height - auto.alto);
    }
}

export function inicializar_reescalado() {
    // Reescalar al cargar
    reescalar_canvas();

    // Reescalar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', reescalar_canvas);
}