// Seleccionar todos los enlaces del navbar que apuntan a secciones con ID (empiezan con #)
document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
  
      // Obtener el ID del destino, por ejemplo "#inicio", "#servicios", etc.
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        // Ocultar todas las secciones
        document.querySelectorAll('section').forEach(sec => {
          sec.style.display = 'none';
        });
  
        // Mostrar solo la sección clickeada
        targetSection.style.display = 'block';
  
        // Hacer scroll suave hacia la sección
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  