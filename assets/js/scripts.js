
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Verifica si el menú está visible (modo móvil)
      if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
        navbarToggler.click(); // Esto simula el click y cierra el menú
      }
    });
  });
});


// Bloquear clic derecho en toda la página
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Bloquear arrastrar imágenes
document.querySelectorAll('img').forEach(img => {
  img.setAttribute('draggable', 'false');
  img.addEventListener('dragstart', e => e.preventDefault());
});

// Bloquear selección de texto

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formularioContacto");
  const mensajeExito = document.getElementById("mensajeExito");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mrbprrvj", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        mensajeExito.classList.remove("d-none");
      } else {
        alert("❌ Ocurrió un error al enviar el formulario.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error al conectar con el servidor.");
    }
  });
});