import { Box } from "lucide-react";
import React, { useState } from "react";
import BoxVerification from "./BoxVerification";
import QRScanner from "./QRScanner";

function ValidationC({
  promocionId,
  nombreLugar,
  descripcion,
  descuento,
  imagenLugar,
}) {

 const [codigo, setCodigo] = useState("");

  const handleScan = async (decodedText) => {
    console.log("QR detectado:", decodedText);

    setCodigo(decodedText);

    // aquí validarás token o QR
  };

  return (
    <div
      className="flex flex-col h-dvh bg-cover bg-center"
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      <div className=" px-3 pt-20 pb-24">
        {" "}
        <BoxVerification
          nombreLugar={nombreLugar}
          descripcion={descripcion}
          descuento={descuento}
          imagenLugar={imagenLugar}
        />

      </div>

        <div className="mt-5">
          <QRScanner onScanSuccess={handleScan} />
        </div>

        <p className="mt-4 text-center text-sm">
          Código: {codigo}
        </p>
    </div>
  );
}

export default ValidationC;
