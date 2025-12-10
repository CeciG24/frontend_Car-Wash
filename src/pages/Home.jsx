import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroSection from "../components/landing/HeroSection";
import Benefits from "../components/landing/Benefits";
import HowItWorks from "../components/landing/HowItworks";
import Contact from "../components/landing/Contact";
import ServicesPreview from "../components/landing/ServicePreview";
import BeforeAfter from "../components/landing/BeforeAfter";
import FeaturedReviews from "../components/landing/FeaturedReviews";

function Home() {
  return (
    <div className="position-relative min-vh-100 w-100 text-dark d-flex flex-column">
      {/* Gradient de fondo */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(135deg, #0b1f3f 0%, #112b61  50%, #0f4c81  100%)",
          zIndex: 0,
        }}
      />
      {/* Contenido principal */}
      <div className="position-relative z-1 d-flex flex-column min-vh-100">
        {/* Navbar */}
        <Header />
        {/* Hero Section */}
        <HeroSection/>
        {/* Beneficios */}
        <Benefits/>
        {/* funcionamiento */}
        <HowItWorks/>
        {/* servicios destacados */}
        <ServicesPreview/>
        
        {/* galeria */}
         <BeforeAfter />
        {/* reviews destacadas */}
        <div className="flex-grow-1 d-flex flex-column justify-content-center text-center text-light px-4 py-2">
          <FeaturedReviews />
        </div>
        {/* Contacto */}
        <Contact/>
         {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}

export default Home;
