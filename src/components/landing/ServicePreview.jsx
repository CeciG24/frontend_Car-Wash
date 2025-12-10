import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function ServicesPreview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/services")
      .then((res) => res.json())
      .then((json) => setData(json.Servicios))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center text-light fw-bold mb-4">Nuestros Servicios</h2>
      <div className="row g-4 justify-content-center">
        {data.slice(0, 3).map((item, idx) => (
          <div key={idx} className="col-md-4 col-lg-3">
            <div
              className="card h-100 border-0 shadow-lg text-center text-light"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">{item.nombre}</h5>
                <p
                  className="card-text fs-5"
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                >
                  ${item.precio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
          <a
            href="/Services/"
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
            Ver todos los servicios
          </a>
        </div>
    </div>
  );
}

export default ServicesPreview;
