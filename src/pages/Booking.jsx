import PageLayout from '../components/common/PageLayout';
import Formulario from '../components/Formulario';
import auto from '../assets/autoLimpio.jpg';
import { WHATSAPP_URL } from '../data/contact';

export default function Booking() {
  return (
    <PageLayout eyebrow="RESERVAS" title="Dale a tu auto su mejor versión." description="Elige tu servicio y el momento ideal. Nosotros cuidamos cada detalle.">
      <div className="booking-layout">
        <aside className="booking-aside">
          <img src={auto} alt="Detallado de la pintura de un auto" />
          <div className="aside-content">
            <span className="eyebrow">TU PRÓXIMA VISITA</span>
            <h2>Buen cuidado.<br />Desde el primer paso.</h2>
            <ul className="care-list"><li>Elige tu vehículo y el servicio</li><li>Selecciona la fecha y la hora</li><li>Recibe tu folio por correo</li></ul>
            <a className="text-link" href={WHATSAPP_URL}>¿Tienes dudas? WhatsApp 221 556 8660 ↗</a>
          </div>
        </aside>
        <Formulario />
      </div>
    </PageLayout>
  );
}

