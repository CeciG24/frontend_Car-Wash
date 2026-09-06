export default function Benefits() {
return <section id="beneficios" className="benefits-strip"><div className="shell benefits-grid">{[['⌂', 'A domicilio', 'El mejor cuidado, sin salir de casa.'], ['✧', 'Detalle premium', 'Limpieza profunda. Acabados profesionales.'], ['✓', 'Garantía de satisfacción', 'Tu tranquilidad en cada servicio.']].map(([icon, title, text]) => <div className="benefit" key={title}><span className="benefit-icon" aria-hidden="true">{icon}</span><div><h2>{title}</h2><p>{text}</p></div></div>)}</div></section>;
}
