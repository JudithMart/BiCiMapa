import React from "react";
import BoxCuopon from "./BoxCuopon";

function CouponsC({ promociones }) {
  return (
    <div
      className="flex flex-col h-dvh bg-cover bg-center"
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      {/* HEADER  */}
      <div className="py-8 mt-1 w-full bg-[#ffffff]/75 flex items-center rounded-b-2xl shadow-lg">
        <div className="rounded-full w-40 h-[85px]">
          <img className="h-full w-full" src="\Avatar\Avatar.png" />
        </div>
        <div>
          <p className="text-texto -ml-5 text-2xl font-bold">
            Promociones de
            <br />{" "}
            <span className="text-primary font-light">
              {promociones[0]?.lugar?.nombre || "Lugar"}
            </span>
          </p>
        </div>
      </div>
      <p className="text-xs mt-2 text-center text-red-600 italic">
       *Las promociones pueden modificarse dependiendo del lugar
      </p>
      {/* LISTA */}
      <div className="flex-1 overflow-y-auto px-3 py-5 mt-2 pb-24">
        <div className="flex flex-col gap-y-2">
          {promociones && promociones.length > 0 ? (
            promociones.map((promocion) => (
              <BoxCuopon
                key={promocion.id}
                id={promocion.id}
                nombre={promocion.lugar?.nombre || "Promoción sin nombre"}
                imagen_lugar={promocion.lugar?.imagen_url || "/Tipos/sinTipo/lugarMorelia.jpg"}
                descripcion={promocion.descripcion || "Sin descripción"}
                descuento={promocion.descuento || 0}
                codigo_qr={promocion.codigo_qr || ""}
              />
            ))
          ) : (
            <p className="text-gray-500">No hay lugares con promociones.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponsC;
