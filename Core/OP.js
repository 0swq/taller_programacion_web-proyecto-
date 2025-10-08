const boton = document.getElementById("continuarBtn")
boton.hidden=true;
boton.disable=true;
setTimeout(() => {
  boton.hidden = false; 
  boton.disabled = false; 
}, 7000);

let fondos = [
    "/Recursos/Assets/Fondo1.png",
    "/Recursos/Assets/Fondo2.jpg",
    "/Recursos/Assets/Fondo3.png"
];

let contador = 0; 

function cambiarFondo(){
    let secciones = document.querySelectorAll("section");

    secciones.forEach(seccion => {
        seccion.style.backgroundImage = `url(${fondos[contador]})`;
    });

    contador++;
    if (contador >= fondos.length) contador = 0; 
}

let boton_continuar = document.getElementById("continuarBtn");

boton_continuar.addEventListener("click", function(){
    if (intervalfondo !== null) {
        clearInterval(intervalfondo);
    }
    window.dar_click()
    intervalfondo = setInterval(cambiarFondo, 7000);
});
