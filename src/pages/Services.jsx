import { apiFetch } from '../services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/common/PageLayout';

export default function Services() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('loading');
  const [descriptions, setDescriptions] = useState({});
  const [expanded, setExpanded] = useState({});
  useEffect(() => {
    let active = true;
    apiFetch('/services')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => { if (active) { setData(json.Servicios || []); setStatus('ready'); } })
      .catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, []);
  async function toggle(id) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    if (descriptions[id]) return;
    setDescriptions(prev => ({ ...prev, [id]: 'Cargando detalles…' }));
    try {
      const res = await apiFetch(`/services/descriptions/${id}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setDescriptions(prev => ({ ...prev, [id]: json.Descripcion?.descripcion || 'Consulta con nosotros los detalles de este servicio.' }));
    } catch {
      setDescriptions(prev => ({ ...prev, [id]: 'No pudimos cargar los detalles. Contáctanos para obtener más información.' }));
    }
  }
  return (
    <PageLayout eyebrow="SERVICIOS" title="El cuidado que tu auto merece." description="Explora nuestros servicios y encuentra el tratamiento ideal para cada detalle.">
      <div className="catalog-grid">
        {data.map((item, index) => {
          const id = item.id_servicio ?? item.id;
          return <article className="catalog-card" key={id}>
            <span className="catalog-number">0{index + 1} / DETAILING</span>
            <h2>{item.nombre}</h2>
            <div className="catalog-price"><span>$</span>{item.precio}</div>
            <p>Cuidado profesional y atención en cada detalle de tu auto.</p>
            <button className="detail-toggle" aria-expanded={!!expanded[id]} aria-controls={`detail-${id}`} onClick={() => toggle(id)}>Detalles del servicio <span>{expanded[id] ? '−' : '+'}</span></button>
            {expanded[id] && <p id={`detail-${id}`} className="service-description" role="status">{descriptions[id]}</p>}
            <Link className="action-button" to="/Booking">Reservar este servicio ↗</Link>
          </article>;
        })}
      </div>
      {!data.length && <div className="empty-panel" role="status"><span className="empty-symbol">✧</span><h2>{status === 'loading' ? 'Preparando nuestros servicios' : status === 'error' ? 'El catálogo no está disponible por ahora' : 'Estamos preparando nuestros paquetes'}</h2><p>{status === 'error' ? 'Puedes llamarnos para conocer las opciones de cuidado para tu auto.' : 'Aquí encontrarás los servicios y sus precios.'}</p><a className="outline-button" href="tel:2215568660">Consultar servicios ↗</a></div>}
      <div className="page-callout"><div><span className="eyebrow">ATENCIÓN PERSONALIZADA</span><h2>¿No sabes por dónde empezar?</h2><p>Cuéntanos qué necesita tu auto y te ayudamos a elegir.</p></div><a className="action-button" href="tel:2215568660">Hablemos ↗</a></div>
    </PageLayout>
  );
}
