# TAREAS.md - M&C Grúas (mycgruas.com)

Checklist derivada de `PLAN_DE_MEJORAS.md`. Marcar `[x]` al completar cada tarea. Trabajar por lotes, en rama aparte desde `main`, esperando confirmación entre lotes. Fase 2 solo con aprobación explícita del usuario.

## Lote 1 – Imágenes: optimizar peso y formato

- [x] 1.1 Crear carpeta de respaldo `assets/_backup_originales/` y copiar todas las imágenes originales antes de optimizar.
- [x] 1.2 Convertir `Experiencia_Gruas.png` a WebP (calidad 85), conservar PNG original.
- [x] 1.3 Convertir `Flota_Gruas.png` a WebP, conservar PNG original.
- [x] 1.4 Convertir `Redes_MCgruas.png` a WebP, conservar PNG original.
- [x] 1.5 Redimensionar `Logo_Nuevo_mcgrua.png` a 512x512 y generar WebP + PNG 512, conservar original 1024x1024.
- [x] 1.6 Convertir JPEG héroes (`principalGrua.jpeg`, `GruaFondo.jpeg`, `GruaFondo2.jpeg`) a WebP, conservar originales.
- [x] 1.7 Convertir galería `assets/ImgGruas/Grua (1)..(31).jpeg` a WebP (31 archivos), conservar originales.
- [x] 1.8 Convertir `assets/servicios-recientes/*.jpeg` a WebP (13 archivos), conservar originales.
- [x] 1.9 Revisar uso de `LogoGrua1.png`: no se usa en HTML/CSS/JS/JSON (solo en docs de planificación). Propuesta de eliminación deja para Lote 6 (sin eliminar sin aprobación).
- [x] 1.10 Actualizar referencias en HTML/CSS/JSON a los archivos `.webp` correspondientes.
- [ ] 1.11 Verificar que todas las imágenes cargan con mismo recorte y apariencia en las 4 páginas.
- [ ] 1.12 Ejecutar Lighthouse móvil y escritorio, comparar con línea base (móvil 67, escritorio 89).

## Lote 2 – Recursos bloqueantes y carga

- [x] 2.1 Añadir `rel="preload" as="style"` a `assets/css/style.css` y `assets/css/responsive.css` con patrón `onload` + `<noscript>` fallback (4 HTML).
- [x] 2.2 Mover script GTM de `<head>` a antes de `</body>` (index, flota, redes; experiencia no tenía script en head).
- [x] 2.3 Añadir `loading="lazy"` a hero de flota, redes, experiencia; `fetchpriority="high"` a principalGrua de index.
- [ ] 2.4 Verificar que no hay parpadeo visual (FOUC) y estilos aplicados correctamente.
- [ ] 2.5 Verificar GTM en modo preview.
- [ ] 2.6 Ejecutar Lighthouse: oportunidades "Eliminar recursos que bloquean el renderizado".

## Lote 3 – Caché y compresión

- [x] 3.1 Crear `.htaccess` con DEFLATE, ExpiresByType y FileETag para Apache (Hostinger).
- [ ] 3.2 Verificar cabeceras `content-encoding` y `cache-control` en respuestas de páginas y assets.
- [ ] 3.3 Ejecutar `git diff --check` y verificar que las 4 páginas responden `200 OK`.

## Lote 4 – SEO técnico: Open Graph, Twitter y JSON-LD internas

- [x] 4.1 Agregar etiquetas `og:*` y `twitter:*` a `flota.html`, `redes.html`, `experiencia.html`.
- [x] 4.2 Agregar JSON-LD `LocalBusiness` a las 3 páginas internas.
- [x] 4.3 Validar JSON-LD con Python (json.loads): 4 bloques OK (index LocalBusiness+FAQPage, internas LocalBusiness).
- [x] 4.4 Confirmar `og:url` apunta a la URL propia de cada página (/, /flota.html, /redes.html, /experiencia.html).
- [ ] 4.5 Ejecutar Lighthouse SEO / validador Open Graph.

## Lote 5 – Accesibilidad mínima y contenido

- [ ] 5.1 Reescribir párrafo de `#guia` en `index.html` eliminando referencia a "posicionar mejor la página" y enfocándolo al cliente.
- [ ] 5.2 (Opcional, si se aprueba) Añadir enlace "Saltar al contenido" en `<body>` de las 4 páginas.
- [ ] 5.3 Navegar con teclado (Tab) y confirmar foco visible y orden lógico.
- [ ] 5.4 Leer texto reescrito y confirmar utilidad para el cliente.

## Lote 6 – Limpieza menor (opcional)

- [ ] 6.1 Buscar referencias a `LogoGrua1.png` en todos los archivos.
- [ ] 6.2 Si no hay referencias, proponer eliminación al usuario.

## Reglas entre lotes

- Después de cada lote: explicar cambios, ejecutar pruebas, reportar resultados y esperar confirmación del usuario antes del siguiente lote.
- Conservar originales de imágenes en carpeta de respaldo.
- No modificar diseño visual, textos comerciales, teléfonos, WhatsApp, formularios ni logotipo sin aprobación explícita.
- `git diff --check` antes de commitear.
