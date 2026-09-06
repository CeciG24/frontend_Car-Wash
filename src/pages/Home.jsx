import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import Benefits from '../components/landing/Benefits';
import HowItWorks from '../components/landing/HowItWorks';
import ServicesPreview from '../components/landing/ServicePreview';
import BeforeAfter from '../components/landing/BeforeAfter';
import FeaturedReviews from '../components/landing/FeaturedReviews';
import Contact from '../components/landing/Contact';
import TikTokPortfolio from '../components/landing/TikTokPortfolio';
export default function Home() {
return <div className="detailing-home"><div className="first-screen"><Header /><HeroSection /></div><main id="main-content"><Benefits /><HowItWorks /><ServicesPreview /><BeforeAfter /><TikTokPortfolio /><FeaturedReviews /><section id="contacto" className="contact-section section-space"><div className="shell contact-layout"><div><span className="eyebrow">HABLEMOS DE TU AUTO</span><h2>El siguiente detalle<br />empieza contigo.</h2><p>Cuéntanos qué necesita tu auto. Nosotros nos encargamos del resto.</p><a className="contact-phone" href="tel:2215568660">221 556 8660 ↗</a><span className="contact-note">A domicilio o en nuestras instalaciones.</span></div><Contact /></div></section></main><Footer /></div>;
}
