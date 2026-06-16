//cardBicitas.jsx
import React from "react";
import BoxRoad from "./BoxRoad";
import { MdOutlineDirections } from "react-icons/md";
import Progress from "./Progress";

function CardBicitas({
  rutas = [],
  onRouteClick,
  lugares = [],
  onRouteClickDirection,
  bicitasProgress,
  minutes,
  km,
}) {
  // Si hay una sola ruta y lugares, mostrar solo esa ruta con sus lugares
  const mostrarSoloRutaSeleccionada = rutas.length === 1 && lugares.length > 0;

  const getEstadoRuta = (ruta) => {
    if (ruta.completada) return "completada";

    if (bicitasProgress?.ruta?.id === ruta.id) return "activa";

    return "nueva";
  };

  const total = bicitasProgress?.ruta?.ruta_lugar?.length || 0;

  const completadas = bicitasProgress ? bicitasProgress.puntoActual - 1 : 0;

  console.log("Rutas recibidas en CardBicitasSSS:", rutas);
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
      <div
        className="absolute inset-0 bg-secundary bg-opacity-10 rounded-3xl
       pointer-events-none z-0 "
      />
      <div className="flex gap-3 mt-6 w-full z-10 relative flex-shrink-0 items-start ">
        <img
          src="/Logos/image.png"
          alt="BiCitas Historicas"
          className="w-20 h-20 md:w-32 md:h-32 object-cover  rounded-lg "
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

      {/* {bicitasProgress && (
        <div className="mt-3 flex gap-3">
          <p className="font-thin">Ruta activa</p>

          <p>{bicitasProgress.ruta.nombre}</p>

        </div>
      )} */}

      <div className=" mt-4">
        <Progress
          completadas={completadas}
          total={total}
          porcentaje={total ? Math.round((completadas * 100) / total) : 0}
          mostrarTexto={false}
          mostrarTitulo={false}
          texto={"recorridos"}
          recorrido={false}
          colorTexto="[#4A565B]"
          tamanoTexto="sm"
        />
      </div>
      <div className="py-5 pb-8 pr-1 overflow-y-auto touch-pan-y custom-scroll ">
        {mostrarSoloRutaSeleccionada ? (
          <BoxRoad
            key={rutas[0].id}
            nombre={rutas[0].nombre}
            descripcion={rutas[0].descripcion}
            tiempo={
              bicitasProgress?.ruta?.id === rutas[0].id
                ? minutes
                : rutas[0].tiempo_estimado
            }
            distancia={
              bicitasProgress?.ruta?.id === rutas[0].id
                ? km
                : rutas[0].distancia_km
            }
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
            estado={getEstadoRuta(rutas[0])}
          />
        ) : (
          rutas.map((ruta) => (
            <BoxRoad
              key={ruta.id}
              nombre={ruta.nombre}
              descripcion={ruta.descripcion}
              tiempo={
                bicitasProgress?.ruta?.id === ruta.id
                  ? minutes
                  : ruta.tiempo_estimado
              }
              distancia={
                bicitasProgress?.ruta?.id === ruta.id ? km : ruta.distancia_km
              }
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
              estado={getEstadoRuta(ruta)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CardBicitas;
