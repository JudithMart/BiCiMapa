import React from "react";
import ValidationC from "../components/ValidationC";
import { useParams, useLocation } from "react-router-dom";

function Validation() {
  const { promocionId } = useParams();
  const location = useLocation();

  const { nombreLugar, descripcion, descuento, imagenLugar } =
    location.state || {};
    console.log("Datos recibidos en Validation:", {
      promocionId,
      nombreLugar,});
  return (
    <>
    
      <ValidationC
        promocionId={promocionId}
        nombreLugar={nombreLugar}
        descripcion={descripcion}
        descuento={descuento}
        imagenLugar={imagenLugar}
      />
    </>
  );
}

export default Validation;
