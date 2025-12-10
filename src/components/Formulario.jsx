import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";

// Intenta establecer el app element, con fallback
if (typeof document !== 'undefined') {
  const appElement = document.getElementById('root') || document.body;
  Modal.setAppElement(appElement);
}

// Estilos mejorados para el modal
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #0a0f24, #112b61)',
    border: 'none',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 0 30px rgba(0, 123, 255, 0.5)',
  },
};

function Formulario() {
  const [fecha, setFecha] = useState(null);
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [direccion, setDireccion] = useState("");
  const [servicio, setServicio] = useState("");
  const [servicios, setServicios] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/services");
        if (!response.ok) {
          throw new Error("Error al obtener servicios");
        }
        const data = await response.json();
        setServicios(data.Servicios);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchServicios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Encuentra el nombre del servicio seleccionado
    const servicioSeleccionado = servicios.find(s => s.id_servicio === parseInt(servicio));
    
    const appointmentData = {
      name: nombre,
      numero_whatsapp: numero,
      direccion: direccion,
      scheduled_date: fecha,
      id_service: servicio,
      servicio_nombre: servicioSeleccionado ? `${servicioSeleccionado.nombre} - $${servicioSeleccionado.precio}` : servicio
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        setAppointmentData(appointmentData);
        setModalIsOpen(true);
        console.log(result.message);
        
        // Limpiar formulario
        setNombre("");
        setNumero("");
        setDireccion("");
        setServicio("");
        setFecha(null);
      } else {
        throw new Error("Error en la creación de la cita");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al agendar la cita. Por favor intenta nuevamente.");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className="min-vh-100 text-light"
      style={{
        background: "linear-gradient(135deg, #0a0f24, #112b61, #0f4c81)",
      }}
    >
      <div className="container mt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-lg text-light"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <h2 className="card-title text-center fw-bold mb-4">
                  Agendar Cita
                </h2>
                
                <div className="contact-form">
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
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#fff"
                      }}
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
                      required
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#fff"
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="servicio" className="form-label">
                      Servicio
                    </label>
                    <select 
                      className="form-select" 
                      id="servicio" 
                      required
                      value={servicio}
                      onChange={(e) => setServicio(e.target.value)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#fff"
                      }}
                    >
                      <option value="" disabled>
                        Selecciona el servicio requerido
                      </option>
                      {servicios.map((s) => (
                        <option key={s.id_servicio} value={s.id_servicio} style={{ color: "#000" }}>
                          {s.nombre} - ${s.precio}
                        </option>
                      ))}
                    </select>
                  </div>
              
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
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#fff"
                      }}
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Selecciona fecha y hora</label>
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
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#fff"
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={handleSubmit}
                      className="btn btn-primary btn-lg w-100"
                      style={{
                        backgroundColor: "rgba(0, 123, 255, 0.8)",
                        border: "none",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(0, 123, 255, 1)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(0, 123, 255, 0.8)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Agendar cita
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        contentLabel="Cita Agendada"
        style={customStyles}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ 
            fontSize: '48px', 
            color: '#28a745',
            marginBottom: '20px'
          }}>
            ✓
          </div>
          <h2 style={{ 
            color: '#fff', 
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            ¡Cita Agendada Exitosamente!
          </h2>
          
          {appointmentData && (
            <div style={{ 
              textAlign: 'left', 
              marginBottom: '25px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ marginBottom: '10px', color: '#fff' }}>
                <strong>Nombre:</strong> {appointmentData.name}
              </p>
              <p style={{ marginBottom: '10px', color: '#fff' }}>
                <strong>Número:</strong> {appointmentData.numero_whatsapp}
              </p>
              <p style={{ marginBottom: '10px', color: '#fff' }}>
                <strong>Dirección:</strong> {appointmentData.direccion}
              </p>
              <p style={{ marginBottom: '10px', color: '#fff' }}>
                <strong>Fecha y Hora:</strong> {appointmentData.scheduled_date ? new Date(appointmentData.scheduled_date).toLocaleString('es-MX', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }) : ''}
              </p>
              <p style={{ marginBottom: '0', color: '#fff' }}>
                <strong>Servicio:</strong> {appointmentData.servicio_nombre}
              </p>
            </div>
          )}
          
          <button 
            onClick={closeModal}
            style={{
              backgroundColor: 'rgba(0, 123, 255, 0.8)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              width: '100%'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 123, 255, 1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Formulario;