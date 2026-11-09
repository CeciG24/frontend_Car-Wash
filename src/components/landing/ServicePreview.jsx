import { apiFetch } from '../../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { homePhoto } from '../../data/sitePages';
import { FINAL_PRICE_NOTICE, STARTING_PRICE_LABEL, serviceDurationLabel, serviceVehicleLabel } from '../../data/serviceDetails';
export default function ServicesPreview() {
const [data, setData] = useState([]);
const [status, setStatus] = useState('loading');
useEffect(() => { let active = true; apiFetch('/services').then(res => { if (!res.ok) throw new Error(); return res.json(); }).then(json => { if (active) { setData(json.Servicios || []); setStatus('ready'); } }).catch(() => { if (active) setStatus('error'); }); return () => { active = false; }; }, []);
return <section className="section-space services-section"><div className="shell"><div className="section-heading"><div><span className="eyebrow">NUESTROS SERVICIOS</span><h2>Un cuidado a la altura<br />de tu auto.</h2></div><Link className="outline-button" to="/Services">Ver todos los servicios ↗</Link></div><div className="service-showcase"><img src={homePhoto} width={612} height={408} alt="Cuidado y pulido de pintura automotriz" loading="lazy" /><div className="service-caption"><span className="eyebrow">ACABADOS PROFESIONALES</span><h3>La diferencia está<br />en los detalles.</h3></div></div><div className="service-list">{data.slice(0, 3).map((item, index) => <Link to="/Services" className="service-item" key={item.id_servicio ?? item.id ?? index}><span className="eyebrow">0{index + 1}</span><h3>{item.nombre}</h3><small className="service-estimate">{serviceVehicleLabel(item.vehiculo)} · {serviceDurationLabel(item.duracion_minutos)}</small><span className="service-price">{STARTING_PRICE_LABEL} ${item.precio} <span>↗</span></span></Link>)}</div>{data.length > 0 && <p className="price-notice service-list-notice">{FINAL_PRICE_NOTICE}.</p>}{!data.length && <p className="data-message" role="status">{status === 'loading' ? 'Cargando servicios…' : status === 'error' ? 'No pudimos cargar los servicios. Contáctanos para conocer las opciones.' : 'Próximamente encontrarás aquí nuestros servicios.'}</p>}</div></section>;
}
