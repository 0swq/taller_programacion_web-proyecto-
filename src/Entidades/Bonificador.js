import {Sprite} from "./Sprite.js";

export class Bonificar extends Sprite {
    constructor(img, x, y, alto, ancho, canvas) {
        super(img, x, y, alto, ancho, canvas);
        this.puntos = 50000;
        this.bonificacion_velocidad = 0.1;
        this.generadoPunto1 = false;
    }
    toString() {
        return `Sprite [x=${this.x}, y=${this.y}, ancho=${this.ancho}, alto=${this.alto}]`;
    }
}
