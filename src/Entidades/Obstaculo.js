import {Sprite} from "./Sprite.js";

export class Obstaculo extends Sprite {
    constructor(img, x, y, alto, ancho, canvas) {
        super(img, x, y, alto, ancho, canvas); // Llama al constructor de Sprite
        this.puntos = 10000;
        this.generadoPunto1 = false;
    }

}
