import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./../../assets/logoAzul.png";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <img 
            src={logo}
            alt="LS 1713" 
            style={{ height: "40px", marginRight: "10px" }}
          />
          LS 1713
        </Link>

        {/* Toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/Services" className="nav-link">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link to="/Reviews" className="nav-link">Reseñas</Link>
            </li>
            \

            {/* Botón CTA */}
            <li className="nav-item ms-lg-3">
              <Link to="/Booking" className="btn btn-info fw-bold">
                Reservar Ahora
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
