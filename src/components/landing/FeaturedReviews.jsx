import { apiFetch } from '../../services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function FeaturedReviews() {
const [reviews, setReviews] = useState([]);
const [status, setStatus] = useState('loading');
useEffect(() => { let active = true; apiFetch('/reviews').then(res => { if (!res.ok) throw new Error(); return res.json(); }).then(data => { if (active) { setReviews((data.Reseñas || []).sort((a,b) => b.calificacion-a.calificacion).slice(0,3)); setStatus('ready'); } }).catch(() => { if (active) setStatus('error'); }); return () => { active = false; }; }, []);
return <section className="section-space reviews-section"><div className="shell"><div className="section-heading"><div><span className="eyebrow">LA EXPERIENCIA LS 1713</span><h2>El mejor acabado.<br />Su confianza.</h2></div><Link className="text-link" to="/Reviews">Todas las reseñas ↗</Link></div><div className="review-grid">{reviews.map(review => { const rating = Math.max(0, Math.min(5, Number(review.calificacion) || 0)); return <article className="review-item" key={review.id}><span className="review-quote" aria-hidden="true">“</span><div className="review-stars" aria-label={`${rating} de 5 estrellas`}>{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</div><blockquote>{review.comentario}</blockquote><div className="review-author"><span>{review.nombre_cliente?.charAt(0).toUpperCase()}</span><strong>{review.nombre_cliente}</strong></div></article>; })}</div>{!reviews.length && <div className="data-message" role="status">{status === 'loading' ? 'Cargando experiencias…' : status === 'error' ? 'No pudimos cargar las reseñas. Intenta nuevamente más tarde.' : 'Tu experiencia puede ser la primera. Cuéntanos cómo nos fue.'}</div>}</div></section>;
}
