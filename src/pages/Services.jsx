import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";

function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/services")
      .then((res) => res.json())
      .then((json) => setData(json.Servicios))
      .catch((err) => console.error(err));
  }, []);

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
                className="card h-100 border-0 shadow-lg text-center text-light"
                style={{
                  background: "rgba(255, 255, 255, 0.07)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  transition: "transform 0.3s, box-shadow 0.3s",
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
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3">{item.nombre}</h5>
                  <p
                    className="card-text fs-5"
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  >
                    ${item.precio}
                  </p>
                  <button>Ver más</button>
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
