import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import domicilio from "./../../assets/domicilio.png";
import satisfaccion from "./../../assets/satisfaccion.png"
import premium from "./../../assets/premium.png"
function Benefits() {
    return (
        <div className="container py-5">
  <div className="row row-cols-1 row-cols-md-3 g-2 text-center">
    <div className="col">
      <div className="card card-custom shadow-sm h-100 d-flex flex-column">
        <img src={domicilio} className="card-img-top" alt="Servicio a domicilio" />
        <div className="card-body flex-grow-1">
          <h5 className="card-title">A domicilio</h5>
          <p className="card-text">Tu auto quedará reluciente desde la comodidad de tu hogar.</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card card-custom shadow-sm h-100 d-flex flex-column">
        <img src={premium} className="card-img-top" alt="Detalle premium" />
        <div className="card-body flex-grow-1">
          <h5 className="card-title">Detalle premium</h5>
          <p className="card-text">Acabados profesionales y limpieza profunda en cada detalle.</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card card-custom shadow-sm h-100 d-flex flex-column">
        <img src={satisfaccion} className="card-img-top" alt="Garantía" />
        <div className="card-body flex-grow-1">
          <h5 className="card-title">Garantía de satisfacción</h5>
          <p className="card-text">Trabajamos hasta que tu auto quede perfecto.</p>
        </div>
      </div>
    </div>
  </div>
</div>

        
    );
}
export default Benefits;