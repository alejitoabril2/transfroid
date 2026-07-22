# Prompts de generación de imágenes de TRANSFROID

Fecha: 2026-07-21  
Herramienta: generador de imágenes nativo de Codex (`image_gen`, modo built-in)  
Uso: `photorealistic-natural`

## Dirección común utilizada

Cada prompt final incluyó esta dirección común, normalizada a partir del brief:

> Fotografía comercial premium y fotorrealista de logística refrigerada en un entorno latinoamericano plausible, luz diurna natural, vehículo completo orientado de izquierda a derecha, cabina verde lima comercial #B7FF00, furgón o tráiler refrigerado blanco, materiales y sombras realistas, operación profesional, sin texto, sin logotipo, sin watermark y sin placa legible. Geometría mecánica correcta, ruedas completas, ejes coherentes y unidad de refrigeración visible.

Negative prompt común:

> text, typography, logo, watermark, readable license plate, fake branding, deformed truck, duplicated wheels, fused wheels, missing wheels, extra axles, bent trailer, detached trailer, floating vehicle, impossible parking, incorrect coupling, asymmetrical windows, twisted grille, futuristic truck, cyberpunk, neon lighting, holograms, sci-fi warehouse, snow, artificial ice, artificial vapor, heavy fog, dramatic orange sunset, night scene, rainstorm, dirty or damaged truck, people in foreground, low resolution, blur, pixelation, illustration, cartoon, toy truck, obvious 3D render

Los bloques siguientes registran el prompt específico añadido a esa base, el resultado y la fuente final. Cuando una salida se derivó de otra, se indica expresamente; no se presenta como una generación independiente.

## Hero desktop

- Archivo: `public/images/transfroid/hero/hero-desktop-master.png` y `.webp`
- Resolución: 2560×1440; 16:9
- Prompt inicial: “Tractomula refrigerada completa inspirada en proporciones T800 clásico/moderno, capó largo, parrilla vertical, sleeper, espejos grandes, tanques metálicos, tándem de tracción, tráiler blanco con unidad frontal y tándem de tráiler. Patio logístico moderno con warehouse, luz diurna clara, camión grande en centro-derecha/lower-right, espacio tranquilo en tercio izquierdo y superior para header y títulos HTML, vista lateral 3/4 a nivel del vehículo, todas las ruedas y el tráiler completos.”
- Edición final después del QA responsive: “Preservar el camión y la escena aprobados, reducir moderadamente el vehículo y situar la tractomula completa dentro del 62% derecho. El 38% izquierdo debe contener únicamente pavimento limpio, warehouse discreto y cielo tranquilo; ninguna parte del camión ni del tráiler puede invadir esa zona. Mantener todos los ejes, ruedas, acople, unidad de refrigeración y proporciones.”
- Negative prompt: común + “truck behind copy, cropped trailer, cropped wheels, yellow/olive/turquoise cab, fluorescent neon green”.
- Resultado: segunda composición generada, aprobada e integrada. La primera versión se conserva en `assets-source/transfroid/hero/archive/hero-desktop-source-v1.png`.
- Fuente: `assets-source/transfroid/hero/hero-desktop-source.png`.
- Observaciones: el PNG es master; WebP es producción. El hero generado queda visible en carga inicial y la secuencia entra al comenzar el scroll.

## Hero móvil

- Archivo: `public/images/transfroid/hero/hero-mobile-master.webp`
- Resolución: 1080×1920; 9:16
- Prompt utilizado: “Usar el hero desktop aprobado como referencia de identidad. Crear una composición vertical real, no un recorte: mismo camión, parrilla, sleeper, color #B7FF00, tráiler, ejes, warehouse y luz. Cielo y área tranquila en 42% superior para título y dos botones; camión completo en mitad inferior, cabina a la derecha, parte significativa del tráiler y ninguna rueda recortada.”
- Negative prompt: común + “automatic landscape crop, vehicle behind top copy, tiny truck, cropped cab”.
- Resultado: generado con referencia y aprobado.
- Fuente: `assets-source/transfroid/hero/hero-mobile-source.png`.
- Observaciones: composición específica para móvil.

## Recolección

- Archivo: `public/images/transfroid/process/recoleccion.webp`
- Resolución: 1600×1000; 8:5
- Prompt utilizado: “Inicio de una recolección refrigerada segura; planta o warehouse latinoamericano, muelle y dock shelter visibles, patio seco organizado. Camión rígido refrigerado verde #B7FF00 y caja blanca, unidad de refrigeración visible, correctamente alineado con la aproximación al muelle, vista lateral 3/4, vehículo completo, sin carga expuesta ni personas protagonistas.”
- Negative prompt: común + “exposed cargo, staged handshake, impossible dock alignment”.
- Resultado: generado y aprobado.
- Fuente: `assets-source/transfroid/process/recoleccion-source.png`.
- Observaciones: el vehículo resultante es un doble troque rígido con dos ejes traseros.

## Conservación

- Archivo: `public/images/transfroid/process/conservacion.webp`
- Resolución: 1600×1000; 8:5
- Prompt utilizado: “Tractomula refrigerada viajando de izquierda a derecha en corredor colombiano o andino del norte, carretera seca y segura, colinas verdes realistas, fondo con movimiento leve y camión nítido. Cabina #B7FF00, tráiler blanco, unidad frontal visible, tándem de tractora y tráiler mecánicamente correctos.”
- Negative prompt: común + “snow, exaggerated ice, cold vapor, impossible road geometry, frozen landscape”.
- Resultado: generado y aprobado.
- Fuente: `assets-source/transfroid/process/conservacion-source.png`.
- Observaciones: transmite movimiento sin desenfocar el vehículo.

## Trazabilidad

- Archivo: `public/images/transfroid/process/trazabilidad.webp`
- Resolución: 1600×1000; 8:5
- Prompt utilizado: “Tractomula completa en corredor logístico junto a edificios de distribución, frente y cabina obligatoriamente en el extremo derecho, tráiler extendido hacia la izquierda, movimiento izquierda-derecha, espacio negativo limpio en upper-left para overlays HTML/CSS. No mostrar mapas, coordenadas, pantallas, rutas, datos ni hologramas.”
- Negative prompt: común + “vehicle facing left, embedded map, coordinates, GPS screen, route line, digital graphics”.
- Resultado: segundo intento generado y aprobado.
- Fuente: `assets-source/transfroid/process/trazabilidad-source.png`.
- Problema encontrado: el primer intento orientó el vehículo hacia la izquierda y fue descartado antes de copiarlo al repositorio.

## Entrega

- Archivo: `public/images/transfroid/process/entrega.webp`
- Resolución: 1600×1000; 8:5
- Prompt utilizado: “Entrega refrigerada llegando a centro de distribución moderno, muelles visibles, patio amplio y seco, vehículo completo orientado a la derecha y correctamente alineado con recepción, maniobra físicamente posible, puertas y caja rectas, luz diurna clara, sensación de puntualidad y operación ordenada.”
- Negative prompt: común + “warped dock, deformed doors, truck crossing structure, impossible backing angle, exposed cargo”.
- Resultado: generado y aprobado.
- Fuente: `assets-source/transfroid/process/entrega-source.png`.

## Mula

- Archivo: `public/images/transfroid/fleet/mula.webp`
- Resolución: 1400×1050; 4:3
- Prompt utilizado: “Vehículo más grande de la sesión: tractomula refrigerada completa inspirada en T800, parrilla vertical, sleeper, tanques, un eje director, dos ejes de tracción, quinta rueda, semirremolque blanco refrigerado con unidad frontal y ejes plausibles; mismo patio, cielo, cámara y luz que el resto de la flota; ocupa aproximadamente 78% del ancho.”
- Negative prompt: común + “rigid box truck, no fifth wheel, cropped trailer”.
- Resultado: generado y aprobado.
- Fuente: `assets-source/transfroid/fleet/mula-source.png`.

## Doble troque

- Archivo: `public/images/transfroid/fleet/doble-troque.webp`
- Resolución: 1400×1050; 4:3
- Prompt utilizado: “Camión rígido refrigerado mediano-grande, cab-over, exactamente un eje delantero y dos ejes traseros distintos bajo caja blanca permanentemente unida al chasis, sin quinta rueda ni articulación, unidad de refrigeración frontal, vista y sesión coherentes con la mula; ambos ejes traseros sin obstrucción.”
- Negative prompt: común + “semi tractor, fifth wheel, separate trailer, one rear axle, three rear axles”.
- Resultado: generado y aprobado.
- Fuente: `assets-source/transfroid/fleet/doble-troque-source.png`.

## Sencillo

- Archivo: `public/images/transfroid/fleet/sencillo.webp`
- Resolución: 1400×1050; 4:3
- Prompt utilizado: “Camión rígido refrigerado mediano, cab-over, menor y más corto que doble troque, exactamente un eje delantero y un eje trasero, caja blanca unida al chasis, sin quinta rueda ni tráiler, unidad frontal visible; mismo patio, ángulo y luz; ocupa aproximadamente 62% del ancho.”
- Negative prompt: común + “second rear axle, semi tractor, separate trailer, van”.
- Resultado: generado y aprobado.
- Fuente: `assets-source/transfroid/fleet/sencillo-source.png`.

## Turbo

- Archivo: `public/images/transfroid/fleet/turbo.webp`
- Resolución: 1400×1050; 4:3
- Prompt utilizado: “Equipo más pequeño: camión refrigerado compacto cab-over, cabina corta y baja, caja blanca corta unida al chasis, exactamente un eje delantero y un eje trasero, unidad compacta, no van ni tractomula, orientación derecha, mismo patio y luz; ocupa aproximadamente 52% del ancho.”
- Negative prompt: común + “van, semi tractor, second rear axle, oversized truck”.
- Resultado: generado y aprobado.
- Fuente: `assets-source/transfroid/fleet/turbo-source.png`.

## Detalles de flota

- Archivos: `public/images/transfroid/fleet-details/{mula,doble-troque,sencillo,turbo}-desktop.webp`
- Resolución: 1800×1200; 3:2
- Prompt utilizado: no hubo una generación nueva. Cada archivo deriva del PNG fuente aprobado de su categoría mediante recorte central conservador y reescalado Lanczos, antes de cualquier compresión de tarjeta.
- Negative prompt: no aplica a la derivación; el source ya había pasado el negative prompt de su categoría.
- Resultado: cuatro derivados aprobados.
- Fuente: los cuatro PNG en `assets-source/transfroid/fleet/`.
- Observaciones: no se amplió una tarjeta WebP pequeña ni pixelada.

## CTA desktop

- Archivo: `public/images/transfroid/cta/cta-final-desktop.webp`
- Resolución: 2560×1440; 16:9
- Prompt utilizado: “Tractomula T800-like completa en patio de warehouse, cabina y frente estrictamente en el lado derecho, tráiler hacia el centro, dirección izquierda-derecha. Fachada sombreada abierta forma espacio oscuro y despejado en 42% izquierdo para heading HTML y botones; operación completada, luz diurna neutral, sin atardecer.”
- Negative prompt: común + “vehicle facing left, truck occupying left copy space, orange sunset, embedded buttons”.
- Resultado: segundo intento generado y aprobado.
- Fuente: `assets-source/transfroid/cta/cta-final-desktop-source.png`.
- Problema encontrado: el primer intento orientó el camión a la izquierda y fue descartado.

## CTA móvil

- Archivo: `public/images/transfroid/cta/cta-final-mobile.webp`
- Resolución: 1080×1920; 9:16
- Prompt utilizado: “Usar CTA desktop aprobado como referencia. Preservar el mismo camión, cabina #B7FF00, tráiler, ejes, warehouse y luz; composición vertical real con 40% superior oscuro, calmado y libre para heading y dos botones; camión completo centro-abajo, frente a la derecha, tráiler significativo y ruedas completas.”
- Negative prompt: común + “automatic crop, truck behind top copy, cropped cab, cropped wheels, sunset, night”.
- Resultado: generado con referencia y aprobado.
- Fuente: `assets-source/transfroid/cta/cta-final-mobile-source.png`.

## Secuencia del hero

- Ruta: `public/sequences/current-hero/frame-001.jpg` … `frame-120.jpg`
- Estado: reutilizada, no generada.
- Prompt: no aplica; es un asset preexistente.
- Resultado: conservada por continuidad superior a una generación cuadro a cuadro.
- Observaciones: 1440×810, transición de día seco a patio húmedo al anochecer y modelo distinto del T800. Requiere futuro vídeo base continuo/interpolación para una sustitución coherente.

## Símbolo de marca

- Archivos: `public/images/transfroid/brand/transfroid-mark-master.png`, `transfroid-mark-256.webp`, `transfroid-mark-64.png` y `transfroid-apple-touch.png`.
- Referencia autorizada: logo actual aportado por la usuaria, preservado en `assets-source/transfroid/brand/transfroid-logo-original.png`.
- Prompt utilizado: “Rediseñar el emblema como símbolo vector-friendly premium para transporte refrigerado. Conservar solo un camión refrigerado orientado a la derecha, una ruta y un copo de nieve; simplificar en una silueta circular fuerte y legible a 32 px. Paleta plana: azul profundo #031B3A, verde lima #B7FF00, cian #00D9FF y blanco. Sin morado, rosado, mapa mundial, pines, segundo camión, metal, 3D, glow ni texto. Fondo técnico uniforme #FF00FF para extracción.”
- Resultado: generado con la herramienta nativa y aprobado. El rosado se eliminó completamente con chroma key; el master final tiene canal alfa.
- Integración: el símbolo se combina con “TRANSFROID FAM SAS” como texto HTML/CSS exacto mediante `components/brand/BrandLogo.tsx`.

### Lockup vertical TRANSFROID FAM

- Archivos: `public/images/transfroid/brand/transfroid-logo-vertical.png` y `transfroid-logo-vertical-768.webp`.
- Prompt utilizado: “Preservar exactamente el símbolo aprobado en el 68% superior. Debajo, añadir dos líneas centradas y ninguna otra: ‘TRANSFROID’ en sans geométrica bold italic blanca y ‘FAM’ en mayúsculas verde lima #B7FF00 con tracking amplio. Sin SAS, slogan, morado, rosado, 3D, glow ni watermark. Fondo técnico uniforme #FF00FF para extracción.”
- Resultado: texto verificado, fondo técnico eliminado y canal alfa validado.

## Estado final

- Fuentes activas generadas y aprobadas: 14 PNG.
- Fuente aprobada pero superada y archivada: 1 PNG (hero desktop v1).
- Marca: 1 símbolo transparente, 3 derivados responsive y 2 lockups verticales; logo histórico original preservado.
- Derivadas y aprobadas: 23 salidas de producción/master.
- Reutilizada: secuencia actual de 120 JPEG.
- Rechazadas: 2 primeras iteraciones, no integradas.
- Placeholders activos: 0.
- Pendientes de generación: secuencia 1080p coherente; no se intentó cuadro a cuadro para evitar discontinuidades mecánicas.
