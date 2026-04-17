document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupAjaxForms();
  loadGallery();
  loadFleetData();
  loadSocialData();
  loadRecentServicesGallery();
  loadTestimonialsData();
  updateCurrentYear();
});

function setupMobileNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (!navLinks.length || !navbarCollapse || !navbarToggler) {
    return;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const togglerVisible = window.getComputedStyle(navbarToggler).display !== "none";

      if (togglerVisible && navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });
}

function setupAjaxForms() {
  const forms = document.querySelectorAll("form[data-async-form]");

  forms.forEach((form) => {
    const targetId = form.dataset.messageTarget;
    const statusBox = targetId ? document.getElementById(targetId) : null;

    if (!statusBox) {
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector("button[type='submit']");
      const originalText = submitButton ? submitButton.textContent : "";
      const formData = new FormData(form);

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = form.dataset.sendingText || "Enviando...";
      }

      setFormMessage(statusBox, "", "");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("No se pudo enviar el formulario.");
        }

        form.reset();
        setFormMessage(
          statusBox,
          "is-success",
          form.dataset.successMessage || "Gracias. Tu información fue enviada correctamente."
        );
      } catch (error) {
        console.error(error);
        setFormMessage(
          statusBox,
          "is-error",
          form.dataset.errorMessage || "Ocurrió un problema al enviar el formulario."
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });
  });
}

function setFormMessage(element, statusClass, message) {
  element.className = "form-status";

  if (!message) {
    element.classList.add("d-none");
    element.textContent = "";
    return;
  }

  element.classList.remove("d-none");
  element.classList.add(statusClass);
  element.textContent = message;
}

async function loadGallery() {
  const inner = document.getElementById("galeriaCarouselInner");
  const indicators = document.getElementById("galeriaIndicadores");
  const thumbnails = document.getElementById("galeriaMiniaturas");
  const statusBox = document.getElementById("galeriaStatus");
  const carouselElement = document.getElementById("carruselGaleria");

  if (!inner || !indicators || !thumbnails || !statusBox || !carouselElement) {
    return;
  }

  try {
    const galleryItems = await fetchJson("assets/data/galeria.json");

    if (!Array.isArray(galleryItems) || !galleryItems.length) {
      throw new Error("La galería no tiene imágenes configuradas.");
    }

    renderGallery(galleryItems, {
      inner,
      indicators,
      thumbnails,
      carouselElement
    });
  } catch (error) {
    console.error(error);
    statusBox.textContent = "No fue posible cargar la galería en este momento.";
    statusBox.classList.remove("d-none");
  }
}

function renderGallery(items, elements) {
  const { inner, indicators, thumbnails, carouselElement } = elements;

  inner.innerHTML = "";
  indicators.innerHTML = "";
  thumbnails.innerHTML = "";

  items.forEach((item, index) => {
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#carruselGaleria");
    indicator.setAttribute("data-bs-slide-to", String(index));
    indicator.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);

    if (index === 0) {
      indicator.classList.add("active");
      indicator.setAttribute("aria-current", "true");
    }

    indicators.appendChild(indicator);

    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item gallery-slide${index === 0 ? " active" : ""}`;
    carouselItem.innerHTML = `
      <img
        src="${item.src}"
        alt="${item.alt}"
        ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
      />
      <div class="gallery-caption">
        <span class="gallery-caption-top">${item.categoria}</span>
        <h3>${item.titulo}</h3>
        <p>${item.descripcion}</p>
      </div>
    `;

    inner.appendChild(carouselItem);

    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = `gallery-thumb${index === 0 ? " is-active" : ""}`;
    thumb.setAttribute("data-index", String(index));
    thumb.setAttribute("data-bs-target", "#carruselGaleria");
    thumb.setAttribute("data-bs-slide-to", String(index));
    thumb.setAttribute("aria-label", `Ver ${item.titulo}`);
    thumb.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy" />`;
    thumbnails.appendChild(thumb);
  });

  carouselElement.addEventListener("slid.bs.carousel", (event) => {
    syncActiveThumbnail(event.to, thumbnails);
  });

  syncActiveThumbnail(0, thumbnails);
}

function syncActiveThumbnail(activeIndex, thumbnailsContainer) {
  const thumbs = thumbnailsContainer.querySelectorAll(".gallery-thumb");

  thumbs.forEach((thumb) => {
    const thumbIndex = Number(thumb.dataset.index);
    const isActive = thumbIndex === activeIndex;
    thumb.classList.toggle("is-active", isActive);

    if (isActive) {
      thumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  });
}

async function loadFleetData() {
  const companyPanel = document.getElementById("companyInfoPanel");
  const fleetGrid = document.getElementById("fleetGrid");
  const statusBox = document.getElementById("fleetStatus");

  if (!companyPanel || !fleetGrid || !statusBox) {
    return;
  }

  try {
    const fleetData = await fetchJson("assets/data/flota.json");
    renderCompanyPanel(fleetData.empresa, companyPanel);
    renderFleetCards(fleetData.vehiculos, fleetGrid);
  } catch (error) {
    console.error(error);
    showDataStatus(statusBox, "No fue posible cargar la información de la flota.");
  }
}

function renderCompanyPanel(company, container) {
  const phones = Array.isArray(company.telefonos)
    ? company.telefonos
        .map((phone) => `<li><a href="tel:+57${phone.replace(/\s+/g, "")}">${phone}</a></li>`)
        .join("")
    : "";

  container.innerHTML = `
    <div class="company-panel-card">
      <span class="section-tag section-tag-dark">Información empresarial</span>
      <h2>${company.nombre}</h2>
      <p>${company.descripcion}</p>

      <div class="company-data-grid">
        <article>
          <strong>NIT</strong>
          <span>${company.nit}</span>
        </article>
        <article>
          <strong>Operación principal</strong>
          <span>${company.operacion}</span>
        </article>
        <article>
          <strong>Cobertura</strong>
          <span>${company.cobertura}</span>
        </article>
        <article>
          <strong>Correo</strong>
          <span><a href="mailto:${company.correo}">${company.correo}</a></span>
        </article>
      </div>

      <div class="company-phone-list">
        <strong>Contacto directo</strong>
        <ul>${phones}</ul>
      </div>
    </div>
  `;
}

function renderFleetCards(items, container) {
  if (!Array.isArray(items) || !items.length) {
    container.innerHTML = `
      <article class="empty-state-card">
        <h3>La flota aún no tiene registros visibles</h3>
        <p>Agrega las grúas en <code>assets/data/flota.json</code> para publicarlas aquí.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <article class="fleet-card">
          <img src="${item.imagen}" alt="${item.alt}" loading="lazy" />
          <div class="fleet-card-body">
            <span class="fleet-badge">${item.tipo}</span>
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <ul class="fleet-meta">
              <li><strong>Uso:</strong> ${item.uso}</li>
              <li><strong>Capacidad:</strong> ${item.capacidad}</li>
              <li><strong>Disponibilidad:</strong> ${item.disponibilidad}</li>
            </ul>
          </div>
        </article>
      `
    )
    .join("");
}

async function loadSocialData() {
  const channelsGrid = document.getElementById("socialChannelsGrid");
  const statusBox = document.getElementById("socialStatus");

  if (!channelsGrid || !statusBox) {
    return;
  }

  try {
    const socialData = await fetchJson("assets/data/redes.json");
    renderSocialChannels(socialData.canales, channelsGrid);
  } catch (error) {
    console.error(error);
    showDataStatus(statusBox, "No fue posible cargar la información de redes sociales.");
  }
}

function renderSocialChannels(items, container) {
  if (!Array.isArray(items) || !items.length) {
    container.innerHTML = `
      <article class="empty-state-card">
        <h3>No hay redes configuradas todavía</h3>
        <p>Agrega los perfiles oficiales en <code>assets/data/redes.json</code>.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const action = item.url
        ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm">${item.cta}</a>`
        : `<span class="disabled-chip">Agrega el enlace oficial</span>`;

      return `
        <article class="social-card">
          <div class="social-card-header">
            <span class="social-icon"><i class="bi ${item.icono}"></i></span>
            <div>
              <h3>${item.plataforma}</h3>
              <p>${item.handle}</p>
            </div>
          </div>
          <p class="social-description">${item.descripcion}</p>
          <div class="social-meta">
            <span>${item.formato}</span>
            <span>${item.frecuencia}</span>
          </div>
          <div class="social-action">${action}</div>
        </article>
      `;
    })
    .join("");
}

function renderSocialHighlights(items, container) {
  if (!Array.isArray(items) || !items.length) {
    container.innerHTML = `
      <article class="empty-state-card">
        <h3>No hay publicaciones destacadas por ahora</h3>
        <p>Puedes agregarlas desde <code>assets/data/redes.json</code> con imagen, descripción y enlace.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const action = item.url
        ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-warning btn-sm">Ver publicación</a>`
        : `<span class="disabled-chip">Pendiente de enlazar</span>`;

      return `
        <article class="highlight-card">
          <img src="${item.thumbnail}" alt="${item.alt}" loading="lazy" />
          <div class="highlight-card-body">
            <span class="fleet-badge">${item.tipo}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            ${action}
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadRecentServicesGallery() {
  const grid = document.getElementById("recentServicesGrid");
  const statusBox = document.getElementById("recentServicesStatus");

  if (!grid || !statusBox) {
    return;
  }

  try {
    const items = await fetchJson("assets/data/servicios-recientes.json");
    renderRecentServices(items, grid);
  } catch (error) {
    console.error(error);
    showDataStatus(statusBox, "No fue posible cargar la galería de servicios recientes.");
  }
}

function renderRecentServices(items, container) {
  if (!Array.isArray(items) || !items.length) {
    container.innerHTML = `
      <article class="empty-state-card">
        <h3>No hay imágenes recientes publicadas</h3>
        <p>Agrega imágenes en <code>assets/servicios-recientes/</code> y registros en <code>assets/data/servicios-recientes.json</code>.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const imagePath = `assets/servicios-recientes/${item.nombre}`;

      return `
        <article class="recent-gallery-card">
          <div class="recent-gallery-media" style="--recent-service-bg: url('${imagePath}')">
            <img src="${imagePath}" alt="Servicio reciente ${item.numero} - ${item.nombre}" loading="lazy" />
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadTestimonialsData() {
  const summaryBox = document.getElementById("testimonialSummary");
  const testimonialGrid = document.getElementById("testimonialGrid");
  const statusBox = document.getElementById("testimonialStatus");

  if (!summaryBox || !testimonialGrid || !statusBox) {
    return;
  }

  try {
    const testimonialData = await fetchJson("assets/data/testimonios.json");
    renderTestimonialSummary(testimonialData.resumen, summaryBox);
    renderTestimonials(testimonialData.testimonios, testimonialGrid);
  } catch (error) {
    console.error(error);
    showDataStatus(statusBox, "No fue posible cargar las opiniones de clientes.");
  }
}

function renderTestimonialSummary(summary, container) {
  container.innerHTML = `
    <article class="summary-card">
      <span class="section-tag section-tag-dark">Satisfacción y mejora continua</span>
      <h2>${summary.titulo}</h2>
      <p>${summary.descripcion}</p>
      <div class="summary-metrics">
        <div>
          <strong>${summary.publicadas}</strong>
          <span>Opiniones publicadas</span>
        </div>
        <div>
          <strong>${summary.moderacion}</strong>
          <span>Publicación de comentarios</span>
        </div>
        <div>
          <strong>${summary.privacidad}</strong>
          <span>Privacidad del cliente</span>
        </div>
      </div>
    </article>
  `;
}

function renderTestimonials(items, container) {
  if (!Array.isArray(items) || !items.length) {
    container.innerHTML = `
      <article class="empty-state-card">
        <h3>Aún no hay opiniones publicadas</h3>
        <p>La estructura ya está lista. Cuando apruebes comentarios de clientes, podrás agregarlos en <code>assets/data/testimonios.json</code>.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <article class="testimonial-card">
          <div class="rating-stars">${renderStars(item.calificacion)}</div>
          <h3>${item.nombre}${item.empresa ? ` · ${item.empresa}` : ""}</h3>
          <span class="testimonial-city">${item.ciudad} · ${item.servicio}</span>
          <p>${item.comentario}</p>
        </article>
      `
    )
    .join("");
}

function renderStars(value) {
  const stars = [];

  for (let index = 1; index <= 5; index += 1) {
    stars.push(`<i class="bi ${index <= value ? "bi-star-fill" : "bi-star"}"></i>`);
  }

  return stars.join("");
}

function showDataStatus(element, message) {
  element.textContent = message;
  element.classList.remove("d-none");
}

async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path}`);
  }

  return response.json();
}

function updateCurrentYear() {
  const yearNodes = document.querySelectorAll("[data-current-year], #currentYear");

  yearNodes.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function formatDate(value) {
  const parsedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(parsedDate);
}
