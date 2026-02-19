import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";

function Portfolio() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/portfolio")
      .then((res) => res.json())
      .then((json) => setData(json.Servicios || []))
      .catch((err) => {
        console.error(err);
        setError("Error al cargar el portafolio");
      });
  }, []);

  const formatDate = (d) => {
    try {
      const date = new Date(d);
      if (isNaN(date)) return d || "";
      return date.toLocaleDateString();
    } catch {
      return d || "";
    }
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
        <h1 className="mb-5 text-center fw-bold">Portafolio de trabajos</h1>
        <p className="mb-5 text-center">
          Descubre las transformaciones increíbles que hemos logrado. <br />Cada
          trabajo es un testimonio de nuestra dedicación a la excelencia y
          atención al detalle.
        </p>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {data.length === 0 && !error ? (
          <p className="text-center">No hay trabajos en el portafolio aún.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {data.map((item) => (
              <div key={item.id_servicio} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-lg text-center text-light"
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(0, 123, 255, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(0, 0, 0, 0.3)";
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <div style={{ marginBottom: 12 }}>
                      <video
                        controls
                        preload="metadata"
                        style={{
                          width: "100%",
                          borderRadius: 12,
                          maxHeight: 240,
                          backgroundColor: "#000",
                          objectFit: "cover",
                        }}
                      >
                        <source src={item.url} />
                        Tu navegador no soporta la etiqueta de video.
                      </video>
                    </div>

                    <h5 className="card-title fw-bold mb-1">{item.carro}</h5>
                    <p
                      className="card-text mb-2"
                      style={{ color: "rgba(255, 255, 255, 0.85)" }}
                    >
                      {item.descripcion}
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        {formatDate(item.fecha)}
                      </small>
                      <button className="btn btn-outline-light btn-sm">
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio;