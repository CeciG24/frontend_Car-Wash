import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";
import Formulario from "../components/Formulario";

function Booking() {
  return (
    <div className="d-flex">
      {/* Contenido principal */}
      <div className="flex-grow-1 position-relative">
        <Header />
        
        {/* Contenedor relativo para el formulario */}
        <div className="position-relative" style={{
          zIndex: 1,
          background: 'rgba(41, 41, 41, 0.95)'
        }}>
          <Formulario />
        </div>
      </div>
    </div>
  );
}

export default Booking;