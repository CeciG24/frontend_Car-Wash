import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Datos de ejemplo - reemplaza con tus imágenes reales
  const comparisons = [
    {
      id: 1,
      before: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
      after: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80",
      title: "Lavado Exterior Completo"
    },
    {
      id: 2,
      before: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
      after: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80",
      title: "Detallado de Interiores"
    },
    {
      id: 3,
      before: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
      after: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80",
      title: "Pulido y Encerado"
    }
  ];

  const handleMouseMove = (e, index) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleTouchMove = (e, index) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-light mb-3" style={{ fontSize: "2.5rem" }}>
            Antes y Después
          </h2>
          <p className="text-light fs-5" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Desliza para ver la transformación
          </p>
        </div>

        <div className="row g-4">
          {comparisons.map((item, index) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div
                className="card border-0 shadow-lg overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.07)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="card-body p-3">
                  <h5 className="text-light text-center mb-3 fw-bold">{item.title}</h5>
                  
                  {/* Contenedor del slider de comparación */}
                  <div
                    className="position-relative overflow-hidden"
                    style={{
                      height: "300px",
                      borderRadius: "15px",
                      cursor: "ew-resize",
                      userSelect: "none"
                    }}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    onTouchMove={(e) => handleTouchMove(e, index)}
                  >
                    {/* Imagen DESPUÉS (fondo completo) */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        backgroundImage: `url(${item.after})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    >
                      <div
                        className="position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill fw-bold"
                        style={{
                          background: "rgba(40, 167, 69, 0.9)",
                          color: "#fff",
                          fontSize: "0.85rem"
                        }}
                      >
                        DESPUÉS
                      </div>
                    </div>

                    {/* Imagen ANTES (con clip-path) */}
                    <div
                      className="position-absolute top-0 start-0 h-100"
                      style={{
                        width: `${sliderPosition}%`,
                        backgroundImage: `url(${item.before})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                      }}
                    >
                      <div
                        className="position-absolute top-0 start-0 m-2 px-3 py-1 rounded-pill fw-bold"
                        style={{
                          background: "rgba(220, 53, 69, 0.9)",
                          color: "#fff",
                          fontSize: "0.85rem"
                        }}
                      >
                        ANTES
                      </div>
                    </div>

                    {/* Línea divisora con handle */}
                    <div
                      className="position-absolute top-0 h-100"
                      style={{
                        left: `${sliderPosition}%`,
                        transform: "translateX(-50%)",
                        width: "4px",
                        backgroundColor: "#fff",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                        zIndex: 10
                      }}
                    >
                      {/* Handle circular */}
                      <div
                        className="position-absolute"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "50px",
                          height: "50px",
                          background: "#fff",
                          borderRadius: "50%",
                          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem",
                          color: "#007bff"
                        }}
                      >
                        ⇄
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-light mt-3 mb-0" style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.7)" }}>
                    ← Desliza para comparar →
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center mt-5">
          <p className="text-light fs-5 mb-3">¿Listo para transformar tu auto?</p>
          <a
            href="/Booking/"
            className="btn btn-lg px-5 py-3 text-decoration-none text-white"
            style={{
              background: "linear-gradient(135deg, #007bff, #0056b3)",
              border: "none",
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "all 0.3s",
              boxShadow: "0 5px 20px rgba(0, 123, 255, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 20px rgba(0, 123, 255, 0.3)";
            }}
          >
            Agendar mi cita ahora
          </a>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;