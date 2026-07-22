# Estado de activos — TRANSFROID FAM SAS

Revisión realizada el 21 de julio de 2026. La página funciona con los activos disponibles y no genera sustitutos artificiales.

## Activos esperados que no fueron entregados

| Activo solicitado | Estado | Solución actual |
| --- | --- | --- |
| `/public/images/transfroid/branding/logo-transfroid-white.svg` | Pendiente | Se usa el logo real disponible en `/public/images/transfroid/brand/transfroid-logo-vertical-768.webp`. |
| `/public/images/transfroid/branding/logo-transfroid-dark.svg` | Pendiente | Se usa el mismo archivo WebP sobre fondos de alto contraste. |
| `/public/images/transfroid/hero/hero-desktop-01.webp` | Nombre no disponible | El equivalente entregado es `/public/images/transfroid/hero/hero-desktop-master.webp`. |
| `/public/images/transfroid/hero/hero-mobile-01.webp` | Nombre no disponible | El equivalente entregado es `/public/images/transfroid/hero/hero-mobile-master.webp`. |

## Configuración pendiente

- `NEXT_PUBLIC_TRANSFROID_WHATSAPP`: número real de WhatsApp en formato internacional. Mientras no exista, el control se muestra desactivado y no enlaza a un destino vacío o inventado.
- `NEXT_PUBLIC_SITE_URL`: URL pública final, recomendable para activar URLs canónicas absolutas e imágenes sociales cuando se publique el sitio.

## Activos confirmados

- Secuencia hero de 120 fotogramas en `/public/sequences/current-hero/`.
- Imágenes desktop y mobile del hero.
- Cuatro imágenes del proceso.
- Cuatro imágenes de tarjetas de flota y cuatro imágenes de detalle.
- Imagen CTA en variantes desktop y mobile.
- Logo raster real, favicon y Apple Touch icon.
