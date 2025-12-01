document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Cargar todos los módulos
        const eventos = await import("./Core/eventos.js");
        const global = await import("./Core/global.js");
        const gameplay = await import("./Core/gameplay.js");
        const utils = await import("./Core/utils.js");
        const datos = await import("./data_prehecha/datos.js");
        const mapas = await import("./data_prehecha/mapas.js");
        const Mapa = await import("./Entidades/Mapa.js");
        const Sprite = await import("./Entidades/Sprite.js");
        const Bonificador = await import("./Entidades/Bonificador.js");
        const Obstaculo = await import("./Entidades/Obstaculo.js");
        console.log("Todos los módulos cargados");


        eventos.inicializar_eventos()

        global.inicializarGlobal();

        utils.inicializar_utils()

        //Iniciar
        utils.mostrarSeccion("apertura");
        utils.mostrarSeccion("apertura");
    } catch (error) {
        console.error("Error ",error);
    }
});