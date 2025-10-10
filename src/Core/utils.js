//Este archivo contendra metodos utilitarios o que se usaran constantemente
import {data} from '../datos.json';
import {finalizar_gameplay} from "./gameplay";



let click= document.getElementById("click");
export function dar_click(){
    global.click.pause();
    global.click.currentTime = 0;
    global.click.play();
}

export let boton_continuar = document.getElementById("continuarBtn")
//Comienza desactivado
boton_continuar.hidden=true;
boton_continuar.disable=true;
//Luego de 7 segundos se activa
setTimeout(() => {
    boton_continuar.hidden = false;
    boton_continuar.disabled = false;
}, 7000);



//Contador para poder iterar los fondos
let contador = 0;
let fondos = data.fondos;

//Este metodo cambia una vez el fondo una vez para todas las secciones
export function cambiarFondo(){
    let secciones = document.querySelectorAll("section");
    data.forEach(seccion => {
        seccion.style.backgroundImage = `url(${fondos[contador]})`;
    });
    //Aumenta el contador para iterar sobre el arreglo fondos
    contador++;
    //Si el arreglo llega al final se reinicia
    if (contador >= fondos.length) contador = 0;
}

//Genera un numero aleatorio
function generar_Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


