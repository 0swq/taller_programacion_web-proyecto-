//Este archivo contendra metodos utilitarios o que se usaran constantemente
import { datos } from '../data_prehecha/datos.js';


export function inicializar_utils() {
    inicializar_OP();
}

let click = document.getElementById("click");
export function dar_click() {
    click.pause();
    click.currentTime = 0;
    click.play();
}

function inicializar_OP() {
    const boton_continuar = document.getElementById("continuarBtn"); // ahora sí existe
    if (!boton_continuar) return;

    boton_continuar.hidden = true;
    boton_continuar.disabled = true;

    setTimeout(() => {
        boton_continuar.hidden = false;
        boton_continuar.disabled = false;
    }, 7000);
}



//Contador para poder iterar los fondos
let contador = 0;
let fondos = datos.fondos;

//Este metodo cambia una vez el fondo para todas las secciones
export function cambiarFondo() {
    let secciones = document.querySelectorAll("section");
    secciones.forEach(seccion => {
        seccion.style.backgroundImage = `url(${fondos[contador]})`;
    });
    //Aumenta el contador para iterar sobre el arreglo fondos
    contador++;
    //Si el arreglo llega al final se reinicia
    if (contador >= fondos.length) contador = 0;
}

//Genera un numero aleatorio
export function generar_Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Genera un numero aleatorio con decimal
export function generar_Random_decimal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Mostrar seccion con código
const secciones = document.querySelectorAll("section");

// Método para mostrar solo una sección
export function mostrarSeccion(idSeccion) {
    secciones.forEach(sec => {
        if (sec.id === idSeccion) {
            sec.style.display = "flex";
            sec.style.zIndex = "1"; // visible
        } else {
            sec.style.display = "none";
            sec.style.zIndex = "-1"; // oculto
        }
    });
}
