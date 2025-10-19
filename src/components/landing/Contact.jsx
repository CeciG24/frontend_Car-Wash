import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {

  const handleSubmit = (event) => {
    event.preventDefault(); // evita que se recargue la página
    alert("Formulario enviado correctamente ✅");
  };

  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center text-center text-light px-4 py-2">
      <h2 className="mb-3 fs-2">Contáctanos</h2>
      <p className="mb-4 fs-5">
        Completa nuestro formulario de contacto para recibir más información sobre nuestros servicios de lavado de autos.
      </p>
      <div className="card-body p-4">

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>

          {/* Número de celular */}
          <div className="mb-3">
            <label htmlFor="numero" className="form-label">
              Número celular
            </label>
            <input
              type="tel"
              className="form-control"
              id="numero"
              placeholder="Ej. 2221234567"
              required
            />
          </div>

          {/* Detalles */}
          <div className="mb-3">
            <label htmlFor="detalles" className="form-label">
              Detalles
            </label>
            <textarea
              className="form-control"
              id="detalles"
              rows="3"
              placeholder="Deja tu mensaje..."
              required
            ></textarea>
          </div>

          {/* Botón */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg w-100">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;