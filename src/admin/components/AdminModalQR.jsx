// AdminModalQR.jsx
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { FiCopy, FiDownload, FiRefreshCcw } from "react-icons/fi";

const Button = ({ icon, text, color, onClick }) => (
  <button
    onClick={onClick}
    className={`
            flex items-center justify-center 
            rounded-xl
            font-semibold
            py-2 px-2 gap-3
            transition
           
            ${color}
        `}
  >
    {icon}
    {text}
  </button>
);

export default function AdminModalQR({
  open,
  token,
  promotion,
  onClose,
  onGenerateNew,
}) {
  const qrRef = useRef(null);
  const downloadRef = useRef(null);

  if (!open || !token) return null;

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(token.token);
      alert("Token copiado al portapapeles");
    } catch {
      alert("No se pudo copiar el token");
    }
  };

  const handleDownloadQR = async () => {
    if (!downloadRef.current) return;

    try {
      const dataUrl = await toPng(downloadRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");

      link.download = `${promotion.lugar.nombre
        .replace(/\s+/g, "_")
        .toLowerCase()}_bicitas.png`;

      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {" "}
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div
          className="relative rounded-3xl p-8 w-[420px] bg-cover bg-center"
          style={{ backgroundImage: "url('/Fondos/FondoBicis.jpeg')" }}
        >
          {/* Botón de cerrar modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-primary
              text-3xl font-bold z-30 
              "
              aria-label="Cerrar"
            >
              ×
            </button>
          )}

          <p className=" text-texto  text-2xl font-bold text-center">
            Código QR
          </p>
          <p className="text-primary text-lg font-sans text-center">
            {promotion.lugar.nombre}
          </p>
          <div className="flex justify-end ">
            <Button
              text=""
              icon={<FiDownload size={20} />}
              color="text-primary  hover:text-primary/80"
              onClick={handleDownloadQR}
            />
          </div>

          <div className="flex  justify-center my-8  bg-white " ref={qrRef}>
            <QRCode value={token.token} size={220} />
          </div>

          <p className="text-center -translate-y-5 text-primary text-lg font-sans font-semibold">
            {promotion.descuento}
          </p>

          <div className="flex flex-col gap-2 mt-2">
            {" "}
            <div className="flex items-center gap-2">
              <p className="text-texto text-lg font-sans ">
                <b>Token: </b>

                <span className="text-texto font">{token.token}</span>
              </p>
              <Button
                text=""
                icon={<FiCopy size={20} />}
                color="text-primary hover:text-primary/80"
                onClick={handleCopyToken}
              />
            </div>
            <p className="text-texto text-lg font-sans">
              <b>Creado: </b>

              {new Date(token.creado_en).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              text="Generar nuevo token "
              icon={<FiRefreshCcw size={20} />}
              color="bg-primary text-white hover:bg-primary/80"
              onClick={onGenerateNew}
            />
          </div>
        </div>
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-0 -z-50 flex items-center justify-center">
        <div
          ref={downloadRef}
          className="relative flex flex-col w-[500px] h-[700px] overflow-hidden rounded-3xl"
        >
          <img
            src="/Fondos/FondoBicis.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className=" z-10 flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-texto">
              {promotion.lugar.nombre}
            </h2>

            <p className="text-2xl text-primary font-semibold mb-8">
              {promotion.descuento}
            </p>

            <div className="bg-white p-5 rounded-2xl shadow-xl">
              <QRCode value={token.token} size={260} />
            </div>

            <p className="mt-6 text-lg font-medium">
              Escanea para obtener tu promoción
            </p>
          </div>
          <div className="absolute bottom-3  left-0 right-0 flex  items-center justify-center">
            <img
              src="/Logos/logoB2.png"
              alt="BiCitas"
              className="w-20 rounded-lg object-contain"
            />

            
          </div>
        </div>
      </div>
    </>
  );
}
