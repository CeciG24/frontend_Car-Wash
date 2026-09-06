import { apiFetch } from '../services/api';
import { useState, useEffect } from 'react';
import PageLayout from '../components/common/PageLayout';

export default function Reviews() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('loading');
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  async function fetchReviews() {
    try {
      const res = await apiFetch('/reviews');
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json.Reseñas || []);
      setStatus('ready');
    } catch { setStatus('error'); }
  }
  useEffect(() => { fetchReviews(); }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    if (!nombre.trim() || !comentario.trim()) { setMessage('Completa tu nombre y comentario.'); return; }
    setLoading(true);
    setMessage('');
    try {
      const res = await apiFetch('/reviews', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_cliente: nombre, comentario, calificacion })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'No pudimos enviar tu reseña.');
      setMessage('¡Gracias! Tu reseña se envió correctamente.');
      setNombre(''); setComentario(''); setCalificacion(5);
      fetchReviews();
    } catch (error) { setMessage(error.message === 'Failed to fetch' ? 'No hay conexión con el servidor. Intenta nuevamente.' : error.message); }
    finally { setLoading(false); }
  }
  return (
    <PageLayout eyebrow="RESEÑAS" title="Tu experiencia cuenta." description="Lo que más nos importa es cómo te sientes al volver a ver tu auto.">
      <div className="reviews-layout">
        <section className="customer-reviews">
          <span className="eyebrow">LA VOZ DE NUESTROS CLIENTES</span><h2>Confianza en cada visita.</h2>
          {!data.length && <div className="empty-panel" role="status"><span className="empty-symbol">“</span><h3>{status === 'loading' ? 'Cargando experiencias…' : status === 'error' ? 'Las reseñas no están disponibles' : 'Sé el primero en compartir tu experiencia'}</h3><p>{status === 'error' ? 'Intenta nuevamente más tarde.' : 'Cada opinión nos ayuda a cuidar mejor de tu auto.'}</p></div>}
          <div className="customer-review-list">{data.map(review => {
            const rating = Math.max(0, Math.min(5, Number(review.calificacion) || 0));
            return <article className="review-item" key={review.id}><div className="review-stars" aria-label={`${rating} de 5 estrellas`}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div><blockquote>{review.comentario}</blockquote><div className="review-author"><span>{review.nombre_cliente?.charAt(0)}</span><strong>{review.nombre_cliente}</strong><time>{review.fecha && !Number.isNaN(Date.parse(review.fecha)) ? new Date(review.fecha).toLocaleDateString('es-MX') : ''}</time></div></article>;
          })}</div>
        </section>
        <form className="review-form-panel" onSubmit={handleSubmit}>
          <span className="eyebrow">COMPARTE TU EXPERIENCIA</span><h2>Deja una reseña.</h2><p className="form-intro">Nos encantará saber cómo nos fue.</p>
          {message && <div className="form-notice" role="status">{message}</div>}
          <fieldset disabled={loading}><label htmlFor="review-name">Tu nombre</label><input id="review-name" className="form-control" autoComplete="name" placeholder="¿Cómo te llamas?" required value={nombre} onChange={e => setNombre(e.target.value)} />
          <fieldset className="rating-picker"><legend>Tu calificación</legend><div>{[1,2,3,4,5].map(star => <button key={star} type="button" className={star <= calificacion ? 'selected' : ''} aria-label={`${star} de 5 estrellas`} aria-pressed={calificacion === star} onClick={() => setCalificacion(star)}>★</button>)}</div><small>{calificacion} de 5 estrellas</small></fieldset>
          <label htmlFor="review-comment">Tu experiencia</label><textarea id="review-comment" className="form-control" rows="5" placeholder="Cuéntanos sobre el servicio y el resultado…" required value={comentario} onChange={e => setComentario(e.target.value)} />
          <button className="action-button" type="submit" disabled={loading}>{loading ? 'Enviando…' : 'Publicar reseña ↗'}</button></fieldset>
        </form>
      </div>
    </PageLayout>
  );
}
