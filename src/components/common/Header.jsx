import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
const [open, setOpen] = useState(false);
return <header className="site-header"><div className="topbar shell"><span>CUIDADO AUTOMOTRIZ · ATENCIÓN AL DETALLE</span><a href="tel:2215568660">TEL. 221 556 8660 ↗</a></div><nav className="main-nav shell" aria-label="Navegación principal"><Link className="brand" to="/" onClick={() => setOpen(false)}><span>LS 1713<small>CAR DETAILING</small></span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="site-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button><div id="site-menu" className={`nav-links ${open ? 'is-open' : ''}`}>{[['/', 'Inicio'], ['/Services', 'Servicios'], ['/Reviews', 'Reseñas'], ['/Portfolio', 'Portafolio']].map(([to, label]) => <NavLink key={to} to={to} end onClick={() => setOpen(false)}>{label}</NavLink>)}<Link to="/Booking" className="action-button" onClick={() => setOpen(false)}>Reservar ahora <span>↗</span></Link></div></nav></header>;
}

