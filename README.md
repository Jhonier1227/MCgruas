# M&C Grúas - Sitio web oficial

Sitio web comercial para `M&C Grúas`, enfocado en captar servicios de grúa en `Cali`, reforzar el mensaje de cobertura nacional y abrir nuevos espacios de confianza e interacción con clientes.

## Páginas actuales

- `index.html`: landing principal con enfoque en conversión rápida.
- `flota.html`: página de flota e información empresarial.
- `redes.html`: página para redes sociales y contenidos destacados.
- `experiencia.html`: espacio para satisfacción del servicio, sugerencias y testimonios aprobados.

## Estructura de archivos clave

- `assets/css/style.css`: estilos base del sitio.
- `assets/css/responsive.css`: ajustes de diseño para tablet y móvil.
- `assets/js/scripts.js`: navegación, formularios asíncronos y render de datos dinámicos.
- `assets/data/galeria.json`: fuente de datos de la galería principal.
- `assets/data/flota.json`: datos de la flota y de la empresa.
- `assets/data/redes.json`: canales sociales y publicaciones destacadas.
- `assets/data/testimonios.json`: opiniones aprobadas para publicar.
- `assets/data/servicios-recientes.json`: galería simple de servicios recientes.
- `assets/ImgGruas/`: carpeta donde viven las imágenes de la galería.
- `assets/servicios-recientes/`: carpeta exclusiva para la galería reciente de redes.
- `robots.txt` y `sitemap.xml`: archivos básicos de rastreo e indexación.

## Secciones implementadas

### En la home

- `Inicio`
- `Servicios`
- `Cobertura`
- `Guía útil`
- `Galería`
- `Contacto`
- `Accesos a páginas complementarias`

### Páginas complementarias

- `flota.html`: grúas visibles, datos de la empresa y estructura para mostrar el NIT.
- `redes.html`: perfiles sociales, especialmente TikTok, Instagram y Facebook.
- `experiencia.html`: formulario de satisfacción y espacio para testimonios moderados.

## Cómo agregar nuevas imágenes a la galería

La galería principal ya no depende del HTML. Para agregar una imagen nueva:

1. Copia la imagen dentro de `assets/ImgGruas/`.
2. Abre `assets/data/galeria.json`.
3. Agrega un nuevo objeto al arreglo con esta estructura:

```json
{
  "src": "assets/ImgGruas/nueva-imagen.jpg",
  "alt": "Descripción corta y clara de la imagen",
  "titulo": "Título comercial de la imagen",
  "descripcion": "Texto breve que explique el servicio o contexto",
  "categoria": "Etiqueta corta"
}
```

## Cómo administrar la flota

Edita `assets/data/flota.json`.

- En `empresa` puedes actualizar:
  - `nombre`
  - `nit`
  - `operacion`
  - `cobertura`
  - `correo`
  - `telefonos`
- En `vehiculos` puedes agregar nuevas grúas con imagen, descripción, uso y disponibilidad.

## Cómo administrar las redes

Edita `assets/data/redes.json`.

- En `canales` agregas o actualizas los perfiles oficiales.
- En `destacados` puedes publicar videos o posts destacados con miniatura, descripción y enlace.
- Si todavía no tienes un enlace listo, puedes dejar el campo `url` vacío.

## Cómo administrar la galería de servicios recientes

Esta galería vive en `redes.html` y fue pensada para ser muy fácil de mantener.

1. Sube o borra imágenes en `assets/servicios-recientes/`.
2. Edita `assets/data/servicios-recientes.json`.
3. Cada registro solo necesita:

```json
{
  "numero": 6,
  "nombre": "servicio-006.jpeg",
  "fecha": "2026-04-17"
}
```

El sistema construye solo la ruta final de la imagen con base en esa carpeta.

## Cómo administrar opiniones publicadas

La página `experiencia.html` recibe comentarios mediante formulario, pero la publicación pública se controla desde `assets/data/testimonios.json`.

Ejemplo:

```json
{
  "nombre": "Carlos M.",
  "empresa": "Transportes XYZ",
  "ciudad": "Cali",
  "servicio": "Grúa urbana",
  "calificacion": 5,
  "comentario": "El servicio llegó rápido y el traslado fue muy seguro."
}
```

## Recomendaciones rápidas

- Usa nombres simples de archivo.
- Optimiza imágenes antes de subirlas.
- No inventes testimonios; publica solo opiniones reales y aprobadas.
- Actualiza el `NIT` oficial en `assets/data/flota.json` antes de dejar esa página como definitiva.
- Agrega el enlace real de TikTok en `assets/data/redes.json` cuando lo tengas.

## Próximo paso pendiente

- Actualizar el logo actual por el nuevo archivo que se agregará más adelante.
