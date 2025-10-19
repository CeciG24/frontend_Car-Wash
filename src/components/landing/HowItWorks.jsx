import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import first from "./../../assets/number1.png";
import second from "./../../assets/number2.png";
import third from "./../../assets/number3.png";

function HowItWorks() {
    return (
        <div className="flex-grow-1 d-flex flex-column justify-content-center text-center text-light px-4 py-5">
            <h2 className="mb-4 fs-2">¿Cómo funciona?</h2>
            
            <div className="d-flex flex-column justify-content-center gap-4">
                <div className="d-flex flex-column align-items-center gap-2 p-2">
                    <img src={first} alt="Paso 1" style={{height: "60px", width: "60px"}} />
                    <h5>Paso 1</h5>
                    <p className="fs-5">Explora nuestros servicios disponibles en la página de servicios y elige el que necesitas.</p>
                </div>

                <div className="d-flex flex-column align-items-center gap-2 p-2">
                    <img src={second} alt="Paso 2" style={{height: "60px", width: "60px"}} />
                    <h5>Paso 2</h5>
                    <p className="fs-5">Selecciona la fecha y hora que más te convenga para tu cita o servicio.</p>
                </div>

                <div className="d-flex flex-column align-items-center gap-2 p-2">
                    <img src={third} alt="Paso 3" style={{height: "60px", width: "60px"}} />
                    <h5>Paso 3</h5>
                    <p className="fs-5">Confirma tu cita y disfruta de nuestro servicio sin complicaciones.</p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
