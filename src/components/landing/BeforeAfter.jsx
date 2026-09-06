import { useState } from 'react';
import { Link } from 'react-router-dom';
const before = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80';
const after = 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80';
function Comparison({ title, index }) {
const [position, setPosition] = useState(50);
return <article className="comparison-card"><div className="comparison-visual"><img src={after} alt="Vista después, imagen ilustrativa" loading="lazy" /><img className="comparison-before" src={before} alt="Vista antes, imagen ilustrativa" loading="lazy" style={{clipPath: `inset(0 ${100-position}% 0 0)`}} /><span className="compare-label before-label">ANTES</span><span className="compare-label after-label">DESPUÉS</span><span className="compare-divider" style={{left: `${position}%`}}><span>↔</span></span><input type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label={`Comparar antes y después: ${title}`} /></div><h3><span>0{index+1}</span>{title}</h3></article>;
}
export default function BeforeAfter() {
return <section className="section-space transformations"><div className="shell"><div className="section-heading"><div><span className="eyebrow">ANTES Y DESPUÉS</span><h2>El cambio se nota.</h2></div><p>Desliza y explora el comparador.<br /><small>Imágenes ilustrativas de referencia.</small></p></div><div className="comparison-grid">{['Lavado exterior completo', 'Detallado de interiores', 'Pulido y encerado'].map((title,index) => <Comparison key={title} title={title} index={index} />)}</div><div className="results-cta"><p>Tu auto también merece este cuidado.</p><Link className="text-link" to="/Portfolio">Explorar trabajos reales ↗</Link><Link className="action-button" to="/Booking">Agendar mi cita ↗</Link></div></div></section>;
}
