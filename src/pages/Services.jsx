import { apiFetch } from '../services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/common/PageLayout';
import { WHATSAPP_URL } from '../data/contact';
import { FINAL_PRICE_NOTICE, STARTING_PRICE_LABEL, serviceCategoryLabel, serviceDurationLabel, serviceVehicleLabel } from '../data/serviceDetails';

const uncategorized = 'Sin categoría';

export default function Services() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('loading');
  const [descriptions, setDescriptions] = useState({});
  const [expanded, setExpanded] = useState({});
  const [vehicle, setVehicle] = useState('');
  const [category, setCategory] = useState('');

  const vehicles = [...new Set(data.map(item => item.vehiculo).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
  const categories = [...new Set(data.map(item => item.categoria || uncategorized))].sort((a, b) => a.localeCompare(b, 'es'));
  const results = data.filter(item => (
    (!vehicle || !item.vehiculo || item.vehiculo === vehicle) &&
    (!category || (item.categoria || uncategorized) === category)
  ));

  function clearFilters() {
    setVehicle('');
    setCategory('');
  }

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
      {data.length > 0 && (
        <>
          <div className="catalog-filters" role="group" aria-label="Filtrar servicios">
            <div>
              <label htmlFor="catalog-vehicle">Vehículo</label>
              <select id="catalog-vehicle" className="form-select" value={vehicle} onChange={event => setVehicle(event.target.value)}>
                <option value="">Todos los vehículos</option>
                {vehicles.map(option => <option key={option} value={option}>{serviceVehicleLabel(option)}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="catalog-category">Categoría</label>
              <select id="catalog-category" className="form-select" value={category} onChange={event => setCategory(event.target.value)}>
                <option value="">Todas las categorías</option>
                {categories.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <button className="outline-button" type="button" disabled={!vehicle && !category} onClick={clearFilters}>Limpiar filtros</button>
          </div>
          <div className="catalog-context">
            <p role="status">{results.length} {results.length === 1 ? 'servicio' : 'servicios'}</p>
            <p className="price-notice">{FINAL_PRICE_NOTICE}.</p>
          </div>
        </>
      )}
      <div className="catalog-grid">
        {results.map((item, index) => {
          const id = item.id_servicio ?? item.id;
          return <article className="catalog-card" key={id}>
            <span className="catalog-number">{String(index + 1).padStart(2, '0')} / {serviceCategoryLabel(item)}</span>
            <h2>{item.nombre}</h2>
            <span className="catalog-vehicle">{serviceVehicleLabel(item.vehiculo)}</span>
            <div className="catalog-price">
              <span className="price-prefix">{STARTING_PRICE_LABEL}</span>
              <strong><span>$</span>{item.precio}</strong>
            </div>
            <p>{serviceDurationLabel(item.duracion_minutos)}</p>
            <button className="detail-toggle" aria-expanded={!!expanded[id]} aria-controls={`detail-${id}`} onClick={() => toggle(id)}>Detalles del servicio <span>{expanded[id] ? '−' : '+'}</span></button>
            {expanded[id] && <p id={`detail-${id}`} className="service-description" role="status">{descriptions[id]}</p>}
            <Link className="action-button" to="/Booking">Reservar este servicio ↗</Link>
          </article>;
        })}
      </div>
      {data.length > 0 && results.length === 0 && (
        <div className="empty-panel">
          <h2>No hay servicios con estos filtros</h2>
          <p>Prueba con otro vehículo o categoría.</p>
        </div>
      )}
      {!data.length && <div className="empty-panel" role="status"><span className="empty-symbol">✧</span><h2>{status === 'loading' ? 'Preparando nuestros servicios' : status === 'error' ? 'El catálogo no está disponible por ahora' : 'Estamos preparando el catálogo'}</h2><p>{status === 'error' ? 'Escríbenos por WhatsApp para conocer las opciones de cuidado para tu auto.' : 'Aquí encontrarás los servicios y sus precios.'}</p><a className="outline-button" href={WHATSAPP_URL}>Consultar por WhatsApp ↗</a></div>}
      <div className="page-callout"><div><span className="eyebrow">ATENCIÓN PERSONALIZADA</span><h2>¿No sabes por dónde empezar?</h2><p>Cuéntanos qué necesita tu auto y te ayudamos a elegir.</p></div><a className="action-button" href={WHATSAPP_URL}>Hablemos por WhatsApp ↗</a></div>
    </PageLayout>
  );
}
