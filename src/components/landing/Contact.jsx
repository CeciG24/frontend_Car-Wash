import { apiFetch } from '../../services/api';
import { useState } from "react";

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
      const response = await apiFetch("/contacts", {
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
    <div className="contact-panel">
      <h2>Contáctanos</h2>
      <p>
        Completa nuestro formulario de contacto para recibir más información sobre nuestros servicios de lavado de autos.
      </p>
        {message.text && (
          <div
            className={`form-notice contact-message contact-message-${message.type}`}
            role="alert"
          >
            {message.text}
            <button
              type="button"
              className="contact-message-close" aria-label="Cerrar aviso"
              onClick={() => setMessage({ text: "", type: "" })}
            >×</button>
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">
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

          <div>
            <label htmlFor="numero">
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

          <div>
            <label htmlFor="detalles">
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

          <button type="submit" className="action-button" disabled={loading}>
            {loading ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
    </div>
  );
}

export default Contact;
