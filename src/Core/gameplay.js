import * as eventos from "./eventos.js"
import {global, puntajes} from "./global.js";
import * as utils from "./utils.js";
import {Sprite} from "../Entidades/Sprite.js";
import {Bonificar} from "../Entidades/Bonificador.js";
import {Obstaculo} from "../Entidades/Obstaculo.js";
import {mostrarSeccion} from "./utils.js";



//Estados de las teclas
export const input = {
    moverDerecha: false,
    moverIzquierda: false,
    moverArriba: false,
    shift_activado: false
};

let velocidad_general = 0;
let velocidad_lateral_shift = 4;
let velocidad_lateral = 40;
let velocidad_avanzar = 70;
let velocidad_retroceso = velocidad_general;
let cuadricula_horizontal = 6
let velocidad_base = 1
let velocidad_maxima = 300
let velocidad_inicial = velocidad_maxima*0.5;

let reduccion_acumulado = 0
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
let canvas_izquierda = document.getElementById("canvasIzquierda")
let canvas_derecha = document.getElementById("canvasDerecha")
let canvas_centro = document.getElementById("canvasCamino")
//Animacion
let animacion = null;
let mapa = null;
//Barra
let porcentaje = (velocidad_general / velocidad_maxima) * 100;
//Cuenta
let regresiva = null;
//Probabilidad de bonificador
let prob_bonificador = 0.07

export let juegoActivo = true

function gameLoop() {
    //Control
    if (!juegoActivo) return;
    //Definimos el tiempo delta
    let delta = (performance.now() - tiempo_previo) / 1000;

    tiempo_previo = performance.now();
    //Actualizamos el tiempo transcurrido
    tiempo_transcurrido += delta
    //Actualizamos la velocidad que crece con uan función exponencial para aumentar la velocidad
    velocidad_general = velocidad_inicial * Math.pow(1.01, tiempo_transcurrido);
    velocidad_general -= reduccion_acumulado;
    velocidad_general = Math.min(velocidad_general, velocidad_maxima);
    //Esta sección son para todos los métodos que se ejecutan en el loop
    procesar_entrada(delta) //Acciones de teclado
    actualizar(delta) //Lógica
    renderizar(delta) //Dibujar en los canvas
    animacion = requestAnimationFrame(gameLoop);
    console.log(obstaculos.length + bonificadores.length);
}


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

export function comenzar_gameplay(mapa_) {
    clearInterval(eventos.intervalfondo)
    eventos.reescalar_canvas()
    velocidad_general = 0;
    tiempo_transcurrido = 0;
    reduccion_acumulado = 0;
    //Asignamos
    mapa = mapa_;
    //Limpiamos canvas
    canvas_derecha.getContext("2d").clearRect(0, 0, canvas_derecha.width, canvas_derecha.height);
    canvas_izquierda.getContext("2d").clearRect(0, 0, canvas_izquierda.width, canvas_izquierda.height);
    canvas_centro.getContext("2d").clearRect(0, 0, canvas_centro.width, canvas_centro.height);
    //Reiniciamos
    let puntaje = document.getElementById("puntaje");
    puntaje.textContent = "000000"
    //Renderizamos los fondos antes del resto de cosas
    renderizar_pre_loop(mapa)
    //Iniciamos la barra
    //Cambiamos el fondo y música
    gameplay.style.backgroundImage = "url(" + mapa.fondo_principal_src + ")";
    musica_gameplay.src = mapa.cancion_src;
    //Pausamos la musica de menu
    global.musica_menu.pause();
    //Iniciamos el audio de cuenta regresiva
    cuenta_regresiva.currentTime = 0;
    cuenta_regresiva.play();
    //Reiniciar
    document.getElementById("temporizador").textContent = "00:00";
    let barra_progreso = document.querySelector(".progress-bar-fill");
    let numero_progreso = document.getElementById("dificultad");
    numero_progreso.textContent = "0";
    barra_progreso.style.width = "0px";


    //Luego de 5 segundos (oséa lo que dura la cuenta regresiva ejecutar el resto de código)
    regresiva = setTimeout(() => {
        tiempo_previo = performance.now();
        //Iniciamos la música de fondo y activamos el loop
        musica_gameplay.currentTime = 0;
        musica_gameplay.play();
        musica_gameplay.loop = true;
        //Llamamos al método que activa las entradas de teclado
        eventos.agregar_input_tecla()
        //Agregamos el contador
        iniciar_contador()
        //Iniciamos el loop del juego
        juegoActivo = true;
        gameLoop();
        eventos.inicializar_reescalado()
    }, 5000);


}

//Metodo para finalizar el juego
export function finalizar_gameplay() {
    window.removeEventListener('resize', eventos.reescalar_canvas);
    //Removemos las entradas de teclado
    eventos.remover_input_tecla();
    //Removemos el contador
    finalizar_contador();
    //Removemos la animacion por frame
    cancelAnimationFrame(animacion)
    //Pausar
    musica_gameplay.pause()
    //Set
    clearTimeout(regresiva);
    cuenta_regresiva.pause()
    //Reiniciamos variables
    fondos_izquierda = [];
    fondos_derecha = [];
    fondos_centro = [];
    obstaculos = [];
    bonificadores = [];
    //Resetear movimiento
    input.moverArriba = false;
    input.moverDerecha = false;
    input.moverIzquierda = false;
    input.shift_activado = false;
    //Apagar
    juegoActivo = false;


}


function renderizar_pre_loop(mapa) {
    // Fondo izquierda
    let fondo_iz1 = generar_fondo(mapa, canvas_izquierda);
    fondo_iz1.y = 0;
    let fondo_iz2 = generar_fondo(mapa, canvas_izquierda);
    fondo_iz2.y = -canvas_izquierda.height;
    fondos_izquierda.push(fondo_iz1, fondo_iz2);

    // Fondo derecha
    let fondo_de1 = generar_fondo(mapa, canvas_derecha);
    fondo_de1.y = 0;
    let fondo_de2 = generar_fondo(mapa, canvas_derecha);
    fondo_de2.y = -canvas_derecha.height;
    fondos_derecha.push(fondo_de1, fondo_de2);
    //Elemento inicial
    generar_obstaculo(mapa, canvas_centro)
    // Dibujar inmediatamente
    fondos_izquierda.forEach(fondo => {
        if (fondo.img.complete) {
            // La imagen ya está lista
            fondo.dibujar(fondo.x, fondo.y,fondo.canvas.width, fondo.canvas.height);
        } else {
            // Espera a que cargue
            fondo.img.onload = () => {
                fondo.dibujar(fondo.x, fondo.y,fondo.canvas.width, fondo.canvas.height);
            };
        }
    });


    fondos_derecha.forEach(fondo => {
        if (fondo.img.complete) {
            fondo.dibujar(fondo.x, fondo.y,fondo.canvas.width, fondo.canvas.height);
        } else {
            fondo.img.onload = () => {
                fondo.dibujar(fondo.x, fondo.y,fondo.canvas.width, fondo.canvas.height);
            };
        }
    });
    obstaculos.forEach(obstaculo => {
        if (obstaculo.img.complete) {
            obstaculo.dibujar(obstaculo.x, obstaculo.y,canvas_centro.width/cuadricula_horizontal, canvas_centro.width/cuadricula_horizontal);
        } else {
            obstaculo.img.onload = () => {
                obstaculo.dibujar(obstaculo.x, obstaculo.y,canvas_centro.width/cuadricula_horizontal, canvas_centro.width/cuadricula_horizontal);
            };
        }
    })


    // Auto
    let auto = global.sprite_auto_actual;
    auto.ctx.clearRect(0, 0, auto.canvas.width, auto.canvas.height);
    let auto_lado = canvas_centro.width / cuadricula_horizontal;
    auto.alto = auto_lado;
    auto.ancho = auto_lado*0.5552
    auto.x = (canvas_centro.width / 2) - (auto.ancho / 2);
    let margen_sobre_base = 5;
    auto.y = canvas_centro.height - auto.alto - margen_sobre_base;
    if (auto.img.complete) {
        // La imagen ya está lista
        auto.dibujar(auto.x, auto.y,auto.ancho, auto.alto);
        console.log(auto_lado, auto.ancho, auto.alto, auto.x, auto.y);
    }


}

function actualizar(delta) {
    mover_fondos(fondos_izquierda, canvas_izquierda, delta);
    mover_fondos(fondos_derecha, canvas_derecha, delta);
    mover_fondos(fondos_centro, canvas_centro, delta);
    // Barra de velocidad
    porcentaje = (velocidad_general / velocidad_maxima) * 100;
    porcentaje = Math.round(porcentaje);
    porcentaje = `${porcentaje}%`;
    // Accedemos a la barra
    let barra_progreso = document.querySelector(".progress-bar-fill");
    let numero_progreso = document.getElementById("dificultad");
    numero_progreso.textContent = porcentaje;
    barra_progreso.style.width = porcentaje;
    mover_elemento(obstaculos, canvas_centro, delta, true)
    mover_elemento(bonificadores, canvas_centro, delta, false)

}

function renderizar(delta) {
    if (juegoActivo) {
        canvas_centro.getContext("2d").clearRect(0, 0, canvas_centro.width, canvas_centro.height);
        canvas_derecha.getContext("2d").clearRect(0, 0, canvas_derecha.width, canvas_derecha.height);
        canvas_izquierda.getContext("2d").clearRect(0, 0, canvas_izquierda.width, canvas_izquierda.height);
    }
    fondos_izquierda.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y,fondo.canvas.width, fondo.canvas.height);
    })
    fondos_derecha.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y,fondo.canvas.width, fondo.canvas.height);
    })
    fondos_centro.forEach((fondo) => {
        fondo.dibujar(fondo.x, fondo.y,fondo.canvas.width, fondo.canvas.height);
    })
    obstaculos.forEach((obstaculo) => {
        obstaculo.dibujar(obstaculo.x, obstaculo.y,canvas_centro.width/cuadricula_horizontal,canvas_centro.width/cuadricula_horizontal);
    })
    bonificadores.forEach((bon) => {
        bon.dibujar(bon.x, bon.y,canvas_centro.width/cuadricula_horizontal,canvas_centro.width/cuadricula_horizontal);
    })
    //Dibujar auto
    let auto = global.sprite_auto_actual;
    auto.dibujar(auto.x, auto.y,auto.ancho, auto.alto);
}

function procesar_entrada(delta) {
    let auto = global.sprite_auto_actual;
    const ancho = canvas_centro.width;
    const alto = canvas_centro.height;

    // Velocidad lateral actual según shift
    let velocidad_actual = velocidad_lateral;
    if (input.shift_activado) {
        velocidad_actual *= velocidad_lateral_shift;
    }

    // Movimiento lateral con límites
    if (input.moverDerecha && auto.x < ancho - auto.ancho) {
        auto.x += velocidad_actual * delta;
    }
    if (input.moverIzquierda && auto.x > 0) {
        auto.x -= velocidad_actual * delta;
    }

    // Movimiento vertical
    if (input.moverArriba && auto.y > 0) {
        auto.y -= velocidad_avanzar * delta;
    } else if (!input.moverArriba && auto.y < alto - auto.alto) {
        auto.y += velocidad_general * delta;
    }

    // Asegurar que no se salga del canvas
    auto.x = Math.min(Math.max(auto.x, 0), ancho - auto.ancho);
    auto.y = Math.min(Math.max(auto.y, 0), alto - auto.alto);


}

function generar_fondo(Mapa, canvas) {
    let numero = utils.generar_Random(0, Mapa.fondos_movibles_src.length-1);
    let img = new Image();
    img.src = Mapa.fondos_movibles_src[numero]
    return new Sprite(img, 0, 0, canvas.height, canvas.width, canvas);
}

function generar_obstaculo(Mapa, canvas) {
    let img = new Image();
    img.src = Mapa.obstaculo_src;
    let x = utils.generar_Random_decimal(0, canvas.width - (canvas.width / cuadricula_horizontal));
    let obstaculo = new Obstaculo(img, x, -canvas.width / cuadricula_horizontal, (canvas.width / cuadricula_horizontal), canvas.width / cuadricula_horizontal, canvas_centro);
    obstaculos.push(obstaculo)


}

function generar_bonificador(canvas) {
    let img = new Image();
    img.src = "/Recursos/Sprites/coin.png";
    let x = utils.generar_Random_decimal(0, canvas.width - (canvas.width / cuadricula_horizontal));
    let bonifica = new Bonificar(img, x, -canvas.width / cuadricula_horizontal, (canvas.width / cuadricula_horizontal), canvas.width / cuadricula_horizontal, canvas_centro);
    console.log("Bonificador creado")
    console.log(bonifica.toString())
    bonificadores.push(bonifica)


}

function generar_elemento() {
    let probabilidad = Math.random()
    if (probabilidad >= prob_bonificador) {
        generar_obstaculo(mapa, canvas_centro)
    } else {
        console.log("Se genero bonificador");
        generar_bonificador(canvas_centro)
    }
}

function mover_fondos(fondo_ubicacion, canvas, delta) {
    let indices_fuera = [];
    let nuevo_fondo = [];

    for (let i = 0; i < fondo_ubicacion.length; i++) {
        let fondo = fondo_ubicacion[i];
        // Mueve el fondo hacia abajo
        fondo.y += velocidad_general * delta;
        //Sale del canvas
        if (fondo.y >= canvas.height) {
            let nuevo_fondo1 = generar_fondo(mapa, canvas);
            nuevo_fondo1.y = fondo.y - fondo.canvas.height * 2; // se coloca encima del actual
            nuevo_fondo.push(nuevo_fondo1);
            indices_fuera.push(i);
        }
    }
    //Agregar los nuevos
    nuevo_fondo.forEach((fondo) => {
        fondo_ubicacion.push(fondo);
    })


    for (let i = indices_fuera.length - 1; i >= 0; i--) {
        fondo_ubicacion.splice(indices_fuera[i], 1);
    }
}

function mover_elemento(arreglo, canvas, delta, obstaculo) {
    let indices_fuera = [];
    let auto = global.sprite_auto_actual;
    for (let i = 0; i < arreglo.length; i++) {
        let elemento = arreglo[i];
        elemento.y += velocidad_general * delta;
        //Puntos de generacion
        let punto1 = canvas.height * 0.20;
        if (!elemento.generadoPunto1) {
            if (elemento.y >= punto1) {
                elemento.generadoPunto1 = true;
                generar_elemento()
            }
        }
        //Si se sale del canvas
        if (elemento.y > canvas.height) {
            if (obstaculo) {
                let puntaje = document.getElementById("puntaje");
                let puntaje_actual = parseInt(puntaje.textContent);
                puntaje.textContent = puntaje_actual + elemento.puntos;
            }
            indices_fuera.push(i);
        }

        //Obstaculo colisiona con auto
        if (elemento.intersecta(auto) && obstaculo) {
            velocidad_general = 0;
            indices_fuera.push(i);
            let tiempo = document.getElementById("temporizador");
            let audio = document.getElementById("crash");
            finalizar_gameplay();
            audio.currentTime = 0;
            audio.play();
            setTimeout(() => {
                let mensaje = `Perdiste || Tiempo alcanzado: ${tiempo.textContent} || Puntaje obtenido: ${puntaje.textContent}`;
                let nuevo = {
                    puntaje: puntaje.textContent,
                    tiempo: tiempo.textContent
                }
                puntajes.push(nuevo)
                console.log(nuevo)
                alert(mensaje);
                mostrarSeccion("mapas");

            }, 500);

        }
        //Bonificado colisiona con auto
        if (elemento.intersecta(auto) && !obstaculo) {
            let resta = velocidad_general * elemento.bonificacion_velocidad;
            reduccion_acumulado += resta;
            let audio = document.getElementById('coin')
            audio.play();
            indices_fuera.push(i);
            if ((obstaculos.length + bonificadores.length) === 1) {
                generar_elemento()
            }
        }
    }


    for (let i = indices_fuera.length - 1; i >= 0; i--) {
        arreglo.splice(indices_fuera[i], 1);
    }
}
