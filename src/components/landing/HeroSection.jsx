import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import autoLimpio from "../../assets/autoLimpio.jpg";

function HeroSection() {
  return (
    <div className="hero-section d-flex align-items-center text-light px-4" style={{ minHeight: "90vh" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="badge bg-primary bg-opacity-25 text-light px-3 py-2 mb-3 rounded-pill">
              Acabados profesionales
            </div>
            
            <h1 className="display-2 fw-bold mb-3" style={{ lineHeight: "1.1" }}>
              Tu Auto
              <span className="d-block" style={{ color: "#4da6ff" }}>
                Como Nuevo
              </span>
            </h1>
            
            <p className="fs-4 mb-4" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
              Lavado profesional a domicilio o en nuestras instalaciones. 
              <strong> Agenda en 2 minutos, obtén resultados profesionales.</strong>
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <a
                href="/Booking/"
                className="btn btn-lg px-5 py-3 shadow-lg text-decoration-none text-white"
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)";
                }}
              >
                Agendar Ahora
              </a>
              
              <a
                href="/Services/"
                className="btn btn-outline-light btn-lg px-5 py-3 text-decoration-none"
                style={{
                  borderRadius: "50px",
                  borderWidth: "2px",
                  fontWeight: "bold",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Ver Servicios
              </a>
            </div>

            {/* Trust indicators */}
            <div className="d-flex gap-4 mt-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <div className="bg-success rounded-circle" style={{ width: "8px", height: "8px" }}></div>
                <small style={{ color: "rgba(255, 255, 255, 0.7)" }}>Disponible hoy</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>⭐⭐⭐⭐⭐</span>
                <small style={{ color: "rgba(255, 255, 255, 0.7)" }}>+100 clientes satisfechos</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>✓</span>
                <small style={{ color: "rgba(255, 255, 255, 0.7)" }}>Garantía de calidad</small>
              </div>
            </div>
          </div>

          {/* Visual side */}
          <div className="col-lg-6">
            <div 
              className="d-flex flex-column align-items-center p-4"
              style={{
                minHeight: "500px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "30px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <img 
                src={autoLimpio}
                alt="Auto limpio y brillante"
                style={{
                  width: "85%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  marginBottom: "20px"
                }}
              />
              
              {/* Floating cards with stats */}
              <div className="d-flex gap-3 w-100 justify-content-center">
                <div 
                  className="p-3 rounded-3 flex-grow-1"
                  style={{
                    maxWidth: "200px",
                    background: "rgba(0, 123, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(0, 123, 255, 0.3)"
                  }}
                >
                  <div className="fw-bold">⚡ 1 hora</div>
                  <small style={{ color: "rgba(255, 255, 255, 0.7)" }}>Servicio rápido</small>
                </div>

                <div 
                  className="p-3 rounded-3 flex-grow-1"
                  style={{
                    maxWidth: "200px",
                    background: "rgba(0, 255, 123, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(0, 255, 123, 0.3)"
                  }}
                >
                  <div className="fw-bold">💯 100%</div>
                  <small style={{ color: "rgba(255, 255, 255, 0.7)" }}>Satisfacción</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
