import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import domicilio from "./../../assets/domicilio.png";
import rapido from "./../../assets/rapido.png"
import premium from "./../../assets/premium.png"
function Benefits() {
    return (
        <div className="container py-5">
  <div className="row text-center">
    <div className="col-md-4 mb-3">
      <div className="card card-custom shadow-sm">
    <img src={domicilio} className="card-img-top" alt="Servicio a domicilio" />
    <div className="card-body">
      <h5 className="card-title">A domicilio</h5>
      <p className="card-text">Tu auto quedará reluciente desde la comodidad de tu hogar.</p>
    </div>
  </div>
    </div>
    <div className="col-md-4 mb-3">
      <div className="card card-custom shadow-sm ">
        <img src={rapido} className="card-img-top" alt="Rapidez" />
        <div className="card-body">
          <h5 className="card-title">Rápido y eficiente</h5>
          <p className="card-text">Servicio express sin perder calidad en el resultado.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <div className="card card-custom shadow-sm">
        <img src={premium} className="card-img-top" alt="Detalle premium" />
        <div className="card-body">
          <h5 className="card-title">Detalle premium</h5>
          <p className="card-text">Acabados profesionales y limpieza profunda en cada detalle.</p>
        </div>
      </div>
    </div>
  </div>
</div>
        
    );
}
export default Benefits;