import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import carIcon from 'bootstrap-icons/icons/car-front.svg';
import scooterIcon from 'bootstrap-icons/icons/scooter.svg';
import suvIcon from 'bootstrap-icons/icons/truck-front.svg';
import pickupIcon from 'bootstrap-icons/icons/truck.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { WHATSAPP_URL } from '../data/contact';
import { createBooking, getServices } from '../services/api';

const vehicles = [
  { value: 'Moto', label: 'Moto', icon: scooterIcon },
  { value: 'Auto', label: 'Auto', icon: carIcon },
  { value: 'SUV', label: 'SUV', icon: suvIcon },
  { value: 'SUV Grande', label: 'SUV grande', icon: suvIcon },
  { value: 'Pickup', label: 'Pickup', icon: pickupIcon },
  { value: 'Pickup grande', label: 'Pickup grande', icon: pickupIcon },
];

const steps = ['Vehículo', 'Servicio', 'Datos y fecha'];
const emptyDetails = { name: '', numero_whatsapp: '', email: '', direccion: '' };
const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export default function Formulario() {
  const [step, setStep] = useState(0);
  const [vehicle, setVehicle] = useState(null);
  const [service, setService] = useState(null);
  const [catalog, setCatalog] = useState({ status: 'loading', services: [] });
  const [catalogAttempt, setCatalogAttempt] = useState(0);
  const [details, setDetails] = useState(emptyDetails);
  const [date, setDate] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const heading = useRef(null);
  const focusHeading = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    getServices({ signal: controller.signal })
      .then(data => setCatalog({ status: 'ready', services: data.Servicios || [] }))
      .catch(() => {
        if (!controller.signal.aborted) setCatalog({ status: 'error', services: [] });
      });
    return () => controller.abort();
  }, [catalogAttempt]);

  useEffect(() => {
    if (focusHeading.current) {
      heading.current?.focus();
      focusHeading.current = false;
    }
  }, [step]);

  const availableServices = catalog.services.filter(item => !item.vehiculo || item.vehiculo === vehicle?.value);

  function goTo(nextStep) {
    setError('');
    focusHeading.current = true;
    setStep(nextStep);
  }

  function selectVehicle(option) {
    if (vehicle?.value !== option.value) setService(null);
    setVehicle(option);
    goTo(1);
  }

  function selectService(item) {
    setService(item);
    goTo(2);
  }

  function updateDetails(event) {
    const { name, value } = event.target;
    setDetails(current => ({ ...current, [name]: value }));
  }

  function retryCatalog() {
    setCatalog({ status: 'loading', services: [] });
    setCatalogAttempt(attempt => attempt + 1);
  }

  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    if (!date || date <= new Date()) {
      setError('Elige una fecha y hora futuras.');
      return;
    }
    if (Object.values(details).some(value => !value.trim())) {
      setError('Completa todos los campos para solicitar tu cita.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const result = await createBooking({
        ...details,
        email: details.email.trim(),
        scheduled_date: date.toISOString(),
        id_service: service.id_servicio,
        vehiculo: vehicle.value,
      });
      setReceipt(result);
      goTo(steps.length);
    } catch (error) {
      if (error.code === 'appointment_slot_taken') {
        setDate(null);
        setError('Ese horario acaba de ocuparse. Elige otra fecha u hora. Tus datos siguen aquí.');
      } else {
        setError('No pudimos registrar la cita. Intenta de nuevo. Tus datos siguen aquí.');
      }
    } finally {
      setSaving(false);
    }
  }

  function restart() {
    setVehicle(null);
    setService(null);
    setDetails(emptyDetails);
    setDate(null);
    setReceipt(null);
    goTo(0);
  }

  return (
    <section className="booking-form-panel" aria-labelledby="booking-step-title">
      {step < steps.length && (
        <ol className="booking-progress" aria-label="Pasos de la reserva">
          {steps.map((label, index) => (
            <li key={label} aria-current={index === step ? 'step' : undefined}>
              <span aria-hidden="true">{index < step ? '✓' : index + 1}</span>{label}
            </li>
          ))}
        </ol>
      )}

      {step === 0 && (
        <>
          <h2 id="booking-step-title" ref={heading} tabIndex={-1}>¿Qué vehículo tienes?</h2>
          <p className="form-intro">Selecciona tu tipo de vehículo para ver los servicios disponibles.</p>
          <div className="booking-vehicles">
            {vehicles.map(option => (
              <button className="booking-vehicle" type="button" key={option.value} onClick={() => selectVehicle(option)}>
                <img src={option.icon} alt="" />
                <span>{option.label}</span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 id="booking-step-title" ref={heading} tabIndex={-1}>Elige un servicio</h2>
          <p className="form-intro">Opciones disponibles para <strong>{vehicle.label}</strong>.</p>
          {catalog.status === 'loading' && <p className="form-notice" role="status">Cargando servicios…</p>}
          {catalog.status === 'error' && (
            <p className="form-notice" role="status">No pudimos cargar los servicios. <button className="booking-text-button" type="button" onClick={retryCatalog}>Reintentar</button></p>
          )}
          {catalog.status === 'ready' && availableServices.length === 0 && (
            <p className="form-notice" role="status">Por ahora no hay servicios para este vehículo. <a href={WHATSAPP_URL}>Consúltanos por WhatsApp</a>.</p>
          )}
          <div className="booking-services">
            {availableServices.map(item => (
              <article className="booking-service" key={item.id_servicio}>
                <span className="eyebrow">{item.tipo === 'Basico' ? 'Básico' : item.tipo}</span>
                <h3>{item.nombre}</h3>
                <p>{currency.format(item.precio)} <small>MXN</small></p>
                <button className="outline-button" type="button" aria-label={'Elegir servicio ' + item.nombre} onClick={() => selectService(item)}>
                  Elegir servicio <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
          <button className="booking-text-button booking-back" type="button" onClick={() => goTo(0)}>← Cambiar vehículo</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 id="booking-step-title" ref={heading} tabIndex={-1}>Completa tu reserva</h2>
          <p className="form-intro">Elige cuándo quieres tu cita y déjanos tus datos.</p>
          <div className="booking-summary">
            <div><span>{vehicle.label}</span><strong>{service.nombre}</strong></div>
            <strong>{currency.format(service.precio)} MXN</strong>
          </div>
          <form className="booking-fields" onSubmit={submit}>
            <fieldset disabled={saving}>
              <div className="field-pair">
                <div>
                  <label htmlFor="booking-name">Nombre completo</label>
                  <input id="booking-name" className="form-control" name="name" autoComplete="name" maxLength={100} required value={details.name} onChange={updateDetails} />
                </div>
                <div>
                  <label htmlFor="booking-phone">Número de WhatsApp</label>
                  <input id="booking-phone" className="form-control" name="numero_whatsapp" type="tel" autoComplete="tel" maxLength={100} required value={details.numero_whatsapp} onChange={updateDetails} />
                </div>
              </div>
              <div>
                <label htmlFor="booking-email">Correo electrónico</label>
                <input id="booking-email" className="form-control" name="email" type="email" autoComplete="email" aria-describedby="booking-email-help" maxLength={254} pattern={'[^@\\s]+@[^@\\s]+\\.[^@\\s]+'} required value={details.email} onChange={updateDetails} />
                <small id="booking-email-help" className="booking-help">Aquí recibirás el folio y los detalles de tu solicitud.</small>
              </div>
              <div>
                <label htmlFor="booking-address">Dirección</label>
                <textarea id="booking-address" className="form-control" name="direccion" autoComplete="street-address" placeholder="Calle, número, colonia y ciudad" maxLength={100} rows={2} required value={details.direccion} onChange={updateDetails} />
              </div>
              <div>
                <label htmlFor="booking-date">Fecha y hora</label>
                <DatePicker id="booking-date" locale={es} timeCaption="Hora" selected={date} onChange={setDate} minDate={new Date()} dateFormat="dd/MM/yyyy h:mm aa" showTimeSelect timeIntervals={60} className="form-control" placeholderText="Elige fecha y hora" required />
              </div>
              {error && <p className="form-notice" role="alert">{error}</p>}
              <button className="action-button" type="submit">{saving ? 'Registrando cita…' : 'Solicitar cita ↗'}</button>
              <button className="booking-text-button booking-back" type="button" onClick={() => goTo(1)}>← Cambiar servicio</button>
            </fieldset>
          </form>
        </>
      )}

      {receipt && (
        <>
          <span className="booking-success-icon" aria-hidden="true">✓</span>
          <h2 id="booking-step-title" ref={heading} tabIndex={-1}>Recibimos tu solicitud</h2>
          <p className="form-intro">Tu cita quedó pendiente. Guarda el folio para cualquier consulta.</p>
          <dl className="booking-receipt">
            <div><dt>Folio</dt><dd>#{receipt.id_appointment}</dd></div>
            <div><dt>Vehículo</dt><dd>{vehicle.label}</dd></div>
            <div><dt>Servicio</dt><dd>{service.nombre}</dd></div>
            <div><dt>Fecha solicitada</dt><dd>{date.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}</dd></div>
          </dl>
          {receipt.confirmation_email_sent ? (
            <p className="form-intro">Enviamos los detalles a <strong>{details.email.trim()}</strong>.</p>
          ) : (
            <p className="form-notice">No pudimos enviar el correo. Si necesitas ayuda con tu folio, <a href={WHATSAPP_URL}>escríbenos por WhatsApp</a>.</p>
          )}
          <button className="outline-button" type="button" onClick={restart}>Agendar otra cita ↗</button>
        </>
      )}
    </section>
  );
}
