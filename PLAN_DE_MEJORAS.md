# PLAN_DE_MEJORAS.md - M&C Grúas (mycgruas.com)

Plan priorizado por impacto/esfuerzo, dividido en lotes pequeños. Fase 2 solo cuando el usuario apruebe explícitamente. Trabajar en rama aparte desde `main`, por lotes, marcar tareas en `TAREAS.md`, explicar cada cambio y esperar confirmación entre lotes. Conservar originales de las imágenes antes de optimizar.

Regla de diseño: no modificar colores, tipografías, espaciados, textos comerciales, teléfonos, enlaces WhatsApp/redes, formularios ni logotipo sin aprobación explícita.

---

## Lote 1 – Imágenes: optimizar peso y formato (impacto alto, esfuerzo medio)

**Objetivo:** Reducir el peso de imágenes, el mayor factor del puntaje móvil (67).

**Archivos que toca:**
- `assets/img/Experiencia_Gruas.png` (2.60 MB)
- `assets/img/Flota_Gruas.png` (2.53 MB)
- `assets/img/Redes_MCgruas.png` (1.76 MB)
- `assets/img/Logo_Nuevo_mcgrua.png` (436.5 KB, 1024x1024)
- `assets/img/principalGrua.jpeg` (145.0 KB)
- `assets/img/GruaFondo.jpeg` (232.6 KB)
- `assets/img/GruaFondo2.jpeg` (109.6 KB)
- `assets/ImgGruas/Grua (1)..(31).jpeg`
- `assets/servicios-recientes/servicio-001..005.jpeg` + `GruaM&C (1)..(8).jpeg`
- `assets/img/LogoGrua1.png` (358.3 KB, revisar uso)

**Cambios exactos:**
1. Hacer copia de respaldo de cada imagen original en `assets/img/_backup_originales/` (o equivalente) antes de tocarla.
2. Convertir PNG héroes (`Experiencia_Gruas.png`, `Flota_Gruas.png`, `Redes_MCgruas.png`) a WebP con calidad 82-85, manteniendo dimensiones y recorte. Generar archivo `.webp` junto al PNG original (el PNG se conserva como respaldo).
3. Reconvertir JPEG pesados a WebP calidad 80-82.
4. Redimensionar `Logo_Nuevo_mcgrua.png` a máximo 512x512 (se renderiza a 60-82px), conservar PNG original de respaldo y generar WebP.
5. Actualizar referencias en HTML/CSS/JSON a los archivos `.webp` cuando existan, manteniendo fallback a PNG/JPEG si el navegador no soporta (usar `<picture>` solo en imágenes directas de HTML; en CSS `background-image` se puede dejar el original o cambiar la URL si se sustituye el archivo).
6. Revisar si `LogoGrua1.png` se usa en algún HTML/CSS/JSON. Si no se usa, proponer su eliminación (no eliminarlo sin aprobación).

**Riesgo:** Medio (cambio de formato de archivo; si una ruta se escribe mal, la imagen no carga).

**Verificación:**
- Abrir las 4 páginas y confirmar que todas las imágenes cargan y se ven igual (mismo recorte/apariencia).
- Comparar peso antes/después con `Get-ChildItem`.
- Lighthouse móvil antes/después.

**Revertir:** Restaurar archivos desde `assets/img/_backup_originales/` y deshacer referencias en HTML/CSS/JSON.

---

## Lote 2 – Recursos bloqueantes y carga (impacto medio-alto, esfuerzo bajo)

**Objetivo:** Reducir render-blocking en `<head>` y mejorar LCP/CLS.

**Archivos que toca:**
- `index.html`, `flota.html`, `redes.html`, `experiencia.html`

**Cambios exactos:**
1. Añadir `rel="preload" as="style"` a `assets/css/style.css` y `assets/css/responsive.css` con el mismo patrón `onload` ya usado para Google Fonts/Bootstrap Icons (convertir a stylesheet tras cargar), manteniendo `<noscript>` con el `<link rel="stylesheet">` normal.
2. Mover el script de GTM de `<head>` a justo antes de `</body>` (mantener `<noscript>` iframe donde esté). GTM no es crítico para el primer paint.
3. Añadir `loading="lazy"` a imágenes hero directas en HTML que no lo tengan (`principalGrua.jpeg` en index/redes, `Flota_Gruas.png`, `Experiencia_Gruas.png`, `Redes_MCgruas.png`) — salvo la imagen principal del LCP de index (`principalGrua.jpeg`), que puede llevar `fetchpriority="high"`.
4. Revisar que no queden imágenes críticas sin carga prioritaria en el LCP.

**Riesgo:** Bajo (carga de CSS/JS; patrón ya probado en el sitio).

**Verificación:**
- Abrir páginas y confirmar que no hay parpadeo visual (FOUC) y los estilos se aplican correctamente.
- Lighthouse: oportunidades "Eliminar recursos que bloquean el renderizado".
- Confirmar que GTM sigue enviando eventos (modo preview de GTM).

**Revertir:** Volver a la ubicación original de GTM y quitar `preload` de los CSS.

---

## Lote 3 – Caché y compresión (impacto medio, esfuerzo bajo-medio)

**Objetivo:** Aprovechar caché del navegador y compresión en Hostinger Apache.

**Archivos que toca:**
- `.htaccess` (nuevo, en raíz) O instrucciones para el panel de Hostinger si no permite `.htaccess`.

**Cambios exactos:**
1. Crear `.htaccess` con:
   - `AddOutputFilterByType DEFLATE` para html, css, js, svg.
   - `ExpiresActive On` y reglas `ExpiresByType` (imágenes 1 mes, CSS/JS 1 mes, HTML 1 día o acceso).
   - `FileETag MTime Size`.
2. Si Hostinger no aplica `.htaccess`, documentar en `PLAN_DE_MEJORAS.md` los pasos del panel (Apache / caché / compresión) y no crear el archivo.

**Riesgo:** Bajo (`.htaccess` solo afecta servir de archivos; si algo falla, se elimina el archivo).

**Verificación:**
- Responder `200 OK` en las 4 páginas y assets.
- Cabeceras `content-encoding: gzip/br` y `cache-control` presentes en respuesta (herramientas de desarrollador red).
- `git diff --check` limpio.

**Revertir:** Borrar `.htaccess`.

---

## Lote 4 – SEO técnico: Open Graph, Twitter y JSON-LD internas (impacto medio, esfuerzo bajo)

**Objetivo:** Mejorar compartición en redes y comprensión de buscadores en páginas internas.

**Archivos que toca:**
- `flota.html`, `redes.html`, `experiencia.html`

**Cambios exactos:**
1. Agregar a cada página interna: `og:type`, `og:locale`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. Valores específicos de cada página, sin cambiar textos comerciales (usar los `title`/`description` existentes y la imagen hero de cada página).
2. Agregar JSON-LD `LocalBusiness` (resumido) o `WebPage` en cada página interna (sin duplicar el FAQPage, que solo corresponde a index).
3. Mantener canonical y hreflang existentes (sin cambios).

**Riesgo:** Bajo (metaetiquetas y JSON-LD no afectan render visual).

**Verificación:**
- Validar JSON-LD con validador de schema.org.
- Comprobar que og:url de cada página apunta a su URL propia (no todas al root).
- Lighthouse SEO / herramientas de Open Graph.

**Revertir:** Eliminar los bloques agregados y volver al estado anterior (guardar copia de cada HTML antes).

---

## Lote 5 – Accesibilidad mínima y contenido (impacto bajo-medio, esfuerzo bajo)

**Objetivo:** Correcciones de accesibilidad mínima y ajuste de texto SEO visible.

**Archivos que toca:**
- `index.html` (párrafo `#guia`)
- `index.html`, `flota.html`, `redes.html`, `experiencia.html` (skip link opcional)

**Cambios exactos:**
1. Reescribir el párrafo de `#guia` en `index.html` (línea ~441-443) para que hable al cliente (qué hacer si está varado) y elimine la referencia a "posicionar mejor la página". No cambiar teléfonos, WhatsApp ni formularios.
2. Opcional: añadir enlace "Saltar al contenido" (`<a href="#inicio" class="visually-hidden focusable">Saltar al contenido</a>`) al inicio de `<body>` de cada página. Solo si se aprueba como cambio de usabilidad/accesibilidad.

**Riesgo:** Bajo (texto y un enlace oculto).

**Verificación:**
- Leer el texto reescrito y confirmar que es útil para el cliente.
- Navegar con teclado (Tab) y confirmar que el foco es visible y lógico.

**Revertir:** Restaurar texto original de `index.html` desde copia.

---

## Lote 6 – Imagen sin uso y limpieza menor (impacto bajo, esfuerzo bajo)

**Objetivo:** Eliminar o confirmar el uso de `LogoGrua1.png` (358.3 KB).

**Archivos que toca:**
- `assets/img/LogoGrua1.png` (candidato a eliminación)

**Cambios exactos:**
1. Buscar referencias a `LogoGrua1.png` en todos los archivos HTML, CSS, JS, JSON.
2. Si no hay referencias, proponer eliminación al usuario (no eliminar sin aprobación).

**Riesgo:** Mínimo.

---

## Orden de ejecución recomendado (Fase 2)

1. Lote 1 (imágenes) — mayor impacto en móvil.
2. Lote 2 (recursos bloqueantes) — alto impacto, bajo riesgo.
3. Lote 3 (caché/compresión) — impacto medio.
4. Lote 4 (SEO internas) — impacto medio, bajo riesgo.
5. Lote 5 (accesibilidad/contenido) — bajo impacto.
6. Lote 6 (limpieza) — opcional.

Entre cada lote: ejecutar pruebas, reportar resultados y esperar confirmación antes del siguiente lote.
