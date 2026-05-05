# Gestión de Contenido y JSON

![Experiencia M&C Grúas](../assets/img/Experiencia_Gruas.png)

Esta guía explica cómo actualizar imágenes, flota, redes y testimonios sin modificar directamente el HTML.

## Regla General

Cada contenido dinámico se controla desde un archivo JSON dentro de `assets/data/`.

Antes de guardar un JSON:

- Mantén las comillas dobles.
- No elimines las comas entre objetos.
- No dejes comas sobrantes al final del último elemento.
- Usa rutas de imágenes existentes.
- Publica solo información real y aprobada.

## Galería Principal

Página donde aparece: `index.html`

Archivo JSON: `assets/data/galeria.json`

Carpeta de imágenes: `assets/ImgGruas/`

Para agregar una imagen:

1. Sube la foto a `assets/ImgGruas/`.
2. Abre `assets/data/galeria.json`.
3. Agrega un objeto dentro de `items`.

Ejemplo:

```json
{
  "src": "assets/ImgGruas/nueva-imagen.jpeg",
  "alt": "Servicio de grúa trasladando vehículo en carretera",
  "titulo": "Traslado seguro en ruta",
  "descripcion": "Servicio coordinado para movilizar el vehículo con seguridad.",
  "categoria": "Rutas principales"
}
```

Campos:

- `src`: ruta completa de la imagen.
- `alt`: descripción accesible de la imagen.
- `titulo`: título visible en la galería.
- `descripcion`: texto corto del servicio.
- `categoria`: etiqueta o tipo de servicio.

## Servicios Recientes

Página donde aparece: `redes.html`

Archivo JSON: `assets/data/servicios-recientes.json`

Carpeta de imágenes: `assets/servicios-recientes/`

Esta galería está pensada para subir y borrar fotos recientes con facilidad.

Para agregar una imagen:

1. Sube la imagen a `assets/servicios-recientes/`.
2. Abre `assets/data/servicios-recientes.json`.
3. Agrega un objeto dentro de `items`.

Ejemplo:

```json
{
  "numero": 14,
  "nombre": "servicio-014.jpeg",
  "fecha": "2026-05-05"
}
```

Campos:

- `numero`: orden interno de la imagen.
- `nombre`: nombre exacto del archivo dentro de `assets/servicios-recientes/`.
- `fecha`: fecha del servicio o publicación.

Para borrar una imagen:

1. Elimina el archivo de `assets/servicios-recientes/`.
2. Elimina su objeto en `assets/data/servicios-recientes.json`.

## Flota y Empresa

Página donde aparece: `flota.html`

Archivo JSON: `assets/data/flota.json`

Secciones principales:

- `empresa`: datos generales del negocio.
- `vehiculos`: unidades o servicios visibles en la página.

Ejemplo de empresa:

```json
"empresa": {
  "nombre": "M&C Grúas",
  "nit": "1.130.664.917",
  "operacion": "Cali, Bogotá y Pasto",
  "cobertura": "Rutas Cali - Bogotá, Bogotá - Cali, Cali - Pasto y Pasto - Cali",
  "correo": "gruamcgruas@gmail.com",
  "telefonos": ["317 713 7402", "316 649 3568"],
  "descripcion": "La flota respalda la operación de M&C Grúas para servicios urbanos, atención en carretera y recorridos programados."
}
```

Ejemplo de vehículo:

```json
{
  "nombre": "Unidad para maquinaria pesada o liviana",
  "tipo": "Transporte especializado",
  "imagen": "assets/img/GruaFondo2.jpeg",
  "alt": "Grúa transportando maquinaria",
  "descripcion": "Preparada para traslados que requieren plataforma estable y coordinación de carga.",
  "uso": "Maquinaria pesada o liviana, equipos y traslados especiales",
  "capacidad": "Apoyo logístico para cargas con atención programada",
  "disponibilidad": "Cali, Bogotá, Pasto y rutas definidas"
}
```

## Redes Sociales

Página donde aparece: `redes.html`

Archivo JSON: `assets/data/redes.json`

Secciones principales:

- `canales`: perfiles sociales oficiales.
- `destacados`: publicaciones, videos o enlaces recomendados.

Ejemplo de canal:

```json
{
  "plataforma": "TikTok",
  "handle": "@mcgruas7",
  "url": "https://www.tiktok.com/@mcgruas7",
  "cta": "Ir a TikTok",
  "descripcion": "Videos cortos de servicios, maniobras y atención en carretera.",
  "formato": "Videos cortos",
  "frecuencia": "Contenido en movimiento",
  "icono": "bi-music-note-beamed"
}
```

Ejemplo de destacado:

```json
{
  "titulo": "Video de traslado en carretera",
  "descripcion": "Registro visual de atención, cargue y entrega del vehículo.",
  "thumbnail": "assets/img/principalGrua.jpeg",
  "alt": "Vista previa de grúa en carretera",
  "url": "https://www.tiktok.com/@mcgruas7",
  "tipo": "TikTok"
}
```

## Testimonios

Página donde aparece: `experiencia.html`

Archivo JSON: `assets/data/testimonios.json`

La página recibe opiniones por formulario, pero las opiniones visibles se publican manualmente.

Para publicar un testimonio:

1. Revisa que el cliente haya autorizado publicación.
2. Abre `assets/data/testimonios.json`.
3. Agrega un objeto dentro de `testimonios`.
4. Actualiza `resumen.publicadas` con el número total visible.

Ejemplo:

```json
{
  "nombre": "Carlos M.",
  "empresa": "Transportes del Valle",
  "ciudad": "Cali",
  "servicio": "Traslado Cali - Bogotá",
  "calificacion": 5,
  "comentario": "El servicio fue puntual, seguro y con buena comunicación durante el recorrido."
}
```

Campos:

- `nombre`: nombre visible del cliente.
- `empresa`: empresa del cliente, si aplica.
- `ciudad`: ciudad relacionada con el servicio.
- `servicio`: tipo de servicio recibido.
- `calificacion`: número de 1 a 5.
- `comentario`: opinión autorizada.

Privacidad:

- No publiques teléfono.
- No publiques correo.
- No publiques ubicación exacta.
- No publiques comentarios sin autorización.

## Imágenes de Marca

Carpeta: `assets/img/`

Archivos destacados:

- `Logo_Nuevo_mcgrua.png`: logo actual del sitio.
- `Flota_Gruas.png`: imagen del hero de flota.
- `Redes_MCgruas.png`: imagen del hero de redes.
- `Experiencia_Gruas.png`: imagen del hero de experiencia.
- `principalGrua.jpeg`: imagen principal de apoyo.

## Validación Rápida

Después de editar contenido:

1. Abre la página relacionada en navegador.
2. Revisa que no aparezcan errores visuales.
3. Confirma que las imágenes carguen.
4. Valida que el JSON no tenga errores de comas o comillas.
5. Prueba en celular antes de publicar.

## Errores Comunes

- Escribir mal el nombre del archivo de imagen.
- Subir la imagen a una carpeta distinta a la indicada.
- Olvidar una coma entre objetos JSON.
- Dejar una coma después del último objeto.
- Usar testimonios sin autorización.
- Cambiar nombres de campos que JavaScript necesita para renderizar.
