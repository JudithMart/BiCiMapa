import React from "react";
import BoxRoad from "./BoxRoad";
import { MdOutlineDirections } from "react-icons/md";

function CardBicitas({
  rutas = [],
  onRouteClick,
  lugares = [],
  onRouteClickDirection,
}) {
  // Si hay una sola ruta y lugares, mostrar solo esa ruta con sus lugares
  const mostrarSoloRutaSeleccionada = rutas.length === 1 && lugares.length > 0;
  return (
    <div
      className="relative flex flex-col rounded-3xl px-5
w-full max-w-[650px]
max-h-[70dvh]
shadow-lg bg-cover bg-center "
      style={{
        backgroundImage: "url('/Fondos/FondoBicis.jpeg')",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      {/* Overlay gris semitransparente */}
      <div className="absolute inset-0 bg-secundary bg-opacity-10 rounded-3xl pointer-events-none z-0 " />
      <div className="flex gap-3 mt-6 w-full z-10 relative flex-shrink-0 items-start ">
        <img
          src="/Logos/logoB2.png"
          alt="BiCitas Historicas"
          className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-xlflex-shrink-0 rounded-xl"
        />

        <div className="min-w-0 flex-1 ">
          <p className="text-texto font-semibold text-xl md:text-3xl leading-tight break-words">
            BiCitas Historicas
          </p>

          <p className="text-[#B57A86] font-light text-sm md:text-lg mt-1 leading-snug">
            No hay Morelia bonita,
            <br />
            sin una BiCita
          </p>
        </div>
        <button
          onClick={onRouteClickDirection}
          className="text-sm md:text-base text-primary font-semibold px-2 py-1   "
        >
          <MdOutlineDirections className="w-5 h-5" />
          <p className="text-xs md:text-sm font-extralight ">Ir</p>
        </button>
      </div>
      <div className="py-5 pb-8 pr-1 overflow-y-auto touch-pan-y custom-scroll ">
        {mostrarSoloRutaSeleccionada ? (
          <BoxRoad
            key={rutas[0].id}
            nombre={rutas[0].nombre}
            descripcion={rutas[0].descripcion}
            tiempo={rutas[0].minutos ?? rutas[0].tiempo_estimado}
            distancia={rutas[0].km ?? rutas[0].distancia_km}
            ruta={rutas[0]}
            onClick={() => onRouteClick(rutas[0])}
            lugares={
              rutas[0].ruta_lugar
                ? rutas[0].ruta_lugar.map((rl) => ({
                    ...rl.lugar,
                    orden: rl.orden,
                  }))
                : []
            }
          />
        ) : (
          rutas.map((ruta) => (
            <BoxRoad
              key={ruta.id}
              nombre={ruta.nombre}
              descripcion={ruta.descripcion}
              tiempo={ruta.minutos ?? ruta.tiempo_estimado}
              distancia={ruta.km ?? ruta.distancia_km}
              ruta={ruta}
              onClick={() => onRouteClick(ruta)}
              lugares={
                ruta.ruta_lugar
                  ? ruta.ruta_lugar.map((rl) => ({
                      ...rl.lugar,
                      orden: rl.orden,
                    }))
                  : []
              }
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CardBicitas;
