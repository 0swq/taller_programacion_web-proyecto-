import {Mapa} from "../Entidades/Mapa.js";

export const mapa1 = {
    fondo_principal_src: "/Recursos/Assets/Fondos/Fondo1.png",
    fondos_movibles_src: [
        "/Recursos/Sprites/Mapa1_fondos/1.png",
        "/Recursos/Sprites/Mapa1_fondos/2.png",
        "/Recursos/Sprites/Mapa1_fondos/3.png",
        "/Recursos/Sprites/Mapa1_fondos/4.png",
        "/Recursos/Sprites/Mapa1_fondos/5.png",
        "/Recursos/Sprites/Mapa1_fondos/6.png",
        "/Recursos/Sprites/Mapa1_fondos/7.png",
        "/Recursos/Sprites/Mapa1_fondos/8.png",],
    cancion_src: "/Recursos/Songs/Music/M_1.mp3",
    obstaculo_src: "/Recursos/Sprites/obstaculo1.png",
};

export const mapa2 = {
    fondo_principal_src: "/Recursos/Assets/Fondo2.jpg",
    fondos_movibles_src: [
        "/Recursos/Sprites/Mapa2_fondos/1.png",
        "/Recursos/Sprites/Mapa2_fondos/2.png",
        "/Recursos/Sprites/Mapa2_fondos/3.png"
    ],
    cancion_src: "/Recursos/Songs/Music/M_2.mp3",
    obstaculo_src: "/Recursos/Sprites/obstaculo2.png",
};

export const mapa3 = {
    fondo_principal_src: "/Recursos/Assets/Fondo3.png",
    fondos_movibles_src: [
        "/Recursos/Sprites/Mapa3_fondos/1.png",
        "/Recursos/Sprites/Mapa3_fondos/2.png"

    ],
    cancion_src: "/Recursos/Songs/Music/M_3.mp3",
    obstaculo_src: "/Recursos/Sprites/obstaculo3.png",
};


export function data_a_mapa(data) {
    const {fondo_principal_src, fondos_movibles_src, cancion_src, obstaculo_src} = data;
    return new Mapa(fondo_principal_src, fondos_movibles_src, cancion_src, obstaculo_src);
}