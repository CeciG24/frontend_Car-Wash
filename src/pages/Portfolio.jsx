import { Link } from 'react-router-dom';
import PageLayout from '../components/common/PageLayout';
import PortfolioGrid from '../components/common/PortfolioGrid';

export default function Portfolio() {
  return (
    <PageLayout eyebrow="PORTAFOLIO" title="Los detalles hablan por nosotros." description="Conoce cada carro, el servicio que realizamos y el resultado en video.">
      <PortfolioGrid />
      <div className="page-callout"><div><span className="eyebrow">AHORA ES TU TURNO</span><h2>El próximo puede ser tu auto.</h2></div><Link className="action-button" to="/Booking">Agendar una cita ↗</Link></div>
    </PageLayout>
  );
}

