import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";

function Services() {
  const [data, setData] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/services")
      .then((res) => res.json())
      .then((json) => setData(json.Servicios))
      .catch((err) => console.error(err));
  }, []);

  const handleFlip = async (serviceId, idx) => {
    // Si no tenemos la descripción, la obtenemos
    if (!descriptions[serviceId]) {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/services/descriptions/${serviceId}`
        );
        const json = await res.json();
        setDescriptions((prev) => ({
          ...prev,
          [serviceId]: json.Descripcion.descripcion,
        }));
      } catch (err) {
        console.error("Error al obtener descripción:", err);
      }
    }

    // Volteamos la tarjeta
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div
      className="min-vh-100 text-light"
      style={{
        background: "linear-gradient(135deg, #0a0f24, #112b61, #0f4c81)",
      }}
    >
      <Header />
      <div className="container mt-5 pb-5">
        <h1 className="mb-5 text-center fw-bold">Nuestros Servicios</h1>
        <div className="row g-4 justify-content-center">
          {data.map((item, idx) => (
            <div key={idx} className="col-md-4 col-lg-3">
              <div
                className="card-container"
                style={{
                  perspective: "1000px",
                  height: "280px",
                }}
              >
                <div
                  className={`card-flip ${
                    flippedCards[idx] ? "flipped" : ""
                  }`}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s",
                    transform: flippedCards[idx]
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  {/* Cara frontal */}
                  <div
                    className="card h-100 border-0 shadow-lg text-center text-light"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      background: "rgba(255, 255, 255, 0.07)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="card-body d-flex flex-column justify-content-center">
                      <h5 className="card-title fw-bold mb-3">{item.nombre}</h5>
                      <p
                        className="card-text fs-5 mb-4"
                        style={{ color: "rgba(255, 255, 255, 0.85)" }}
                      >
                        ${item.precio}
                      </p>
                      <button
                        className="btn btn-outline-light mx-auto"
                        style={{
                          borderRadius: "25px",
                          padding: "8px 24px",
                          transition: "all 0.3s",
                        }}
                        onClick={() => handleFlip(item.id, idx)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        Ver más
                      </button>
                    </div>
                  </div>

                  {/* Cara trasera */}
                  <div
                    className="card h-100 border-0 shadow-lg text-center text-light"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      background: "rgba(0, 123, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "20px",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="card-body d-flex flex-column justify-content-between p-4">
                      <div>
                        <h5 className="card-title fw-bold mb-3">{item.nombre}</h5>
                        <p
                          className="card-text"
                          style={{
                            color: "rgba(255, 255, 255, 0.9)",
                            fontSize: "0.9rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {descriptions[item.id] || "Cargando descripción..."}
                        </p>
                      </div>
                      <button
                        className="btn btn-outline-light mx-auto mt-3"
                        style={{
                          borderRadius: "25px",
                          padding: "8px 24px",
                          transition: "all 0.3s",
                        }}
                        onClick={() => handleFlip(item.id, idx)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        Volver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
