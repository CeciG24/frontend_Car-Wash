import { useEffect, useState } from 'react';
import { apiRequest } from '../../services/api';
import { getPortfolioItems } from '../../services/portfolioData';
import { getPortfolioMedia } from '../../services/portfolioMedia';

function PortfolioCard({ item }) {
  const media = getPortfolioMedia(item.url);
  const title = item.carro || 'Trabajo de detailing';
  return (
    <article className="tiktok-card">
      <div className="tiktok-card-heading">
        <span className="eyebrow">{media.type === 'tiktok' ? 'EN TIKTOK / LS 1713' : 'PORTAFOLIO / LS 1713'}</span>
        <h3>{title}</h3>
        <p className="performed-service"><span>SERVICIO REALIZADO</span>{item.servicio || 'Cuidado automotriz'}</p>
      </div>
      <div className="tiktok-video">
        {media.type === 'tiktok' ? (
          <iframe src={media.embed} title={`${title} — ${item.servicio || 'Detailing'} en TikTok`} loading="lazy" allow="fullscreen" allowFullScreen />
        ) : media.type === 'video' ? (
          <video controls playsInline preload="metadata" aria-label={`Video de ${title}`}><source src={media.url} />Tu navegador no puede reproducir este video.</video>
        ) : (
          <div className="video-unavailable"><span aria-hidden="true">▷</span><p>{media.type === 'link' ? 'Mira este trabajo en TikTok.' : 'Video no disponible por ahora.'}</p>{media.url && <a className="outline-button" href={media.url} target="_blank" rel="noopener noreferrer">Abrir TikTok ↗</a>}</div>
        )}
      </div>
      <div className="tiktok-card-footer">
        {item.descripcion && <p>{item.descripcion}</p>}
        {media.url && <a className="text-link" href={media.url} target="_blank" rel="noopener noreferrer">{media.type === 'video' ? 'Abrir video' : 'Ver en TikTok'} ↗</a>}
      </div>
    </article>
  );
}

export default function PortfolioGrid({ limit }) {
  const useJson = import.meta.env.VITE_PORTFOLIO_SOURCE === 'json';
  const [items, setItems] = useState(() => useJson ? getPortfolioItems() : []);
  const [status, setStatus] = useState(useJson ? 'ready' : 'loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (useJson) return;
    const controller = new AbortController();
    apiRequest('/portfolio', { signal: controller.signal })
      .then(data => {
        setItems((data.Servicios || []).map(item => ({ ...item, id: item.id_servicio })));
        setStatus('ready');
      })
      .catch(error => { if (error.name !== 'AbortError') setStatus('error'); });
    return () => controller.abort();
  }, [useJson, attempt]);
  if (status === 'loading') return <div className="portfolio-loading" role="status">Cargando nuestros trabajos…</div>;
  if (status === 'error') return <div className="portfolio-empty" role="status"><h3>No pudimos cargar los videos.</h3><button className="outline-button" onClick={() => { setStatus('loading'); setAttempt(value => value + 1); }}>Volver a intentar</button></div>;
  if (!items.length) return (
    <div className="portfolio-empty">
      <span className="empty-symbol" aria-hidden="true">▷</span>
      <h3>Nuestros próximos trabajos, en primer plano.</h3>
      <p>Aquí encontrarás cada carro, el servicio realizado y su video.</p>
      <div><a className="outline-button" href="https://www.tiktok.com/@ls.1713" target="_blank" rel="noopener noreferrer">Visitar @ls.1713 ↗</a></div>
    </div>
  );
  return <div className="tiktok-grid">{items.slice(0, limit ?? items.length).map(item => <PortfolioCard key={item.id} item={item} />)}</div>;
}

