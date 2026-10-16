# AGENTS.md - M&C Grúas (mycgruas.com)

## Descripción del proyecto
Sitio web estático de M&C Grúas, servicio de grúas 24/7 con base en Cali, Colombia, y rutas principales Cali - Bogotá, Bogotá - Cali, Cali - Pasto y Pasto - Cali. Público objetivo: clientes que entran mayoritariamente desde móvil para llamar o escribir por WhatsApp. Produciendo en Hostinger. Hostinger reportó escritorio 89 y móvil 67 (PageSpeed/Lighthouse).

## Tecnologías
- HTML5 estático (4 páginas): `index.html`, `flota.html`, `redes.html`, `experiencia.html`.
- CSS: `assets/css/style.css`, `assets/css/responsive.css` (Bootstrap 5.3.3 utilitarios vía CDN + estilos propios).
- JS: `assets/js/scripts.js` (vanilla, `defer`), Bootstrap Bundle CDN (`defer`).
- Datos dinámicos en JSON: `assets/data/galeria.json`, `flota.json`, `redes.json`, `servicios-recientes.json`, `testimonios.json`.
- Imágenes: `assets/img/`, `assets/ImgGruas/`, `assets/servicios-recientes/` (JPEG/PNG, sin optimizar, sin WebP).
- Fuentes: Google Fonts (Barlow, Oswald) y Bootstrap Icons vía jsDelivr CDN.
- Terceros: Google Tag Manager (GTM-K7THMDSF), TikTok embed.js (solo `redes.html`), Formspree (formularios).
- SEO: `robots.txt`, `sitemap.xml`, `llms.txt`, JSON-LD `LocalBusiness` + `FAQPage` (solo `index.html`).
- No hay `.htaccess` en el repositorio (Hostinger Apache lo gestiona desde el panel/hosting).
- Documentación interna: `README.md`, `mejorar.md`, `docs/USO_PLATAFORMA.md`, `docs/GESTION_CONTENIDO.md`.

## Estructura de carpetas (raíz)
```
MCgruas/
├── index.html
├── flota.html
├── redes.html
├── experiencia.html
├── robots.txt
├── sitemap.xml
├── llms.txt
├── README.md
├── mejorar.md
├── AGENTS.md
├── ANALISIS_SITIO_WEB.md
├── PLAN_DE_MEJORAS.md
├── TAREAS.md
├── assets/
│   ├── css/style.css
│   ├── css/responsive.css
│   ├── js/scripts.js
│   ├── data/*.json
│   ├── img/ (logo, héroes de página, favicon)
│   ├── ImgGruas/ (galería, 31 jpeg)
│   └── servicios-recientes/ (5 jpeg + 8 GruaM&C jpeg)
└── docs/
    ├── USO_PLATAFORMA.md
    └── GESTION_CONTENIDO.md
```

## Convenciones
- Idioma del sitio: español (es-CO). Comentarios en código en español.
- Clases CSS propias con nombres en español/neutro; utilitarios de Bootstrap sin modificar.
- Contacto por `data-contact-type`/`data-contact-value` en botones; lógica en `scripts.js` (`setupContactActions`). Nunca usar `href="tel:"`/`mailto:`/`wa.me` directo en HTML.
- Imágenes de galería/flota/redes/testimonios se cargan desde JSON, no se hardcodean en HTML.
- Formularios envían a Formspree de forma asíncrona (`fetch`), sin recarga.
- Año del footer se autocompleta con JS (`updateCurrentYear`).
- Imágenes originales se conservan; si se optimizan, se deja copia de respaldo.

## Reglas de trabajo (OBLIGATORIO)
1. **NO modificar diseño visual, textos comerciales, teléfonos, enlaces de WhatsApp/redes ni formularios** sin aprobación explícita.
2. **NO aplicar mejoras de diseño detectadas** (botones pequeños, contraste, legibilidad, CLS): registrarlas como propuesta en `PLAN_DE_MEJORAS.md` / `ANALISIS_SITIO_WEB.md` y esperar aprobación.
3. Cambios de diseño solo si son mínimos y justificados por usabilidad, accesibilidad o rendimiento.
4. Fase 1: solo crear los 4 archivos de planificación. No tocar ningún archivo del sitio.
5. Fase 2: solo cuando el usuario apruebe explícitamente el plan. Trabajar en rama aparte, por lotes, marcar tareas en `TAREAS.md`, explicar cada cambio y esperar confirmación entre lotes.
6. Conservar originales de las imágenes antes de cualquier optimización.

## Qué se puede tocar (sin aprobación de diseño)
- Optimización de imágenes (peso/formato) manteniendo mismo recorte y apariencia.
- Cabeceras HTTP de caché/compresión (`.htaccess` si Hostinger lo permite, o instrucciones para el panel).
- Carga de recursos (preload, `loading="lazy"`, `fetchpriority`, diferido de JS/CSS no crítico).
- Meta etiquetas, canonical, hreflang, Open Graph, Twitter, JSON-LD (sin cambiar textos comerciales).
- `.htaccess`, `robots.txt`, `sitemap.xml`, `llms.txt`.
- Rendimiento de `scripts.js` y CSS (eliminar render-blocking, inlining crítico opcional).
- Corrección de accesibilidad mínima (atributos `alt`, `aria-label`, focus) sin cambiar diseño.

## Qué NO tocar sin aprobación explícita
- Colores, tipografías, espaciados, tamaños de fuente, bordes, sombras.
- Textos visibles al cliente (copy comercial, teléfonos, mensajes de WhatsApp, redes).
- Estructura y campos de los formularios.
- Enlaces de WhatsApp, teléfonos, redes sociales.
- Logotipo y su ubicación.

## Cómo probar y verificar cambios
1. Abrir las 4 páginas en navegador real (escritorio y móvil / Chrome DevTools emulación móvil).
2. Probar botones flotantes Llamar y WhatsApp en móvil.
3. Probar formularios (contacto y satisfacción) y verificar mensaje de éxito/error.
4. Revisar que no haya desplazamiento horizontal (`overflow-x`).
5. Verificar galería, carrusel y miniaturas (`index.html`).
6. Verificar carga de flota, redes y testimonios desde JSON en sus páginas.
7. Ejecutar Lighthouse (móvil y escritorio) y comparar con línea base (móvil 67, escritorio 89).
8. Validar HTML (`validator.w3.org`) y JSON (`jq` o JSONLint).
9. Verificar `sitemap.xml` y `robots.txt` accesibles.
10. `git diff --check` antes de commitear.

## Cómo desplegar en Hostinger
1. Validar cambios localmente.
2. Subir archivos al repositorio GitHub vinculado (`origin/main`).
3. Desplegar desde Hostinger (sincronización del repositorio) o subir archivos manualmente por FTP/File Manager al `public_html`.
4. Después del despliegue, revisar `https://mycgruas.com/` y las 4 páginas internas.
5. Enviar/reenviar `https://mycgruas.com/sitemap.xml` a Google Search Console.
6. Revisar que GTM y formularios sigan funcionando en producción.
7. Confirmar que SSL/HTTPS esté activo (canonical y og:url apuntan a https).

## Rama de trabajo
Rama actual: `codex/Agente`. Para la Fase 2 crear una rama aparte (ej. `mejora/performancia-seo`) desde `main` y trabajar por lotes.
