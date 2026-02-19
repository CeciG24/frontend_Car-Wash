import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [detalles, setDetalles] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!nombre.trim() || !numero.trim() || !detalles.trim()) {
      setMessage({ text: "Por favor completa todos los campos", type: "warning" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    const contactData = {
      nombre: nombre,
      numero: numero,
      detalles: detalles
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          text: "¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.", 
          type: "success" 
        });
        setNombre("");
        setNumero("");
        setDetalles("");
      } else {
        setMessage({ 
          text: result.error || "Error al enviar el mensaje", 
          type: "danger" 
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ 
        text: "Error de conexión. Por favor intenta nuevamente.", 
        type: "danger" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center text-center text-light px-4 py-2">
      <h2 className="mb-3 fs-2">Contáctanos</h2>
      <p className="mb-4 fs-5">
        Completa nuestro formulario de contacto para recibir más información sobre nuestros servicios de lavado de autos.
      </p>
      <div className="card-body p-4">
        {message.text && (
          <div 
            className={`alert alert-${message.type} alert-dismissible fade show`} 
            role="alert"
          >
            {message.text}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setMessage({ text: "", type: "" })}
            ></button>
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="numero" className="form-label">
              Número celular
            </label>
            <input
              type="tel"
              className="form-control"
              id="numero"
              placeholder="Ej. 2221234567"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="detalles" className="form-label">
              Detalles
            </label>
            <textarea
              className="form-control"
              id="detalles"
              rows="3"
              placeholder="Deja tu mensaje..."
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;