import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/common/Header";

function Reviews() {
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch("http://127.0.0.1:5000/reviews")
      .then((res) => res.json())
      .then((json) => {
        setData(json.Reseñas || []);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ text: "Error al cargar las reseñas", type: "danger" });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !comentario.trim()) {
      setMessage({ text: "Por favor completa todos los campos", type: "warning" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    const newReview = {
      nombre_cliente: nombre,
      comentario: comentario,
      calificacion: parseInt(calificacion)
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: "¡Reseña enviada exitosamente!", type: "success" });
        setNombre("");
        setComentario("");
        setCalificacion(5);
        fetchReviews();
      } else {
        setMessage({ text: result.error || "Error al enviar la reseña", type: "danger" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error de conexión con el servidor", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
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
        <h1 className="mb-5 text-center fw-bold">Reseñas</h1>

        {/* Formulario para nueva reseña */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-lg text-light"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <h3 className="card-title text-center fw-bold mb-4">Dejar una reseña</h3>
                
                {message.text && (
                  <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button 
                      type="button" 
                      className="btn-close btn-close-white" 
                      onClick={() => setMessage({ text: "", type: "" })}
                    ></button>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#fff"
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Calificación</label>
                  <div className="d-flex justify-content-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCalificacion(star)}
                        className="btn btn-star"
                        style={{
                          fontSize: "3rem",
                          background: "transparent",
                          border: "none",
                          color: star <= calificacion ? "#ffc107" : "rgba(255, 255, 255, 0.3)",
                          padding: "0.5rem",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          transform: star <= calificacion ? "scale(1.1)" : "scale(1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.2)";
                          e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(255, 193, 7, 0.8))";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = star <= calificacion ? "scale(1.1)" : "scale(1)";
                          e.currentTarget.style.filter = "none";
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="comentario" className="form-label">Comentario</label>
                  <textarea
                    className="form-control"
                    id="comentario"
                    rows="4"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribe tu reseña aquí..."
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#fff"
                    }}
                  />
                </div>

                <button 
                  onClick={handleSubmit}
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                  style={{
                    backgroundColor: "rgba(0, 123, 255, 0.8)",
                    border: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 123, 255, 1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 123, 255, 0.8)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? "Enviando..." : "Enviar Reseña"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de reseñas */}
        <h3 className="text-center fw-bold mb-4">Reseñas de nuestros clientes</h3>
        {data.length === 0 ? (
          <div className="text-center">
            <div 
              className="alert alert-info d-inline-block"
              style={{
                backgroundColor: "rgba(23, 162, 184, 0.2)",
                border: "1px solid rgba(23, 162, 184, 0.4)",
                color: "#fff"
              }}
            >
              No hay reseñas todavía. ¡Sé el primero en dejar una!
            </div>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {data.map((review) => (
              <div key={review.id} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-lg text-light"
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 123, 255, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title fw-bold mb-0">{review.nombre_cliente}</h5>
                      <span className="text-warning" style={{ fontSize: "1.3rem" }}>
                        {renderStars(review.calificacion)}
                      </span>
                    </div>
                    <p className="card-text mb-3" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                      {review.comentario}
                    </p>
                    <p className="text-muted small mb-0" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                      {new Date(review.fecha).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
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

export default Reviews;