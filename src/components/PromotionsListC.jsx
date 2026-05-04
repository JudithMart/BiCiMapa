import { Box } from 'lucide-react';
import React from 'react'
import BoxPromotion from './BoxPromotion';

function PromotionsListC({places}) { 
   return (
    <div
      className="relative flex items-center flex-col w-full h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      <div
        className="py-8 mt-1 w-full bg-[#ffffff]/75 flex items-center rounded-b-2xl shadow-lg "
      >
        <div className="rounded-full w-40 h-[85px]">
          <img
            className="bg-cover h-full w-full"
            src="\Avatar\Avatar.png"
          />
        </div>
        <div>
          <p className="text-texto -ml-5 text-2xl font-bold">Promociones</p>
        </div>
      </div>
     <div className="flex flex-col gap-y-2 mt-10  justify-center  px-3 py-5 w-full">
        {places && places.length > 0 ? (
          places.map((lugar) => (
            <BoxPromotion
              key={lugar.id}
              nombre={lugar.nombre || "Lugar sin nombre"}
              imagen_lugar={lugar.imagen_url || "/placeholder.png"}
              total_promociones={lugar.total_promociones || 0}
              slug={lugar.slug || ""}
            />
          ))
        ) : (
          <p className="text-gray-500">No hay lugares con promociones.</p>
        )}
      </div>
    </div>
  );
}

export default PromotionsListC