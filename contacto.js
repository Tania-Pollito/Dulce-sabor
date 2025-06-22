document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (!form) {
    alert("No se encontró el formulario");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const mensaje = document.createElement("div");
    mensaje.className = "mensaje-confirmacion";
    mensaje.innerHTML = `
      <p>¡Nos pondremos en contacto contigo!</p>
      <button id="btn-ok">OK</button>
    `;

    document.body.appendChild(mensaje);

    document.getElementById("btn-ok").addEventListener("click", function () {
      form.reset();
      document.body.removeChild(mensaje);
    });
  });
});


