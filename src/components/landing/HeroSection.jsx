import { Link } from 'react-router-dom';
import auto from '../../assets/autoLimpio.jpg';
export default function HeroSection() {
return <section className="hero"><img className="hero-photo" src={auto} alt="Detallado profesional de la carrocería de un auto" fetchPriority="high" /><div className="hero-shade" /><div className="shell hero-content"><span className="eyebrow">LS 1713 / CAR DETAILING</span><h1>Tu auto.<br />Como nuevo.<br /><em>En cada detalle.</em></h1><p>Lavado profesional y cuidado premium.<br />En tu domicilio o en nuestras instalaciones.</p><div className="hero-actions"><Link className="action-button" to="/Booking">Agenda tu cita <span>↗</span></Link><Link className="text-link" to="/Services">Explorar servicios →</Link></div></div><div className="hero-bottom shell"><span>PASIÓN POR LOS AUTOS. PRECISIÓN EN EL CUIDADO.</span><a href="#beneficios">DESCUBRE LA DIFERENCIA ↓</a></div></section>;
}
