import { Box } from "lucide-react";
import React from "react";
import BoxPromotion from "./BoxPromotion";


function PromotionsListC({ places, es_premium }) {
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
          <p className="text-texto -ml-5 text-2xl font-bold tracking-wider">Promociones</p>
        </div>
      </div>

      {/* LISTA */}
      <div className="flex-1 overflow-y-auto px-3 py-5 mt-4 pb-24">
        <div className="flex flex-col gap-y-2">
          {places && places.length > 0 ? (
            places.map((lugar) => (
              <BoxPromotion
                key={lugar.id}
                nombre={lugar.nombre || "Lugar sin nombre"}
                imagen_lugar={lugar.imagen_url || "/placeholder.png"}
                total_promociones={lugar.total_promociones || 0}
                tipo={lugar.tipo?.nombre || "Sin tipo"}
                tipoColor={lugar.tipo?.color_hex || ""}
                slug={lugar.slug || ""}
                es_premium={es_premium}
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
export default PromotionsListC;
