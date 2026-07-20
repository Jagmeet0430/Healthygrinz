const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const appointmentForm = document.querySelector("#appointment-form");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(appointmentForm);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const concern = String(data.get("concern") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone || !concern) {
      appointmentForm.reportValidity();
      return;
    }

    const whatsappMessage = [
      "Hello Healthy Grins, I want to book a dental appointment.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Concern: ${concern}`,
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/919821127942?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
