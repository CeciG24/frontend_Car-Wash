import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-section d-flex flex-column justify-content-center text-center text-light px-4 py-5 min-vh-100">
      <div className="container">
        <h1 className="mb-4 display-3 fw-bold">LS 1713 Car Detailing</h1>
        <h2 className="mb-3 fs-2">Tu auto limpio, sin complicaciones</h2>
        <p className="mb-4 fs-5">
          Ahorra tiempo y dale a tu auto el cuidado que se merece. <br></br>Servicio premium de car wash y detallado en la comodidad de tu hogar u oficina.
        </p>
        <p className="mb-5 fw-bold fs-5">Agenda tu cita a domicilio en minutos</p>

        <div className="d-grid gap-3 d-md-flex justify-content-center">
          <Link
            to="/Booking/"
            className="btn btn-primary btn-lg px-4 me-md-2 shadow"
          >
            Agendar cita
          </Link>
          <Link
            to="/Services/"
            className="btn btn-outline-light btn-lg px-4 shadow"
          >
            Ver servicios disponibles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
