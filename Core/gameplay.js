document.addEventListener("DOMContentLoaded", () => {
  let auto_actual_gameplay = document.getElementById("auto_horizontal");
  let camino = document.getElementById("canvasCamino");
  const columnaIzquierda = document.getElementById("canvasIzquierda");
  const columnaDerecha = document.getElementById("canvasDerecha");
  const ctx_camino = camino.getContext("2d");
  const ctx_izquierda = columnaIzquierda.getContext("2d");
  const ctx_derecha = columnaDerecha.getContext("2d");

  let random1 = genera_Random(0, 7);
  let random2 = genera_Random(0, 7);
  let velocidad_general = 0;
  let velocidad_lateral_shift = 2;
  let velocidad_lateral = 1;
  let velocidad_avanzar = 1;
  let velocidad_retroceso = 0.01;
  let moverDerecha = false;
  let moverIzquierda = false;
  let moverAbajo = false;
  let moverArriba = false;
  let shift_activado = false;
  let tiempotranscurrido = 0;
  let velocidad_inicial = 5;
  let teclas_actuales = 1;

  let fondos = [];
  let fondos_izquierda = [];
  let fondos_derecha = [];
  let fondo_lineas = [];
  let obstaculos = [];
  let bonificadores = [];


  class Fondo_movible {
    constructor(img, y, canvas, ctx, tipo) {
      this.img = img;
      this.y = y;
      this.canvas = canvas;
      this.ctx = ctx;
      this.tipo = tipo;
    }
  }
  class Objeto_movible {
    constructor(img, y, canvas, ctx, tipo) {
      this.img = img;
      this.y = y;
      this.canvas = canvas;
      this.ctx = ctx;
      this.tipo = tipo;
    }
  }
  function genera_Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ===== Precarga =====
  function precargarFondosImagenes(callback) {
    const total = 8;
    let cargadas = 0;

    for (let i = 1; i <= total; i++) {
      const imagen = new Image();
      imagen.src = `/Recursos/Sprites/Mapa${GLOBAL.mapa_actual}_fondos/${i}.png`;
      imagen.onload = () => {
        fondos.push(imagen);
        cargadas++;
        if (cargadas === total) callback();
      };
    }
  }


  precargarFondosImagenes(() => {
    //Cargar fondos iniciales


    iniciarJuego();
  });

  let mapaTeclas;
  if (teclas_actuales == 1) {
    mapaTeclas = {
      arrowright: "derecha",
      arrowleft: "izquierda",
      arrowdown: "abajo",
      arrowup: "arriba",
    };
  } else if (teclas_actuales == 0) {
    mapaTeclas = {
      d: "derecha",
      a: "izquierda",
      s: "abajo",
      w: "arriba",
    };
  }

  document.addEventListener("keydown", (e) => {
    let key = e.key.toLowerCase();
    if (key === "shift") shift_activado = true;
    switch (mapaTeclas[key]) {
      case "derecha": moverDerecha = true; break;
      case "izquierda": moverIzquierda = true; break;
      case "abajo": moverAbajo = true; break;
      case "arriba": moverArriba = true; break;
    }
  });

  document.addEventListener("keyup", (e) => {
    let key = e.key.toLowerCase();
    if (key === "shift") shift_activado = false;
    switch (mapaTeclas[key]) {
      case "derecha": moverDerecha = false; break;
      case "izquierda": moverIzquierda = false; break;
      case "abajo": moverAbajo = false; break;
      case "arriba": moverArriba = false; break;
    }
  });


  function iniciarJuego() {
    let ultimoTiempo = performance.now();

    function gameLoop(tiempoActual) {
      let delta = (tiempoActual - ultimoTiempo) / 1000;
      ultimoTiempo = tiempoActual;
      tiempotranscurrido += delta;

      actualizar(delta);
      renderizar(delta);

      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }


  function actualizar(delta) {
    let left = parseInt(window.getComputedStyle(auto_actual_gameplay).left) || 0;
    let top = parseInt(window.getComputedStyle(auto_actual_gameplay).top) || 0;

    velocidad_lateral = shift_activado ? velocidad_lateral_shift : 1;

    if (moverDerecha) left += velocidad_lateral;
    if (moverIzquierda) left -= velocidad_lateral;
    if (moverArriba) top -= velocidad_avanzar;
    else top += velocidad_retroceso;

    auto_actual_gameplay.style.left = left + "px";
    auto_actual_gameplay.style.top = top + "px";

    velocidad_general = velocidad_inicial * Math.pow(1.01, tiempotranscurrido);
  }


  function renderizar(delta) {
    ctx_izquierda.clearRect(0, 0, columnaIzquierda.width, columnaIzquierda.height);
    ctx_derecha.clearRect(0, 0, columnaDerecha.width, columnaDerecha.height);
    ctx_camino.clearRect(0, 0, camino.width, camino.height);


    fondos_izquierda.forEach(elemento => {
      elemento.ctx.drawImage(elemento.x, elemento.y, elemento.canvas.width, elemento.canvas.height)
      elemento.y -= velocidad_general
      if (elemento.y == -elemento.canvas.height){
        fondos_izquierda.shift()
        fondos_izquierda.push(new Fondo_movible(0,elemento.canvas.height*2))
      }
    });
    fondos_derecha.forEach(elemento => {
      elemento.ctx.drawImage(elemento.x, elemento.y, elemento.canvas.width, elemento.canvas.height)
      elemento.y -= velocidad_general
    });
    fondo_lineas.forEach(elemento => {
      elemento.ctx.drawImage(elemento.x, elemento.y, elemento.canvas.width, elemento.canvas.height)
      elemento.y -= velocidad_general

    });
    obstaculos.forEach(elemento => {
      elemento.y += velocidad_general

    });
    bonificadores.forEach(elemento => {
      elemento.y += velocidad_general
    });
  }
});
