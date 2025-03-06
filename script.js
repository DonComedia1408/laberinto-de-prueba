document.addEventListener('DOMContentLoaded', (event) => {
    const circulo = document.getElementById('circulo');
    const contenedor = document.getElementById('contenedor');
    const lineas = document.querySelectorAll('.linea');
    const llaveAzul = document.getElementById('llave-azul');
    const candadoAzul = document.getElementById('candado-azul');
    const llaveRoja = document.getElementById('llave-roja');
    const candadoRojo = document.getElementById('candado-rojo');
    const llaveVerde = document.getElementById('llave-verde');
    const candadoVerde = document.getElementById('candado-verde');
    const llaveAmarilla = document.getElementById('llave-amarilla');
    const candadoAmarillo = document.getElementById('candado-amarillo');
    const portalAzul1 = document.getElementById('portal-azul-1');
    const portalAzul2 = document.getElementById('portal-azul-2');
    const portalRojo1 = document.getElementById('portal-rojo-1');
    const portalRojo2 = document.getElementById('portal-rojo-2');
    const portalVerde1 = document.getElementById('portal-verde-1');
    const portalVerde2 = document.getElementById('portal-verde-2');
    const portalAmarillo1 = document.getElementById('portal-amarillo-1');
    const portalAmarillo2 = document.getElementById('portal-amarillo-2');
    const portalMeta = document.getElementById('portal-meta');
    const botonAqua = document.getElementById('boton-aqua');
    const bloqueoAqua = document.getElementById('bloqueo-aqua');
    const botonNaranja = document.getElementById('boton-naranja');
    const bloqueoNaranja = document.getElementById('bloqueo-naranja');
    const final = document.getElementById('final');
    let posX = 0;
    let posY = 0;
    let llavesRecogidas = {
        azul: false,
        rojo: false,
        verde: false,
        amarillo: false
    };
    let bloqueosActivos = {
        aqua: false,
        naranja: false
    };

    document.addEventListener('keydown', (event) => {
        const contenedorRect = contenedor.getBoundingClientRect();
        const circuloRect = circulo.getBoundingClientRect();

        let newPosX = posX;
        let newPosY = posY;

        switch(event.key) {
            case 'w':
                newPosY -= 15; // Movimiento más fluido
                break;
            case 'a':
                newPosX -= 15; // Movimiento más fluido
                break;
            case 's':
                newPosY += 15; // Movimiento más fluido
                break;
            case 'd':
                newPosX += 15; // Movimiento más fluido
                break;
        }

        const newCirculoRect = {
            top: circuloRect.top + (newPosY - posY),
            bottom: circuloRect.bottom + (newPosY - posY),
            left: circuloRect.left + (newPosX - posX),
            right: circuloRect.right + (newPosX - posX)
        };

        let collision = false;
        lineas.forEach(linea => {
            const lineaRect = linea.getBoundingClientRect();
            if (
                newCirculoRect.right > lineaRect.left &&
                newCirculoRect.left < lineaRect.right &&
                newCirculoRect.bottom > lineaRect.top &&
                newCirculoRect.top < lineaRect.bottom
            ) {
                collision = true;
            }
        });

        // Detectar colisión con las llaves
        const llaves = [
            { llave: llaveAzul, color: 'azul' },
            { llave: llaveRoja, color: 'rojo' },
            { llave: llaveVerde, color: 'verde' },
            { llave: llaveAmarilla, color: 'amarillo' }
        ];

        llaves.forEach(({ llave, color }) => {
            const llaveRect = llave.getBoundingClientRect();
            if (
                newCirculoRect.right > llaveRect.left &&
                newCirculoRect.left < llaveRect.right &&
                newCirculoRect.bottom > llaveRect.top &&
                newCirculoRect.top < llaveRect.bottom
            ) {
                llave.style.display = 'none';
                llavesRecogidas[color] = true;
            }
        });

        // Detectar colisión con los candados
        const candados = [
            { candado: candadoAzul, color: 'azul' },
            { candado: candadoRojo, color: 'rojo' },
            { candado: candadoVerde, color: 'verde' },
            { candado: candadoAmarillo, color: 'amarillo' }
        ];

        candados.forEach(({ candado, color }) => {
            const candadoRect = candado.getBoundingClientRect();
            if (
                newCirculoRect.right > candadoRect.left &&
                newCirculoRect.left < candadoRect.right &&
                newCirculoRect.bottom > candadoRect.top &&
                newCirculoRect.top < candadoRect.bottom
            ) {
                if (llavesRecogidas[color]) {
                    candado.style.display = 'none';
                } else {
                    collision = true;
                }
            }
        });

        // Detectar colisión con los botones
        const botones = [
            { boton: botonAqua, bloqueo: bloqueoAqua, botonActivo: 'botones/boton_aqua_activado.svg', bloqueoAbierto: 'bloqueos/bloqueo_aqua_abierto.svg', bloqueoKey: 'aqua' },
            { boton: botonNaranja, bloqueo: bloqueoNaranja, botonActivo: 'botones/boton_naranja_activado.svg', bloqueoAbierto: 'bloqueos/bloqueo_naranja_abierto.svg', bloqueoKey: 'naranja' }
        ];

        botones.forEach(({ boton, bloqueo, botonActivo, bloqueoAbierto, bloqueoKey }) => {
            const botonRect = boton.getBoundingClientRect();
            if (
                newCirculoRect.right > botonRect.left &&
                newCirculoRect.left < botonRect.right &&
                newCirculoRect.bottom > botonRect.top &&
                newCirculoRect.top < botonRect.bottom
            ) {
                boton.src = botonActivo;
                bloqueo.src = bloqueoAbierto;
                bloqueosActivos[bloqueoKey] = true;
            }
        });

        // Detectar colisión con los bloqueos
        const bloqueos = [
            { bloqueo: bloqueoAqua, key: 'aqua' },
            { bloqueo: bloqueoNaranja, key: 'naranja' }
        ];

        bloqueos.forEach(({ bloqueo, key }) => {
            const bloqueoRect = bloqueo.getBoundingClientRect();
            if (
                newCirculoRect.right > bloqueoRect.left &&
                newCirculoRect.left < bloqueoRect.right &&
                newCirculoRect.bottom > bloqueoRect.top &&
                newCirculoRect.top < bloqueoRect.bottom &&
                !bloqueosActivos[key]
            ) {
                collision = true;
            }
        });

        // Detectar colisión con los portales
        const portales = [
            { portal1: portalAzul1, portal2: portalAzul2, destino1: { x: 405, y: 686 }, destino2: { x: 20, y: 520 } },
            { portal1: portalRojo1, portal2: portalRojo2, destino1: { x: 1360, y: 520 }, destino2: { x: 1165, y: 320 } },
            { portal1: portalVerde1, portal2: portalVerde2, destino1: { x: 1545, y: 500 }, destino2: { x: 1025, y: 806 } },
            { portal1: portalAmarillo1, portal2: portalAmarillo2, destino1: { x: 935, y: 430 }, destino2: { x: 1685, y: 220 } }
        ];

        portales.forEach(({ portal1, portal2, destino1, destino2 }) => {
            const portal1Rect = portal1.getBoundingClientRect();
            const portal2Rect = portal2.getBoundingClientRect();
            if (
                newCirculoRect.right > portal1Rect.left &&
                newCirculoRect.left < portal1Rect.right &&
                newCirculoRect.bottom > portal1Rect.top &&
                newCirculoRect.top < portal1Rect.bottom
            ) {
                // Coordenadas de destino cerca del portal 2
                newPosX = destino2.x;
                newPosY = destino2.y;
            } else if (
                newCirculoRect.right > portal2Rect.left &&
                newCirculoRect.left < portal2Rect.right &&
                newCirculoRect.bottom > portal2Rect.top &&
                newCirculoRect.top < portal2Rect.bottom
            ) {
                // Coordenadas de destino cerca del portal 1
                newPosX = destino1.x;
                newPosY = destino1.y;
            }
        });

        // Detectar colisión con el portal de meta
        const portalMetaRect = portalMeta.getBoundingClientRect();
        if (
            newCirculoRect.right > portalMetaRect.left &&
            newCirculoRect.left < portalMetaRect.right &&
            newCirculoRect.bottom > portalMetaRect.top &&
            newCirculoRect.top < portalMetaRect.bottom
        ) {
            final.style.display = 'block';
            final.style.zIndex = '9999';
        }

        if (
            !collision &&
            newCirculoRect.top >= contenedorRect.top &&
            newCirculoRect.left >= contenedorRect.left &&
            newCirculoRect.bottom <= contenedorRect.bottom &&
            newCirculoRect.right <= contenedorRect.right
        ) {
            posX = newPosX;
            posY = newPosY;
            circulo.style.transform = `translate(${posX}px, ${posY}px)`;
        }
    });
});