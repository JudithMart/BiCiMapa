// AdminModalQR.jsx
import React from "react";
import QRCode from "react-qr-code";

export default function AdminModalQR({
  open,
  token,
  promotion,
  onClose,
  onGenerateNew,
}) {
  if (!open || !token) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold text-center">Código QR</h2>

        <div className="flex justify-center my-8">
          <QRCode value={token.token} size={220} />
        </div>

        <p>
          <b>Lugar:</b>

          {promotion.lugar.nombre}
        </p>

        <p>
          <b>Token:</b>

          {token.token}
        </p>

        <p>
          <b>Creado:</b>

          {new Date(token.creado_en).toLocaleString()}
        </p>

        <p>
          <b>Expira:</b>

          {new Date(token.expira_en).toLocaleString()}
        </p>

        <div className="flex flex-col gap-3 mt-8">
          <button>Copiar token</button>

          <button>Descargar QR</button>

          <button onClick={onGenerateNew}>Generar nuevo token</button>

          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
