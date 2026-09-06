import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function PageLayout({ eyebrow, title, description, children }) {
  return (
    <div className="inner-page">
      <Header />
      <main id="main-content" className="shell page-main">
        <div className="page-intro">
          <Link className="page-back" to="/">Inicio / <span>{eyebrow}</span></Link>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}

