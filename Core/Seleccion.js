let auto_actual_gameplay = document.getElementById("auto_actual_gameplay");
let auto_actual_menu = document.getElementById("auto_actual_menu")
let musica_gameplay = document.getElementById("musica_gameplay");
let habilitado_para_comenzar=false

//Selecciona de autos
let auto1 = document.getElementById("seleccionar_auto_1")
let auto2 = document.getElementById("seleccionar_auto_2")
let auto3 = document.getElementById("seleccionar_auto_3")

auto1.addEventListener("click", function() {
    auto_actual_gameplay.src = "/Recursos/Sprites/Auto-1.png"
    auto_actual_menu.src = "/Recursos/Assets/Car1.gif"
    window.dar_click()
});

auto2.addEventListener("click", function() {
    auto_actual_gameplay.src = "/Recursos/Sprites/Auto-2.png"
    auto_actual_menu.src = "/Recursos/Assets/Car2.gif"
    window.dar_click()
});


auto3.addEventListener("click", function() {
    auto_actual_gameplay.src = "/Recursos/Sprites/Auto-3.png"
    auto_actual_menu.src = "/Recursos/Assets/Car3.gif"
    window.dar_click()
});


//Botones menu

let botones = [
    document.getElementById("mapas_btn"),
    document.getElementById("autos_btn"),
    document.getElementById("instrucciones_btn"),
    document.getElementById("configuraciones_btn")
];

botones.forEach(boton => {
    boton.addEventListener("click", function() {
        window.dar_click(); 
    });
});


//Mapas

let cuenta_regresiva = document.getElementById("cuenta_regresiva");

// DECLARACIONES GLOBALES
let intervaloContador = null; 
let timeoutContador = null; 

let gameplay = document.getElementById("gameplay")
function comenzar_gameplay(mapa) {
    if (intervalfondo !== null) {
    clearInterval(intervalfondo);
    intervalfondo = null;
    }

    document.getElementById("temporizador").textContent ="00:00";
    musica_gameplay.volume=1;
    cuenta_regresiva.volume=1;
    let fondo_backgraound;

    switch (mapa) {
        case 1:
            fondo_backgraound = "/Recursos/Assets/Fondo1.png";
            musica_gameplay.src = "/Recursos/Songs/Music/M_1.mp3";
            break;
        case 2:
            fondo_backgraound = "/Recursos/Assets/Fondo2.jpg";
            musica_gameplay.src = "/Recursos/Songs/Music/M_2.mp3";
            break;
        case 3:
            fondo_backgraound = "/Recursos/Assets/Fondo3.png";
            musica_gameplay.src = "/Recursos/Songs/Music/M_3.mp3";
            break;

    }
    
    let minutos;
    let segundos;
    let seg_f,min_f;
    function iniciarContador() {
        
        minutos = 0;
        segundos = 0;
        seg_f=0,min_f=0;
        intervaloContador = setInterval(() => {
            segundos++;
            if (segundos==60){
                segundos=0;
                minutos+=1;
            }
            if (segundos<10){
                seg_f="0"+segundos
            }else{
                seg_f=segundos
            }
            if (minutos<10){
                min_f="0"+minutos
            }else{
                min_f=minutos
            }
            document.getElementById("temporizador").textContent = min_f+":"+seg_f;
            
        }, 1000); 
        
    }
    
    gameplay.style.backgroundImage = "url(" + fondo_backgraound + ")";

    GLOBAL.musica_menu.pause();
    cuenta_regresiva.play();

    timeoutContador = setTimeout(() => {
        musica_gameplay.play();
        musica_gameplay.loop = true; 
        iniciarContador();
        habilitado_para_comenzar=true;
    }, 5000);
    

}
let mapa1=document.getElementById("mapa1_btn");
let mapa2=document.getElementById("mapa2_btn");
let mapa3=document.getElementById("mapa3_btn");

mapa1.addEventListener("click", function() {
    comenzar_gameplay(1);
    GLOBAL.mapa_actual=1;
});
mapa2.addEventListener("click", function() {
    comenzar_gameplay(2);
    GLOBAL.mapa_actual=2;
});
mapa3.addEventListener("click", function() {
    comenzar_gameplay(3);
    GLOBAL.mapa_actual=3;
});

function detenerContador() {
    if (intervaloContador !== null) {
        clearInterval(intervaloContador);
        intervaloContador = null;
    }
}


volver_gameplay_btn.addEventListener("click", function() {
    window.dar_click();
    
    detenerContador();

    clearTimeout(timeoutContador);

    musica_gameplay.pause();
    musica_gameplay.currentTime = 0;

    cuenta_regresiva.pause();
    cuenta_regresiva.currentTime = 0;

    if (intervalfondo !== null) {
        clearInterval(intervalfondo);
        intervalfondo = null;
    }

    intervalfondo = setInterval(cambiarFondo, 7000);
    GLOBAL.musica_menu.play();
});


//Configuracion
let teclas_actuales=1