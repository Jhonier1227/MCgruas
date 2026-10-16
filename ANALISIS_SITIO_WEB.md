# ANALISIS_SITIO_WEB.md - M&C Grúas (mycgruas.com)

Diagnóstico completo del sitio estático de M&C Grúas. Estado actual: escritorio 89 / móvil 67 (PageSpeed/Lighthouse, reporte Hostinger). Análisis basado en revisión de todos los archivos del repositorio (4 HTML, 2 CSS, 1 JS, 5 JSON, robots.txt, sitemap.xml, llms.txt, imágenes y docs).

---

## 1. Rendimiento

### 1.1 Peso y formato de imágenes (evidencia medida)
Todas las imágenes están sin optimizar: sin WebP/AVIF, sin compresión progresiva, y varias con resoluciones muy por encima de su tamaño de renderizado.

| Archivo | Peso | Dimensiones | Uso | Observación |
|---|---|---|---|---|
| `assets/img/Experiencia_Gruas.png` | 2.60 MB | 1402x1122 | Hero experiencia.html | PNG sin optimizar, peso excesivo para hero |
| `assets/img/Flota_Gruas.png` | 2.53 MB | 1536x1024 | Hero flota.html | PNG sin optimizar |
| `assets/img/Redes_MCgruas.png` | 1.76 MB | 1254x1254 | Hero redes.html | PNG sin optimizar |
| `assets/img/Logo_Nuevo_mcgrua.png` | 436.5 KB | 1024x1024 | Logo header/footer/favicon (4 páginas) | 1024px para un logo de ~60-82px renderizado |
| `assets/img/LogoGrua1.png` | 358.3 KB | 1024x1024 | No usado en HTML (sobrante) | Imagen suelta sin uso |
| `assets/img/GruaFondo.jpeg` | 232.6 KB | 1600x1200 | Fondo CSS hero (index + page-hero internas) + flota.json | Imagen de fondo, sin alt posible |
| `assets/img/principalGrua.jpeg` | 145.0 KB | 1600x1200 | Hero media index, redes.html, flota.json | Sin `loading`/`fetchpriority` en HTML directo |
| `assets/img/GruaFondo2.jpeg` | 109.6 KB | - | flota.json, redes.json destacados | - |
| `assets/ImgGruas/Grua (1)..(31).jpeg` | 69 - 336 KB c/u | ~1599x1200 | Galería principal (31 imágenes, index.html) | Peso acumulado alto (~6 MB totales) |
| `assets/servicios-recientes/servicio-001..005.jpeg` + `GruaM&C (1)..(8).jpeg` | 156 - 336 KB c/u | ~1599x1200 | redes.html (13 imágenes) | Peso acumulado alto (~2.2 MB totales) |

Peso estimado solo de imágenes hero/logo en cada carga de página: entre 1.7 MB y 2.6 MB sin contar galería. Es el principal factor del bajo puntaje móvil.

### 1.2 CSS y JS bloqueante
- `index.html`, `flota.html`, `redes.html`, `experiencia.html` cargan en `<head>`:
  - `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css` (sin `preload`, bloquea render).
  - `assets/css/style.css` (28.6 KB) y `assets/css/responsive.css` (10.3 KB) (sin `preload`, bloquean render).
  - Google Fonts se carga con `rel="preload" as="style"` + `onload` para convertir a stylesheet (técnica válida pero deja doble carga en `<noscript>`).
  - Bootstrap Icons igual (preload + noscript).
- JS en `<body>` final con `defer`: Bootstrap bundle + `assets/js/scripts.js` (bien).
- GTM se inyecta síncronamente en `<head>` (bloquea parseo ligeramente, necesario para medición).

### 1.3 Fuentes y scripts de terceros
- Google Fonts: Barlow (400,500,600,700) + Oswald (500,600,700). Dos familias, 7 variantes en total. Peso no trivial en 3G.
- Bootstrap Icons vía CDN.
- Google Tag Manager (GTM-K7THMDSF): index, flota, redes (script + noscript iframe); experiencia solo noscript.
- TikTok `embed.js` (`async`): solo `redes.html`. Carga externa pesada y ajena al control.
- Formspree: formularios en index y experiencia (envío por `fetch`, no bloquea).

### 1.4 Galería / carrusel
- Galería principal de `index.html` se renderiza desde `galeria.json` (31 imágenes) vía JS tras `DOMContentLoaded`.
- Primer slide usa `fetchpriority="high"`; el resto `loading="lazy"`. Miniaturas también `loading="lazy"`. Es una implementación correcta pero el peso total de la galería es grande (~6 MB) y no hay WebP ni imágenes responsivas (`srcset`/`sizes`).

### 1.5 Lazy loading
- Galería principal: sí (JS, `loading="lazy"` en slides 2..N y miniaturas).
- `flota.json` vehículos: `loading="lazy"`.
- `servicios-recientes.json`: `loading="lazy"`.
- Imágenes hero directas en HTML (`principalGrua.jpeg` en index/redes, `Flota_Gruas.png`, `Experiencia_Gruas.png`, `Redes_MCgruas.png`): **sin** `loading="lazy"` ni `fetchpriority`.
- Fondos CSS (`GruaFondo.jpeg`): no aplicable a `loading`.

### 1.6 Caché y compresión
- No existe `.htaccess` en el repositorio. Hostinger gestiona Apache desde panel; no hay reglas de caché/compresión (Gzip/Brotli, `Cache-Control`) definidas en el proyecto.
- No hay `service-worker`.

### 1.7 Hallazgos críticos de rendimiento
1. Imágenes hero/PNG sin comprimir (Experiencia_Gruas.png 2.6 MB, Flota_Gruas.png 2.5 MB, Redes_MCgruas.png 1.76 MB, Logo_Nuevo_mcgrua.png 436 KB).
2. Falta de formato WebP/AVIF en todas las imágenes.
3. Recursos bloqueantes en `<head>` (Bootstrap CSS, style.css, responsive.css) sin `preload`.
4. GTM síncrono en `<head>`.
5. Sin cabeceras de caché/compresión definidas (depende del panel de Hostinger).
6. Peso acumulado de galería (31 imágenes ~6 MB) sin WebP ni responsive images.

---

## 2. SEO

### 2.1 Title y description por página
| Página | Title | Description |
|---|---|---|
| index.html | Grúas en Cali 24 Horas | Rutas Cali - Bogotá y Cali - Pasto | 126 caracteres (rango OK) |
| flota.html | Flota y Empresa | M&C Grúas Cali - Bogotá - Pasto | 119 caracteres (rango OK) |
| redes.html | Redes Sociales | M&C Grúas | 127 caracteres (rango OK) |
| experiencia.html | Experiencia del Cliente | M&C Grúas | 127 caracteres (rango OK) |

Todas dentro del rango recomendado (50-160 caracteres). Títulos descriptivos y con palabras clave locales.

### 2.2 Headings
- Cada página tiene un único `<h1>`: index (hero), flota, redes, experiencia. Correcto.
- Subsecciones usan `<h2>`/`<h3>` jerárquicamente. Sin saltos de nivel evidentes.

### 2.3 Alt de imágenes
- `img` tags en HTML llevan `alt` descriptivo (logo, heroes, galería).
- Imágenes de fondo CSS (`GruaFondo.jpeg`) no llevan alt (no aplicable, pero tampoco hay alternativa textual para el fondo decorativo).
- Imágenes renderizadas desde JSON llevan `alt` (galería, flota, servicios recientes, testimonios).
- SVG/iconos de Bootstrap Icons no requieren alt.

### 2.4 Canonical y hreflang
- Canonical presente en las 4 páginas apuntando a `https://mycgruas.com/` + ruta.
- `hreflang="es-CO"` y `hreflang="x-default"` en las 4 páginas. Correcto.

### 2.5 Sitemap y robots
- `sitemap.xml`: 4 URLs, `lastmod` 2026-05-29, prioridades 1.0 / 0.8. Correcto e incompleto solo en el sentido de que cubre todas las páginas públicas.
- `robots.txt`: `Allow: /`, apunta al sitemap. Correcto.

### 2.6 Open Graph y Twitter
- Solo `index.html` tiene etiquetas `og:*` y `twitter:*` (title, description, url, image, locale, type).
- `flota.html`, `redes.html`, `experiencia.html` **no tienen** Open Graph ni Twitter Cards. Al compartir esas páginas internas, las redes usarán valores por defecto o fallback.

### 2.7 Datos estructurados (JSON-LD)
- `index.html`: `LocalBusiness` (nombre, url, imagen, logo, teléfono, email, área servida, servicios, horario 24/7, contactPoints, sameAs redes) + `FAQPage` (5 preguntas). Correcto y bien formado.
- Páginas internas: sin JSON-LD.

### 2.8 Enlaces rotos
- Enlaces internos: `#inicio`, `#servicios`, `#guia`, `#contacto` (index); `index.html#...`, `flota.html`, `redes.html`, `experiencia.html` (internas). Todos resuelven dentro del sitio.
- Enlaces externos: Formspree, TikTok, Instagram, Facebook, Google Maps, wa.me (vía JS, no expuesto). No se puede verificar conectividad sin red, pero los dominios son válidos.
- No hay `href="tel:"`/`mailto:`/`wa.me` expuestos en HTML (se construyen vía JS desde `data-*`), buen patrón para evitar raspado, pero los rastreadores no ven los números como enlaces (compromiso intencional documentado en `mejorar.md`).

### 2.9 Textos duplicados
- El bloque FAQ de `index.html` está duplicado: JSON-LD `FAQPage` y acordeón visible tienen las mismas 5 preguntas/respuestas. Es intencional y válido (contenido para usuarios y para buscadores).
- Footer "Contacto rápido" repetido idéntico en las 4 páginas (componente compartido, no es problema SEO).
- Textos de cobertura/ruta repetidos en index, flota y redes (coherencia de marca, aceptable).

### 2.10 SEO técnico faltante
- Open Graph/Twitter solo en index.
- Sin breadcrumbs.
- Sin JSON-LD en páginas internas (LocalBusiness podría repetirse o usar `Organization`/`WebPage`).
- `sitemap.xml` sin imágenes ni lastmod dinámico (aceptable para sitio estático pequeño).

---

## 3. Móvil

### 3.1 Viewport
`<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />` en las 4 páginas. Correcto. Sin `maximum-scale` (bueno para accesibilidad/zoom).

### 3.2 Botones Llamar / WhatsApp (flotantes y hero)
- `.floating-cta` fijo derecha abajo; móvil: columna, `min-height: 44px` (575px) a `46px` (767px), padding ~0.62-0.65rem. Toque objetivo aceptable (≥44 px CSS).
- Hero móvil: `.btn` ancho completo, `min-height: 52px`, padding 0.88rem. Bueno.
- Contact-list móvil: padding 0.85rem, altura >44px. Bueno.
- Conclusión: los objetivos de tacto cumplen el mínimo de 44x44 px. No es un problema crítico de usabilidad.

### 3.3 Legibilidad
- Tamaños base con `clamp()` en títulos; párrafos 1rem-1.18rem. `line-height: 1.65` en body.
- En 575px: hero lead y section-heading p bajan a 1rem. Aceptable.
- Contraste: texto blanco sobre fondos oscuros y acento amarillo `#f5b219` sobre fondo oscuro. Requieren verificación de contraste AA, pero no hay evidencia clara de ilegibilidad en el CSS.

### 3.4 CLS (Cumulative Layout Shift)
- `html` y `body` con `overflow-x: hidden`.
- Imágenes con `display: block; max-width: 100%`.
- Carrusel con alturas fijas (`min(70vh, 620px)` desktop, `260px`/`220px` móvil) → sin salto.
- Hero con `min-height: 100vh` desktop y padding fijos móvil → sin salto notable.
- `scroll-behavior: smooth` en html.
- Las imágenes JSON se inyectan tras fetch; el contenedor `.gallery-shell` tiene padding fijo, por lo que no debería haber CLS grande, aunque las miniaturas aparecen tras JS.

### 3.5 Comportamiento del formulario
- Formularios asíncronos (`fetch`) sin recarga. Inputs `min-height: 50px` y `font-size: 16px` en móvil (evita zoom automático en iOS al focar).
- Botón submit `btn-warning btn-lg w-100`.
- Mensajes de estado con `role="alert"`.
- No hay validación nativa del teléfono más allá de `required` en `type="tel"`.

### 3.6 Otros móviles
- CTA flotante puede solaparse con contenido en pantallas muy estrechas (`.floating-cta` tiene `max-width: calc(100vw - 1.5rem)` y `body padding-bottom` en 767px; mitigado parcialmente).
- Menú desplegable con `max-height` y scroll interno en móvil.

---

## 4. Accesibilidad y buenas prácticas básicas

### Bien implementado
- `lang="es"` en `<html>`.
- `aria-label` en botones de navegación, controles del carrusel, CTA flotante (`aria-label="Acciones rápidas"`).
- `visually-hidden` en controles Anterior/Siguiente del carrusel.
- `aria-current="true"` en indicador activo de galería.
- `role="status"` en cajas de estado de datos JSON.
- `role="radiogroup"`, `role="alert"`, `aria-expanded`/`aria-controls` en navbar.
- Focus visible en nav-links, acordeón, controles.
- Formularios con `<label>` asociados (`for`/`id`), campos `required`.
- Botones `type="button"` en acciones de contacto (no envían formulario accidentalmente).

### Mejoras pendientes (no aplicadas, registro para plan)
- No hay "skip to content" (enlace de salto al contenido principal).
- No hay `aria-current` en el enlace de navegación de la página activa.
- El rating de experiencia oculta los inputs `opacity: 0; pointer-events: none` y se interactúa mediante labels; funcional con teclado vía labels, aceptable.
- Contraste de colores no auditado con herramienta (pendiente).

---

## 5. Contenido: textos que parecen notas internas o SEO/IA

Se detectaron fragmentos visibles al cliente escritos con enfoque de posicionamiento más que de usuario:

1. `index.html` sección `#guia`, párrafo (línea ~441-443):
   > "Este bloque aporta valor, genera confianza y ayuda a posicionar mejor la página con información útil para quienes están en carretera o acaban de sufrir una varada."
   -> Menciona explícitamente "posicionar mejor la página". Es texto para buscadores/IA, no para clientes.

2. `index.html` sección `.section-bridge`, título y texto genéricos:
   > "Conoce la flota, las redes y el espacio de satisfacción del servicio" / "Además de solicitar el servicio, aquí también puedes conocer la flota..."
   -> Texto funcional pero plano; no es un problema crítico.

3. Archivos JSON tienen campos `_guia` con instrucciones de mantenimiento (ej. "Para agregar una imagen..."). Estos campos **no se renderizan** en pantalla, solo se leen en el código. Son notas internas válidas dentro del JSON.

4. `mejorar.md` y `docs/` son documentación interna del repositorio, no contenido del sitio.

**Recomendación:** reescribir el párrafo del `#guia` para que hable al cliente (qué debe hacer si está varado), eliminando la referencia al posicionamiento. Es un cambio de texto menor, justificado por claridad al usuario.

---

## 6. Mejoras de diseño propuestas (SE PARTE APARTE, NO APLICAR EN FASE 2 SIN APROBACIÓN)

Se registran aquí como propuestas para aprobación futura. Ninguna se aplica todavía.

- **Imágenes:** convertir hero/PNG a WebP con compresión, reducir `Logo_Nuevo_mcgrua.png` de 1024px a tamaño razonable (~256-512px), generar versiones WebP de galería.
- **Render-blocking:** añadir `rel="preload"` a Bootstrap CSS/style.css o inlinear CSS crítico; diferir GTM si es posible.
- **Caché/compresión:** agregar `.htaccess` con `mod_deflate`/`mod_expires` o instrucciones para panel de Hostinger.
- **Open Graph:** agregar `og:*` y `twitter:*` a flota.html, redes.html, experiencia.html.
- **JSON-LD interno:** añadir `LocalBusiness`/`WebPage` a páginas internas.
- **Skip link:** añadir enlace de salto al contenido principal.
- **Texto guía:** reescribir párrafo SEO de index.html `#guia` enfocándolo al cliente.
- **Imagen sin uso:** revisar si `LogoGrua1.png` (358 KB) se usa en alguna parte; si no, considerar eliminarlo del repositorio.
- **Contraste:** auditar contraste AA de texto sobre fondos oscuros y acento amarillo.

---

## 7. Resumen de hallazgos principales

| Área | Estado | Impacto en móvil (67) |
|---|---|---|
| Imágenes | Crítico: PNG 1.7-2.6 MB sin comprimir, sin WebP, logo 436 KB | Muy alto |
| Recursos bloqueantes | Medio: Bootstrap CSS + CSS propios sin preload en `<head>` | Medio |
| Caché/compresión | Ausente: sin `.htaccess` ni reglas de caché | Medio |
| Galería | Peso acumulado ~6 MB en 31 imágenes JPEG | Medio |
| SEO | Bueno en index; falta OG/Twitter y JSON-LD en internas | Bajo/Medio |
| Móvil (botones/legibilidad/CLS) | Bueno: touch targets ≥44px, viewport correcto, sin CLS evidente | Bajo |
| Accesibilidad | Bueno: ARIA, labels, focus; falta skip link | Bajo |
| Contenido | 1 párrafo SEO visible en `#guia` reescribible | Bajo |
