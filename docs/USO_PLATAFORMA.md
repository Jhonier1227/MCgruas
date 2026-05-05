# Uso de la Plataforma

![Redes M&C Grúas](../assets/img/Redes_MCgruas.png)

Esta guía explica cómo se usa el sitio web de `M&C Grúas` desde el punto de vista del cliente y desde el equipo que administra la página.

## Objetivo del Sitio

El sitio busca que una persona pueda entender rápidamente qué servicio ofrece la empresa, en qué rutas opera y cómo solicitar una grúa por llamada, WhatsApp o formulario.

Rutas principales:

`Cali - Bogotá` | `Bogotá - Cali` | `Cali - Pasto` | `Pasto - Cali`

## Página Principal

Archivo: `index.html`

La home concentra la información más importante para convertir visitantes en clientes.

- Presenta el servicio de grúas 24/7.
- Muestra rutas principales y tipos de servicio.
- Explica qué datos debe enviar el cliente para agilizar la atención.
- Incluye galería visual de servicios.
- Permite contactar por llamada, WhatsApp o formulario.

## Flota y Empresa

Archivo: `flota.html`

Esta página sirve para reforzar confianza antes de contratar el servicio.

- Muestra datos empresariales.
- Presenta el NIT.
- Explica cobertura operativa.
- Lista vehículos o unidades de servicio.
- Permite mostrar capacidad para carros, camionetas, motos, maquinaria pesada o liviana y traslados especiales.

## Redes Sociales

Archivo: `redes.html`

Esta página reúne la presencia social de la marca y contenido visual reciente.

- Muestra TikTok, Instagram y Facebook.
- Integra el perfil oficial de TikTok.
- Presenta una galería de servicios recientes.
- Ayuda a que el cliente vea actividad real de la empresa.

## Experiencia del Cliente

Archivo: `experiencia.html`

Esta página permite recoger opiniones, calificaciones y sugerencias.

- El cliente califica el servicio recibido.
- Puede dejar una sugerencia de mejora.
- Puede autorizar que su opinión sea publicada.
- La página explica que la información se maneja con privacidad y seguridad.
- Los testimonios visibles se publican manualmente desde JSON.

## Formularios

Los formularios usan `Formspree` como servicio de envío.

- Formulario de contacto: ubicado en `index.html`.
- Formulario de satisfacción: ubicado en `experiencia.html`.
- Los mensajes llegan al correo configurado en Formspree.
- La web no publica automáticamente las opiniones recibidas.

## Contacto Rápido

El sitio tiene botones flotantes para móvil.

- `Llamar`: abre llamada telefónica.
- `WhatsApp`: abre conversación con mensaje inicial.

Estos botones son clave porque la mayoría de clientes entran desde celular y pueden necesitar ayuda urgente.

## Revisión Antes de Entregar al Cliente

- Abrir `index.html` en celular y revisar que no haya desplazamiento horizontal.
- Probar botones de llamada y WhatsApp.
- Probar el formulario de contacto.
- Probar el formulario de satisfacción.
- Revisar que las imágenes carguen correctamente.
- Confirmar que el logo nuevo esté visible en header, footer y favicon.
- Validar que las páginas `flota.html`, `redes.html` y `experiencia.html` tengan imagen lateral en el hero.

## Publicación

El sitio está pensado para publicarse como página estática en Hostinger.

Flujo recomendado:

1. Actualizar archivos localmente.
2. Validar cambios en navegador.
3. Subir cambios a GitHub.
4. Desplegar desde Hostinger o sincronizar el repositorio configurado.
5. Revisar `https://mycgruas.com/` después del despliegue.

## Buenas Prácticas

- Mantener textos claros y enfocados en clientes.
- No publicar información interna del proyecto en la página.
- No prometer rutas o servicios que la operación no pueda cubrir.
- Optimizar imágenes antes de subirlas.
- Publicar solo testimonios reales y autorizados.
