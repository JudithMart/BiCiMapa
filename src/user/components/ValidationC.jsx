import React, { useState } from "react";
import QRScanner from "./QRScanner";
import { QrCode } from "lucide-react";
import { validarToken } from "../../services/visita.service";
import { useNavigate } from "react-router-dom";


function ValidationC({
  promocionId,
  nombreLugar,
  userId,
  descuento,
  imagenLugar,
}) {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // success | error
  const navigate = useNavigate();

  const mostrarMensaje = (msg, tipo = "success") => {
    setMensaje(msg);
    setTipoMensaje(tipo);
    if (tipo === "success") {
      setTimeout(() => {
        setMensaje("");
        navigate("/profile");
      }, 1800);
    } else {
      setTimeout(() => setMensaje("") , 2000);
    }
  };

  const handleScan = async (decodedText) => {
    setCodigo(decodedText);
    const response = await validarToken({
      token: decodedText,
      id_usuario: userId,
      id_promocion: promocionId,
    });
    if (response.success) {
      mostrarMensaje("¡Visita registrada exitosamente!", "success");
    } else {
      mostrarMensaje(response.message || "Error al registrar visita", "error");
    }
  };

  return (
    <div
      className="w-full min-h-screen overflow-y-auto flex flex-col  justify-center px-5 pt-14 pb-36 bg-cover bg-center"
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      <p className="text-xs mb-2 text-center text-red-600 italic">
       *Las promociones pueden modificarse dependiendo del lugar
      </p>
      <div className="w-full h-full max-w-sm bg-primary/80 rounded-[30px] shadow-2xl p-5  ">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={imagenLugar}
            alt={nombreLugar}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-white"
          />

          <div>
            <p className="text-white text-2xl font-bold">{nombreLugar}</p>

            <p className="text-white/80 text-sm">{descuento}</p>
          </div>
        </div>

        {/* QR TITLE */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold text-lg">Escanea el QR</p>

          <QrCode className="text-white" />
        </div>

        {/* SCANNER */}
        <div className="bg-white rounded-3xl py-2  shadow-lg">
          <QRScanner onScanSuccess={handleScan} />
        </div>

        {/* DESCRIPCIÓN */}
        <p className="text-white/90 text-sm text-center mt-5">
          Muestra este escáner al personal del lugar
        </p>
        <p className="text-white/90 text-sm text-center mt-5">ò</p>

        {/* INPUT PARA TOKEN MANUAL */}
        <div className="mt-3">
          <input
            type="text"
            className="w-full rounded-xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-center"
            placeholder="Ingresa el token"
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-gray-400 text-white rounded-xl py-2 font-semibold shadow transition hover:bg-gray-600"
            onClick={async () => {
              if (!codigo) return mostrarMensaje("Ingresa un token", "error");
              const response = await validarToken({
                token: codigo,
                id_usuario: userId,
                id_promocion: promocionId,
              });
              if (response.success) {
                mostrarMensaje("¡Visita registrada exitosamente!", "success");
              } else {
                mostrarMensaje(response.message || "Error al registrar visita", "error");
              }
            }}
            type="button"
          >
            Validar token
          </button>
        </div>
        {/* Toast visual para mensajes */}
        {mensaje && (
          <div
            className={`fixed left-1/2 top-8 z-50 -translate-x-1/2 rounded-2xl px-6 py-4 shadow-lg text-center font-normal text-lg animate-fade-in-up transition-all
              ${tipoMensaje === "success" ? "bg-green-700 text-white " : "bg-red-500/90 text-white border-2 "}
            `}
            style={{ minWidth: 220 }}
          >
            {mensaje}
          </div>
        )}


      </div>
    </div>
  );
}

export default ValidationC;
