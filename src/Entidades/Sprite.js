export class Sprite {
    constructor(img, x, y, alto, ancho, canvas) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.alto = alto;
        this.ancho = ancho;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    //Metodo para evaluar hitbox
    intersects(other) {
        return !(
            this.x > other.x + other.width ||
            this.y + this.height < other.y ||
            this.y > other.y + other.height
        );
    }

    dibujar(nuevo_x,nuevo_y){
        ctx.drawImage(this.img, x, y);
    }

}