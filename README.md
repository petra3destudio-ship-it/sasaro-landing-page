# SASARO Landing — estructura para VS Code

Esta versión conserva el look & feel, contenido, responsive, animaciones y comportamiento del HTML original, pero separa el proyecto en archivos editables.

## Estructura

```text
SASARO_VSC/
├─ index.html
├─ assets/
│  ├─ css/
│  │  ├─ 01-base.css
│  │  ├─ 02-premium.css
│  │  ├─ 03-contact.css
│  │  ├─ 04-video.css
│  │  ├─ 05-process.css
│  │  └─ 06-yellow-titles.css
│  ├─ js/
│  │  ├─ 01-gallery-slider.js
│  │  ├─ 02-premium-ui.js
│  │  └─ 03-process-reveal.js
│  ├─ images/
│  │  ├─ branding/
│  │  ├─ gallery/
│  │  ├─ services/
│  │  ├─ process/
│  │  └─ icons/
│  └─ video/
│     └─ sasaro-showreel.mp4
└─ .vscode/settings.json
```

## Cómo trabajar en VS Code

1. Abre la carpeta `SASARO_VSC` en VS Code.
2. Para editar estructura y textos, usa `index.html`.
3. Para apariencia global, usa `assets/css/01-base.css` y `02-premium.css`.
4. Para contacto, video, proceso y títulos amarillos, edita sus CSS dedicados.
5. Para interacciones, carrusel y lightbox, usa `assets/js/`.
6. Abre `index.html` con Live Server para probar el sitio en navegador.

## Nota

Los assets que antes estaban embebidos como Base64 ahora son archivos físicos. Esto hace el proyecto mucho más sencillo de mantener, versionar en Git y publicar en GitHub Pages o cualquier hosting estático.
