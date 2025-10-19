import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Formulario() {
  const [fecha, setFecha] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fecha seleccionada:", fecha);
    // Aquí mandas la fecha al backend
  };

  return (
    <div className="container mt-5">
      {/* Tarjeta con fondo semi-transparente para mejor contraste */}
      <div className="card shadow-lg border-0 text-light" style={{ 
        backgroundColor: 'rgba(24, 24, 24, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4 text-light">
            Agendar Cita
          </h2>
          
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

            {/* Numero de celular */}
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

            {/* Selección de servicio*/}
            <div className="mb-3">
              <label htmlFor="servicio" className="form-label">
                Servicio
              </label>
              <select className="form-select" id="servicio" required>
                <option value="" disabled>
                  Selecciona el servicio requerido
                </option>
                <option value="lavado">Lavado de auto express</option>
                <option value="emergencia">Lavado basico</option>
                <option value="especialista">Lavado premium</option>
              </select>
            </div>
        
            {/* Direccion */}
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <textarea
                className="form-control"
                id="direccion"
                rows="3"
                placeholder="Escribe tu dirección completa..."
                required
              ></textarea>
            </div>
            
            {/* Selector de fecha */}
            <div className="mb-4">
              <label className="form-label">Selecciona fecha y hora  </label>
              <DatePicker
                selected={fecha}
                onChange={(date) => setFecha(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeSelect
                timeIntervals={60}
                className="form-control"
                placeholderText="Elige fecha y hora"
                required
              />
            </div>

            {/* Botón */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Agendar cita
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formulario;