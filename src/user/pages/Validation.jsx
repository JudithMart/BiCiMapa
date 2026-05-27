import React from "react";
import ValidationC from "../components/ValidationC";
import { useAuth } from "../../context/AuthContext";
import { useParams, useLocation } from "react-router-dom";

function Validation() {
  const { promocionId } = useParams();
  const location = useLocation();
  const { userAuth } = useAuth();

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
        imagenLugar={imagenLugar || "/Tipos/sinTipo/lugarMorelia.png"}
        userId={userAuth?.id}
      />
    </>
  );
}

export default Validation;
