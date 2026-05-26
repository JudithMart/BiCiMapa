import React from "react";
import BoxRoad from "./BoxRoad";

function CardBicitas({ rutas = [] }) {
  return (
    <div
      className="relative flex flex-col rounded-3xl px-5
       w-96 md:w-[650px] lg:w-[650px] h-full 
       shadow-lg bg-cover bg-center"
      style={{
        backgroundImage: "url('/Fondos/FondoBicis.jpeg')",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      {/* Overlay gris semitransparente */}
      <div className="absolute inset-0 bg-secundary bg-opacity-10 rounded-3xl pointer-events-none z-0" />
      <div className="flex gap-4 mt-8 w-full  rounded-2xl z-10 relative">
        <img
          src="/Logos/logoB2.png"
          alt="BiCitas Historicas"
          className="w-24 h-24 md:w-48 md:h-48 object-cover rounded-xl flex-shrink-0"
        />
        <div>
          {/* TÍTULO */}
          <p className="text-texto font-semibold text-2xl">
            BiCitas Historicas
          </p>

          {/* SLOGAN (highlight emocional) */}
          <p className="text-[#B57A86] font-thin  text-lg mt-1 leading-snug line-clamp-2">
            No hay Morelia bonita, sin una BiCita
          </p>
        </div>
      </div>
      <div className="py-5">
        {rutas.map((ruta) => (
          <BoxRoad
            key={ruta.id}
            nombre={ruta.nombre}
            descripcion={ruta.descripcion}
            tiempo={ruta.minutos ?? ruta.tiempo_estimado}
  distancia={ruta.km ?? ruta.distancia_km}
          />
        ))}
      </div>
    </div>
  );
}

export default CardBicitas;
