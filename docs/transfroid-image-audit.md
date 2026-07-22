# Auditoría de imágenes de TRANSFROID FAM SAS

Fecha: 2026-07-21  
Repositorio: `/Users/april/Documents/Transfroid`

## Resumen ejecutivo

El proyecto usa Next.js 16, React 19, TypeScript, Tailwind CSS 4 y GSAP. El directorio público es `public/`. La portada activa es `components/home/HeroSequence.tsx`, reexportada como `TruckScrollHero`; el proceso está en `ProcessSection.tsx`, servicios en `ServicesSection.tsx`, flota y tipos de vehículo en `FleetSection.tsx`, y el cierre en `FinalCTA.tsx`.

Se auditó cada recurso visual real, se inspeccionó la secuencia mediante hojas de contacto y fotogramas a resolución completa, y se verificaron hashes para detectar duplicados exactos. Se mantienen 14 fuentes PNG activas generadas mediante la herramienta nativa de generación de imágenes y una primera versión aprobada pero superada del hero desktop como respaldo. De las fuentes activas se produjeron 23 salidas optimizadas, incluidos seis formatos de marca.

No se modificó ni eliminó ningún asset original. Los PNG generados se conservaron en `assets-source/transfroid/`. No hay placeholders activos.

## Estructura y componentes localizados

| Área | Archivo o ruta | Observación |
|---|---|---|
| Framework | `next` 16.2.6 / React 19.2.6 | App Router |
| Estilos | `app/globals.css` + Tailwind CSS 4 | Paleta corporativa declarada en variables CSS |
| Directorio público | `public/` | Assets estáticos y secuencias |
| Hero activo | `components/home/HeroSequence.tsx` | Canvas con scrub de 120 fotogramas |
| Alias del hero | `components/TruckScrollHero.tsx` | Reexporta `HeroSequence` |
| Secuencia | `public/sequences/current-hero/` | 120 JPEG a 1440×810 |
| Proceso | `components/home/ProcessSection.tsx` | Cuatro pasos con `next/image` |
| Servicios | `components/home/ServicesSection.tsx` | Conserva cuatro fotogramas decorativos de la secuencia |
| Tipos y detalle de flota | `components/home/FleetSection.tsx` | Integra tarjetas 4:3 y galería 3:2 |
| Hero final | `components/home/FinalCTA.tsx` | Usa `<picture>` responsive nativo con dimensiones intrínsecas |
| Configuración de assets | `components/home/transfroidImageAssets.ts` | Ruta, alt, dimensiones, estado, tipo y fallback |

## Inventario de recursos preexistentes

Los pesos se expresan en bytes para que el inventario sea reproducible.

| Ruta | Cantidad | Resolución | Formato | Peso | Uso antes de la auditoría | Calidad visual | Cumple el nuevo requerimiento |
|---|---:|---:|---|---:|---|---|---|
| `public/sequences/current-hero/frame-001.jpg` … `frame-120.jpg` | 120 | 1440×810 | JPEG | 9,617,280 total; 65,598–98,965 c/u; 80,144 promedio | Hero canvas; además frames 030/058/086/110 en servicios y algunos frames en proceso/flota/CTA | Buena nitidez para 1440 px; tractomula verde plausible; sin placas legibles; continuidad de vehículo aceptable | Parcial: falla mínimo 1920×1080 y cambia por disolvencia de patio seco diurno a patio húmedo al anochecer entre aprox. 068–090 |
| `public/videos/transfroid-hero-current.mp4` | 1 | Vídeo fuente asociado a secuencia 1440×810 | MP4 | 2,899,417 | No referenciado por el render actual | Fuente coherente con secuencia actual | Parcial; se conserva como respaldo |
| `public/legacy/sequences/truck/ezgif-frame-001.jpg` … `060.jpg` | 60 | 1440×810 | JPEG | 5,103,064 total; 65,947–102,874 c/u; 85,051 promedio | Sin uso actual | Tractomula azul, atardecer dramático, patio mojado | No: color, luz y dirección visual no corresponden al nuevo brief |
| `public/legacy/videos/transfroid-hero-1080p.mp4` | 1 | Vídeo legacy | MP4 | 3,756,543 | Sin uso actual | Fuente de la secuencia legacy | No; se conserva como respaldo |
| `public/images/truck.svg` | 1 | 980×420 | SVG | 2,414 | Sin uso | Ilustración genérica de camión rígido | No para fotografía premium; no se eliminó |
| `public/favicon.svg` | 1 | 24×24 | SVG | 712 | Favicon del layout | Ícono geométrico genérico del starter | No es logo oficial; se mantuvo para no inventar marca |
| `public/file.svg` | 1 | Vector | SVG | 391 | Sin uso detectado | Asset genérico del starter | No relevante |
| `public/globe.svg` | 1 | Vector | SVG | 1,035 | Sin uso detectado | Asset genérico del starter | No relevante |
| `public/window.svg` | 1 | Vector | SVG | 385 | Sin uso detectado | Asset genérico del starter | No relevante |

## Revisión de secuencia

La secuencia actual se conserva porque sus 120 frames sí mantienen la misma tractomula, el mismo número de ejes, la misma longitud del tráiler y un movimiento globalmente continuo. Generar frames aislados con un modelo de imagen habría introducido saltos de cabina, ruedas, escala y perspectiva.

Limitaciones registradas:

- Resolución actual 1440×810; objetivo 1920×1080.
- El modelo es un tractocamión aerodinámico moderno, no un T800 de capó clásico.
- Entre aproximadamente los frames 068 y 090 hay disolvencia visible y cambio de patio, humedad y hora del día.
- No existe una secuencia móvil separada; el componente usa el master móvil generado como escena inicial y fallback estático, y conserva la secuencia 16:9 en el canvas.
- El consumo total de la secuencia es 9.6 MB y la carga ya está escalonada: 18 frames críticos y el resto diferido.
- `prefers-reduced-motion` ahora muestra el hero estático responsive y oculta el canvas.

Ruta final mantenida: `public/sequences/current-hero/frame-001.jpg` … `frame-120.jpg`.

Pendiente recomendado: producir un vídeo base continuo 1920×1080 o superior con seguimiento lateral consistente y extraer/interpolar una nueva secuencia. No se generaron frames incoherentes para aparentar cumplimiento.

## Assets generados e integrados

| Ruta final | Resolución | Formato | Peso | Sección | Fuente | Calidad / cumplimiento |
|---|---:|---|---:|---|---|---|
| `public/images/transfroid/hero/hero-desktop-master.png` | 2560×1440 | PNG | 5,081,068 | Master hero | `assets-source/transfroid/hero/hero-desktop-source.png` | Master sin pérdida para respaldo; no es la variante servida |
| `public/images/transfroid/hero/hero-desktop-master.webp` | 2560×1440 | WebP | 150,932 | Hero inicial desktop | Mismo master | Aprobado; vehículo completo en 62% derecho y tercio izquierdo despejado |
| `public/images/transfroid/hero/hero-mobile-master.webp` | 1080×1920 | WebP | 107,688 | Fallback hero móvil | `assets-source/transfroid/hero/hero-mobile-source.png` | Aprobado; composición vertical real y espacio superior |
| `public/images/transfroid/process/recoleccion.webp` | 1600×1000 | WebP | 107,230 | Proceso 01 | `assets-source/transfroid/process/recoleccion-source.png` | Aprobado; camión rígido doble troque alineado con muelle |
| `public/images/transfroid/process/conservacion.webp` | 1600×1000 | WebP | 138,580 | Proceso 02 | `assets-source/transfroid/process/conservacion-source.png` | Aprobado; ruta andina plausible, camión nítido |
| `public/images/transfroid/process/trazabilidad.webp` | 1600×1000 | WebP | 91,144 | Proceso 03 | `assets-source/transfroid/process/trazabilidad-source.png` | Aprobado; orientación derecha y sin interfaz incrustada |
| `public/images/transfroid/process/entrega.webp` | 1600×1000 | WebP | 99,342 | Proceso 04 | `assets-source/transfroid/process/entrega-source.png` | Aprobado; operación de llegada ordenada |
| `public/images/transfroid/fleet/mula.webp` | 1400×1050 | WebP | 93,374 | Tarjeta Mula | `assets-source/transfroid/fleet/mula-source.png` | Aprobado; tractomula articulada, quinta rueda y ejes plausibles |
| `public/images/transfroid/fleet/doble-troque.webp` | 1400×1050 | WebP | 87,278 | Tarjeta Doble troque | `assets-source/transfroid/fleet/doble-troque-source.png` | Aprobado; rígido con dos ejes traseros visibles |
| `public/images/transfroid/fleet/sencillo.webp` | 1400×1050 | WebP | 95,984 | Tarjeta Sencillo | `assets-source/transfroid/fleet/sencillo-source.png` | Aprobado; rígido con un eje trasero |
| `public/images/transfroid/fleet/turbo.webp` | 1400×1050 | WebP | 77,322 | Tarjeta Turbo | `assets-source/transfroid/fleet/turbo-source.png` | Aprobado; compacto, no van, un eje trasero |
| `public/images/transfroid/fleet-details/mula-desktop.webp` | 1800×1200 | WebP | 118,352 | Detalle Mula | Derivado del master de Mula | Aprobado; derivado desde PNG fuente, no desde tarjeta comprimida |
| `public/images/transfroid/fleet-details/doble-troque-desktop.webp` | 1800×1200 | WebP | 109,744 | Detalle Doble troque | Derivado del master correspondiente | Aprobado |
| `public/images/transfroid/fleet-details/sencillo-desktop.webp` | 1800×1200 | WebP | 122,146 | Detalle Sencillo | Derivado del master correspondiente | Aprobado |
| `public/images/transfroid/fleet-details/turbo-desktop.webp` | 1800×1200 | WebP | 101,582 | Detalle Turbo | Derivado del master correspondiente | Aprobado |
| `public/images/transfroid/cta/cta-final-desktop.webp` | 2560×1440 | WebP | 171,040 | CTA desktop | `assets-source/transfroid/cta/cta-final-desktop-source.png` | Aprobado; área oscura libre a la izquierda |
| `public/images/transfroid/cta/cta-final-mobile.webp` | 1080×1920 | WebP | 93,944 | CTA móvil | `assets-source/transfroid/cta/cta-final-mobile-source.png` | Aprobado; texto previsto arriba y camión abajo |
| `public/images/transfroid/brand/transfroid-mark-master.png` | 1254×1254 | PNG alfa | 921,048 | Master de marca | Logo actual aportado por la usuaria + rediseño generado | Aprobado; fondo transparente, un camión, ruta y copo de nieve |
| `public/images/transfroid/brand/transfroid-mark-256.webp` | 256×256 | WebP alfa | 16,436 | Navegación | Derivado del master | Aprobado; optimizado para display web |
| `public/images/transfroid/brand/transfroid-mark-64.png` | 64×64 | PNG alfa | 6,776 | Favicon | Derivado del master | Aprobado y legible a tamaño pequeño |
| `public/images/transfroid/brand/transfroid-apple-touch.png` | 180×180 | PNG alfa | 32,860 | Apple touch icon | Derivado del master | Aprobado |
| `public/images/transfroid/brand/transfroid-logo-vertical.png` | 1254×1254 | PNG alfa | 671,533 | Logo vertical master | Símbolo aprobado + texto generado | Aprobado; “TRANSFROID” y “FAM” debajo, fondo transparente |
| `public/images/transfroid/brand/transfroid-logo-vertical-768.webp` | 768×768 | WebP alfa | 65,296 | Logo vertical web | Derivado del master vertical | Aprobado y optimizado |

Todos los WebP quedan por debajo de los objetivos aproximados de peso. El PNG de 5.1 MB es un master explícito, no la variante de producción.

## Reutilizables, descartados y faltantes

### Reutilizables

- La secuencia actual completa y su MP4 se conservan para el scrubbing.
- Los frames 030, 058, 086 y 110 se mantienen como fondos decorativos distintos en servicios.
- El frame 001 permanece declarado como fallback de último recurso en la configuración centralizada.

### Descartados para el nuevo diseño, pero conservados

- Secuencia y vídeo legacy: cabina azul, atardecer dramático y patio mojado.
- `public/images/truck.svg`: ilustración genérica no fotográfica.
- Favicon actual: no se usa como marca en las fotografías.
- Dos primeras generaciones de trazabilidad y CTA fueron rechazadas por orientar el vehículo a la izquierda. Esos descartes quedaron solo en el almacén interno de generación; no se copiaron al repositorio.

### Faltantes o pendientes reales

- Secuencia nueva 1920×1080 con T800 clásico/moderno, misma luz y mismo patio. Se mantiene la secuencia existente por continuidad.
- La fuente editable/vectorial del logo histórico no fue aportada. El PNG original entregado por la usuaria se conserva intacto en `assets-source/transfroid/brand/transfroid-logo-original.png`.
- No se creó una secuencia móvil específica: el master 9:16 cubre fallback, `prefers-reduced-motion` y carga inicial; el canvas mantiene los frames continuos existentes.
- No hay AVIF porque el proyecto no tenía flujo AVIF previo; WebP satisface el objetivo sin añadir dependencias.

## Duplicados

- Duplicados exactos por SHA-1: ninguno entre los recursos auditados.
- Repetición visual: los frames adyacentes de cada secuencia son deliberadamente similares y no se consideran duplicados accidentales.
- No se reutilizó una misma fotografía para categorías de vehículo diferentes.

## Integración y rendimiento

- `HeroSequence.tsx`: muestra primero el hero generado responsive y funde el canvas al iniciar el scroll; el canvas sigue usando la secuencia existente. `fetchPriority="high"` se limita al hero above-the-fold. El punto focal del canvas se desplaza hacia la cabina en móviles y tablets verticales. La composición móvil también se sirve a tablets en orientación vertical.
- `ProcessSection.tsx`: usa cuatro WebP distintos con `next/image`, `sizes`, `fill`, texto alternativo y `unoptimized`. Esta última opción evita la ruta de optimización incompatible de Vinext/Cloudflare; los archivos ya están precomprimidos entre 91 y 139 KB.
- `FleetSection.tsx`: integra cuatro tarjetas 4:3 y cuatro paneles de detalle 3:2 con la misma estrategia; todas las imágenes inferiores cargan de forma diferida por defecto.
- `FinalCTA.tsx`: usa `<picture>` nativo para seleccionar desktop/móvil sin descargar ambas composiciones. Las dimensiones intrínsecas, `loading="lazy"` y `decoding="async"` se declaran explícitamente.
- `BrandLogo.tsx`: combina el símbolo transparente con el nombre exacto en HTML/CSS; evita depender de texto generado dentro de una imagen y mantiene accesibilidad y nitidez responsive.
- `layout.tsx`: usa derivados PNG específicos para favicon y Apple touch icon; el favicon genérico anterior se conserva sin uso.
- `transfroidImageAssets.ts`: centraliza ruta, alt, dimensiones, estado, tipo y fallback; todos los estados finales son `generated` y no hay placeholders.
- Se preservan `aspect-ratio`, `object-fit: cover`, dimensiones intrínsecas y `overflow-x-clip` para evitar CLS y scroll horizontal.

## Control de calidad realizado

- Apertura y decodificación de cada PNG fuente y cada WebP final.
- Verificación de resolución mediante encabezados de archivo.
- Inspección visual individual y mediante hojas de contacto.
- Revisión específica de ruedas, ejes, acoples, unidad de refrigeración, dirección, color, placas y recortes.
- Verificación de hashes para duplicados exactos.
- Rechazo y regeneración de trazabilidad y CTA por dirección incorrecta.
- Conservación de masters y originales sin alteración.
- QA en navegador real sobre hero, proceso, flota y CTA; todas las imágenes integradas decodificaron con sus resoluciones esperadas.
- Validación responsive a 360, 390, 430, 768, 1024, 1440 y 1920 px: sin scroll horizontal y con selección correcta de fuentes móvil/desktop.
- Consola del navegador después de la corrección: 0 errores y 0 advertencias.

## Validación técnica

| Prueba | Comando | Resultado |
|---|---|---|
| Lint | `npm run lint` | Aprobado, 0 errores y 0 advertencias |
| Typecheck | `npx tsc --noEmit` | Aprobado |
| Tests HTML | `node --test tests/rendered-html.test.mjs` | 0/2: fixtures preexistentes del starter están obsoletos; esperan `codex-preview` y `app/_sites-preview/preview.css`, que no existe. No está relacionado con los assets ni con los componentes modificados. |
| Build | `npm run build` | Aprobado; compilación, TypeScript y prerender estático completados |
