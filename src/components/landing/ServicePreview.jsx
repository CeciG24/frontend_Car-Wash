import { apiFetch } from '../../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import auto from '../../assets/autoLimpio.jpg';
export default function ServicesPreview() {
const [data, setData] = useState([]);
const [status, setStatus] = useState('loading');
useEffect(() => { let active = true; apiFetch('/services').then(res => { if (!res.ok) throw new Error(); return res.json(); }).then(json => { if (active) { setData(json.Servicios || []); setStatus('ready'); } }).catch(() => { if (active) setStatus('error'); }); return () => { active = false; }; }, []);
return <section className="section-space services-section"><div className="shell"><div className="section-heading"><div><span className="eyebrow">NUESTROS SERVICIOS</span><h2>Un cuidado a la altura<br />de tu auto.</h2></div><Link className="outline-button" to="/Services">Ver todos los servicios ↗</Link></div><div className="service-showcase"><img src={auto} alt="Cuidado y pulido de pintura automotriz" loading="lazy" /><div className="service-caption"><span className="eyebrow">ACABADOS PROFESIONALES</span><h3>La diferencia está<br />en los detalles.</h3></div></div><div className="service-list">{data.slice(0, 3).map((item, index) => <Link to="/Services" className="service-item" key={item.id ?? index}><span className="eyebrow">0{index + 1}</span><h3>{item.nombre}</h3><span className="service-price">${item.precio} <span>↗</span></span></Link>)}</div>{!data.length && <p className="data-message" role="status">{status === 'loading' ? 'Cargando servicios…' : status === 'error' ? 'No pudimos cargar los servicios. Contáctanos para conocer nuestros paquetes.' : 'Próximamente encontrarás aquí nuestros paquetes.'}</p>}</div></section>;
}
