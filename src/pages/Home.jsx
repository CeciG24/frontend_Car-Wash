import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroSection from "../components/landing/HeroSection";
import Benefits from "../components/landing/Benefits";
import HowItWorks from "../components/landing/HowItworks";
import Contact from "../components/landing/Contact";

function Home() {
  return (
    <div className="position-relative min-vh-100 w-100 text-dark d-flex flex-column">
      {/* Gradient de fondo */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(135deg, #007bfd, #000000)",
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
        <div className="flex-grow-1 d-flex flex-column justify-content-center text-center text-light px-4 py-2">
          <h2 className="mb-3 fs-2">Nuestros servicios</h2>
          <p className="mb-4 fs-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium placeat porro, voluptate perferendis expedita ab soluta dolor, officiis modi vel, temporibus eaque iste hic voluptates. Saepe illum quisquam sint ea.</p>
        </div>
        
        {/* galeria */}
        <div className="flex-grow-1 d-flex flex-column justify-content-center text-center text-light px-4 py-2">
          <h2 className="mb-3 fs-2">Antes y despues</h2>
          <p className="mb-4 fs-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium placeat porro, voluptate perferendis expedita ab soluta dolor, officiis modi vel, temporibus eaque iste hic voluptates. Saepe illum quisquam sint ea.</p>
        </div>
        {/* reviews destacadas */}
        <div className="flex-grow-1 d-flex flex-column justify-content-center text-center text-light px-4 py-2">
          <h2 className="mb-3 fs-2">Testimonios destacados</h2>
          <p className="mb-4 fs-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium placeat porro, voluptate perferendis expedita ab soluta dolor, officiis modi vel, temporibus eaque iste hic voluptates. Saepe illum quisquam sint ea.</p>
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
