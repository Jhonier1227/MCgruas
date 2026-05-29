# Mejoras SEO/GEO realizadas

Fecha de trabajo: 2026-05-29

## Objetivo

Aplicar las recomendaciones reportadas por TrueRanker sin rediseñar la página, manteniendo la estructura visual actual y priorizando mejoras técnicas de indexación, comprensión semántica, GEO/IA y rendimiento inicial.

## Cambios realizados

### 0. Segunda optimizacion posterior al analisis de TrueRanker

Despues de publicar la primera ronda, TrueRanker subio la efectividad de 78 a 95. Quedaron observaciones sobre legibilidad, URLs amigables y recursos de renderizado. Se aplicaron ajustes adicionales sin cambiar el diseno:

- Los enlaces `tel:`, `mailto:` y `wa.me` dejaron de estar expuestos como enlaces rastreables en el HTML.
- Las acciones de llamada, correo y WhatsApp se conservan mediante botones con datos semanticos y JavaScript.
- Se actualizo CSS para que los botones mantengan el mismo aspecto que los enlaces anteriores.
- Se cargan de forma diferida Google Fonts y Bootstrap Icons con `preload` y respaldo `noscript`.
- Se simplificaron frases largas en la home para mejorar legibilidad.

Validaciones de esta segunda ronda:

- No quedan `href="tel:"`, `href="mailto:"` ni `href="https://wa.me"` en las paginas HTML.
- `assets/js/scripts.js` pasa validacion de sintaxis con Node.js.
- Las paginas principales y recursos criticos responden `200 OK` en servidor local.
- Se mantiene Bootstrap CSS y los estilos propios como recursos criticos para evitar parpadeos visuales.

### 1. Meta descriptions

Se ajustaron las meta descriptions para mantenerlas dentro del rango recomendado de 50 a 160 caracteres:

- `index.html`: 126 caracteres.
- `flota.html`: 119 caracteres.
- `redes.html`: 127 caracteres.
- `experiencia.html`: 127 caracteres.

Esto corrige la advertencia de longitud excesiva detectada en la página principal.

### 2. Datos estructurados FAQPage

Se agregó schema `FAQPage` en formato JSON-LD en `index.html`, usando las preguntas frecuentes que ya existen visualmente en la página:

- Atención 24 horas en Cali.
- Servicio fuera de Cali.
- Información necesaria por WhatsApp.
- Tipos de vehículos que se pueden trasladar.
- Rutas principales.

El objetivo es ayudar a Google y a sistemas de IA a entender mejor el bloque de preguntas frecuentes.

### 3. Etiquetas hreflang

Se agregaron etiquetas `hreflang` en las páginas públicas principales:

- `index.html`
- `flota.html`
- `redes.html`
- `experiencia.html`

Cada página declara:

- `hreflang="es-CO"`
- `hreflang="x-default"`

Esto indica que el contenido está orientado a español de Colombia y deja una versión predeterminada para buscadores.

### 4. Archivo llms.txt

Se creó `llms.txt` en la raíz del sitio con información estructurada para sistemas de IA:

- Descripción del negocio.
- Cobertura principal.
- Páginas importantes.
- Servicios.
- Datos de contacto.
- Reglas para no inventar tarifas, direcciones ni disponibilidad no publicada.

URL esperada después del despliegue:

`https://mycgruas.com/llms.txt`

### 5. Enlace a Google Maps

Se agregó un enlace discreto a Google Maps:

- En la tarjeta de contacto de la página principal.
- En el footer de las páginas principales.

El enlace apunta a una búsqueda de Google Maps para `M&C Grúas Cali`. No se incrustó un mapa para evitar cargar scripts pesados y no alterar el diseño.

### 6. Recursos de carga inicial

Se agregaron conexiones anticipadas (`preconnect`) hacia `cdn.jsdelivr.net`, usado por Bootstrap y Bootstrap Icons.

También se marcaron los scripts principales con `defer`:

- Bootstrap bundle.
- `assets/js/scripts.js`.

Esto ayuda a reducir bloqueo de renderizado por JavaScript sin cambiar el comportamiento visual.

En la segunda ronda tambien se cargaron de forma diferida recursos no criticos:

- Google Fonts.
- Bootstrap Icons.

Se mantuvieron Bootstrap CSS y los CSS propios como recursos normales porque son necesarios para evitar parpadeos visuales y mantener estable el diseno inicial.

### 7. Sitemap

Se actualizó `sitemap.xml` con fecha `lastmod` del 2026-05-29 en las cuatro páginas públicas principales.

## Validaciones realizadas

- Los JSON de contenido siguen válidos:
  - `flota.json`
  - `galeria.json`
  - `redes.json`
  - `servicios-recientes.json`
  - `testimonios.json`
- Los bloques JSON-LD de `index.html` parsean correctamente.
- Las meta descriptions quedaron dentro del rango recomendado.
- Se verificó por servidor local que responden con `200 OK`:
  - `/`
  - `/flota.html`
  - `/redes.html`
  - `/experiencia.html`
  - `/llms.txt`
  - `/sitemap.xml`
- `git diff --check` no reportó errores de espacios o formato. Solo mostró advertencias normales de conversión LF/CRLF en Windows.

## Puntos pendientes para revisar personalmente

### 1. Publicar los cambios

Subir los archivos modificados al hosting o al flujo de despliegue que use Hostinger/GitHub. Hasta que no se publique, TrueRanker y Google no verán estas mejoras.

### 2. Reanalizar en TrueRanker

Después de publicar, ejecutar nuevamente el análisis en TrueRanker para confirmar que desaparezcan o bajen las advertencias:

- Meta description.
- FAQPage.
- Hreflang.
- llms.txt.
- Google Maps.
- Render blocking resources.

### 3. Confirmar perfil real de Google Maps

El sitio ahora enlaza una búsqueda de Google Maps. Si M&C Grúas tiene un perfil oficial de Google Business, conviene reemplazar ese enlace por la URL exacta del perfil.

### 4. Revisar Google Search Console

Después del despliegue:

- Enviar o reenviar `https://mycgruas.com/sitemap.xml`.
- Probar `https://mycgruas.com/llms.txt`.
- Usar inspección de URL para las páginas principales.
- Solicitar indexación si corresponde.
- Revisar aparte la URL marcada como `noindex`, porque ese problema puede venir del hosting, de una URL antigua o de una configuración externa.

### 5. Validación visual en navegador real

Se recomienda abrir las cuatro páginas en escritorio y celular después de publicar. Los cambios no deberían modificar el diseño, pero conviene revisar:

- Header.
- Footer.
- Tarjeta de contacto.
- Galería.
- Formularios.
- Menú móvil.

## Archivos modificados

- `index.html`
- `flota.html`
- `redes.html`
- `experiencia.html`
- `assets/css/style.css`
- `assets/css/responsive.css`
- `assets/js/scripts.js`
- `sitemap.xml`
- `llms.txt`
- `mejorar.md`
