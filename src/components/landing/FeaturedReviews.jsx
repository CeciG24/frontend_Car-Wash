import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function FeaturedReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/reviews");
        const data = await response.json();
        
        // Tomar solo las últimas 3 reseñas con mejor calificación
        const topReviews = data.Reseñas
          .sort((a, b) => b.calificacion - a.calificacion)
          .slice(0, 3);
        
        setReviews(topReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar reseñas:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (loading) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-light mb-3" style={{ fontSize: "2.5rem" }}>
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-light" style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "1.1rem" }}>
            Experiencias reales de clientes satisfechos
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center">
            <p className="text-light" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Próximamente verás aquí las reseñas de nuestros clientes
            </p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {reviews.map((review) => (
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
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 123, 255, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    {/* Estrellas en la parte superior */}
                    <div className="text-center mb-3">
                      <span className="text-warning" style={{ fontSize: "1.5rem" }}>
                        {renderStars(review.calificacion)}
                      </span>
                    </div>

                    {/* Comentario */}
                    <p 
                      className="card-text mb-4 flex-grow-1" 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "1rem",
                        fontStyle: "italic",
                        lineHeight: "1.6"
                      }}
                    >
                      "{review.comentario}"
                    </p>

                    {/* Información del cliente */}
                    <div className="mt-auto">
                      <div 
                        className="d-flex align-items-center"
                        style={{
                          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                          paddingTop: "1rem"
                        }}
                      >
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "rgba(0, 123, 255, 0.3)",
                            fontSize: "1.3rem",
                            fontWeight: "bold"
                          }}
                        >
                          {review.nombre_cliente.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">{review.nombre_cliente}</h6>
                          <small style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                            {new Date(review.fecha).toLocaleDateString('es-MX', {
                              month: 'long',
                              year: 'numeric'
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón para ver todas las reseñas */}
        {reviews.length > 0 && (
          <div className="text-center mt-5">
            <a 
              href="/reviews"
              className="btn btn-lg"
              style={{
                backgroundColor: "rgba(0, 123, 255, 0.8)",
                border: "none",
                color: "#fff",
                padding: "12px 40px",
                borderRadius: "30px",
                fontWeight: "bold",
                transition: "all 0.3s",
                textDecoration: "none"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 123, 255, 1)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 5px 20px rgba(0, 123, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 123, 255, 0.8)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Ver todas las reseñas
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedReviews;