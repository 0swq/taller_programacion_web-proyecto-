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

    // Método para evaluar hitbox
    intersecta(otro) {
        return !(
            this.x + this.ancho < otro.x ||
            this.x > otro.x + otro.ancho ||
            this.y + this.alto < otro.y ||
            this.y > otro.y + otro.alto
        );
    }

    dibujar(nuevo_x, nuevo_y, ancho_d, altura_d) {
        const ctx = this.ctx;
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = "high";

        const x = Math.round(nuevo_x);
        const y = Math.round(nuevo_y);
        ancho_d = Math.round(ancho_d);
        altura_d = Math.round(altura_d);


        ctx.drawImage(this.img, x, y, ancho_d, altura_d);
        // Borde
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        //ctx.strokeRect(x, y, ancho_d, altura_d);


    }
}
