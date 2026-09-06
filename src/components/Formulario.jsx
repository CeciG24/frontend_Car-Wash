import { apiFetch } from '../services/api';
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import "bootstrap/dist/css/bootstrap.min.css";


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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [servicesStatus, setServicesStatus] = useState("loading");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await apiFetch("/services");
        if (!response.ok) {
          throw new Error("Error al obtener servicios");
        }
        const data = await response.json();
        setServicios(data.Servicios || []); setServicesStatus("ready");
      } catch (error) {
        console.error("Error:", error); setServicesStatus("error");
      }
    };

    fetchServicios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!fecha || !servicio || !nombre.trim() || !numero.trim() || !direccion.trim()) {
      setError("Completa todos los campos para agendar tu cita.");
      return;
    }
    setLoading(true);
    setError("");
    
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
      const response = await apiFetch("/appointments", {
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
      setError("No pudimos agendar la cita. Intenta nuevamente; tus datos se conservaron.");
    } finally { setLoading(false); }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="booking-form-panel">
      <span className="eyebrow">RESERVA TU VISITA</span>
      <h2>Agendar cita</h2>
      <p className="form-intro">Completa tus datos para solicitar tu servicio.</p>
      {servicesStatus === "error" && <div className="form-notice" role="status">No pudimos cargar los servicios. Intenta recargar la página o llámanos al <a href="tel:2215568660">221 556 8660</a>.</div>}
      {servicesStatus === "ready" && !servicios.length && <div className="form-notice" role="status">No hay servicios disponibles para reservar por ahora.</div>}
      {error && <div className="form-notice" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="booking-fields">
        <fieldset disabled={loading}>
          <legend className="form-section-label">01 / TUS DATOS</legend>
          <div className="field-pair">
            <div><label htmlFor="nombre">Nombre completo</label><input id="nombre" className="form-control" autoComplete="name" placeholder="Ej. Juan Pérez" required value={nombre} onChange={e => setNombre(e.target.value)} /></div>
            <div><label htmlFor="numero">Número celular</label><input id="numero" type="tel" className="form-control" autoComplete="tel" placeholder="Ej. 2221234567" required value={numero} onChange={e => setNumero(e.target.value)} /></div>
          </div>
          <div className="form-section-label">02 / TU SERVICIO</div>
          <div><label htmlFor="servicio">Servicio</label><select id="servicio" className="form-select" required disabled={servicesStatus !== "ready"} value={servicio} onChange={e => setServicio(e.target.value)}><option value="">{servicesStatus === "loading" ? "Cargando servicios…" : "Selecciona un servicio"}</option>{servicios.map(s => <option key={s.id_servicio} value={s.id_servicio}>{s.nombre} - &#36;{s.precio}</option>)}</select></div>
          <div><label htmlFor="direccion">Dirección</label><textarea id="direccion" className="form-control" rows="2" autoComplete="street-address" placeholder="Calle, número, colonia y ciudad" required value={direccion} onChange={e => setDireccion(e.target.value)} /></div>
          <div><label htmlFor="fecha">Fecha y hora</label><DatePicker locale={es} timeCaption="Hora" id="fecha" selected={fecha} onChange={setFecha} minDate={new Date()} dateFormat="dd/MM/yyyy h:mm aa" showTimeSelect timeIntervals={60} className="form-control" placeholderText="Elige fecha y hora" required /></div>
          <button type="submit" className="action-button" disabled={loading || servicesStatus !== "ready" || !servicios.length}>{loading ? "Agendando…" : "Agendar cita ↗"}</button>
        </fieldset>
      </form>
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
