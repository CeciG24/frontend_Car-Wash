import { Link } from 'react-router-dom';
import PortfolioGrid from '../common/PortfolioGrid';

export default function TikTokPortfolio() {
  return (
    <section id="trabajos" className="section-space tiktok-section">
      <div className="shell">
        <div className="section-heading">
          <div><span className="eyebrow">NUESTRO TRABAJO, EN MOVIMIENTO</span><h2>Cada auto tiene<br />su transformación.</h2></div>
          <div><p>El carro. El cuidado. El resultado.<br />Mira nuestros trabajos en TikTok.</p><Link className="text-link" to="/Portfolio">Ver todo el portafolio ↗</Link></div>
        </div>
        <PortfolioGrid limit={3} />
      </div>
    </section>
  );
}

