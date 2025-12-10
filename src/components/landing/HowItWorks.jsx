import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HowItWorks() {
    return (
        <section className="py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-light mb-3" style={{ fontSize: "2.5rem" }}>
                        ¿Cómo funciona?
                    </h2>
                    <p className="text-light fs-5" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                        Tres simples pasos para tener tu auto impecable
                    </p>
                </div>

                <div className="row g-4 align-items-center justify-content-center">
                    {/* Paso 1 */}
                    <div className="col-lg-3 col-md-6">
                        <div 
                            className="text-center p-4 h-100"
                            style={{
                                background: "rgba(255, 255, 255, 0.07)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "20px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-10px)";
                                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div 
                                className="d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    background: "linear-gradient(135deg, #007bff, #0056b3)",
                                    borderRadius: "50%",
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    boxShadow: "0 5px 15px rgba(0, 123, 255, 0.4)"
                                }}
                            >
                                1
                            </div>
                            <h5 className="fw-bold text-light mb-3">Elige tu servicio</h5>
                            <p className="text-light mb-0" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                Explora nuestros paquetes y selecciona el que mejor se adapte a tus necesidades
                            </p>
                        </div>
                    </div>

                    {/* Flecha 1 */}
                    <div className="col-lg-1 d-none d-lg-block text-center">
                        <div style={{ fontSize: "2rem", color: "#007bff" }}>
                            →
                        </div>
                    </div>

                    {/* Paso 2 */}
                    <div className="col-lg-3 col-md-6">
                        <div 
                            className="text-center p-4 h-100"
                            style={{
                                background: "rgba(255, 255, 255, 0.07)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "20px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-10px)";
                                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div 
                                className="d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    background: "linear-gradient(135deg, #007bff, #0056b3)",
                                    borderRadius: "50%",
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    boxShadow: "0 5px 15px rgba(0, 123, 255, 0.4)"
                                }}
                            >
                                2
                            </div>
                            <h5 className="fw-bold text-light mb-3">Agenda tu cita</h5>
                            <p className="text-light mb-0" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                Selecciona fecha, hora y ubicación que más te convengan
                            </p>
                        </div>
                    </div>

                    {/* Flecha 2 */}
                    <div className="col-lg-1 d-none d-lg-block text-center">
                        <div style={{ fontSize: "2rem", color: "#007bff" }}>
                            →
                        </div>
                    </div>

                    {/* Paso 3 */}
                    <div className="col-lg-3 col-md-6">
                        <div 
                            className="text-center p-4 h-100"
                            style={{
                                background: "rgba(255, 255, 255, 0.07)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "20px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-10px)";
                                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div 
                                className="d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    background: "linear-gradient(135deg, #28a745, #1e7e34)",
                                    borderRadius: "50%",
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    boxShadow: "0 5px 15px rgba(40, 167, 69, 0.4)"
                                }}
                            >
                                ✓
                            </div>
                            <h5 className="fw-bold text-light mb-3">¡Disfruta el resultado!</h5>
                            <p className="text-light mb-0" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                Nuestro equipo llegará y dejará tu auto impecable
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA adicional */}
                <div className="text-center mt-5">
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
                        Comenzar ahora
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
