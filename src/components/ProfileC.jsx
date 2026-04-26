import React from "react";
import { LuBike } from "react-icons/lu";
import BoxPlace from "./BoxPlace";

function ProfileC({
  nombre,
  visitas_completadas,
  visitas_restantes,
  lugares_visitados,
  lugares_reto,
}) {
  // Calcular el porcentaje de progreso
  const total = Number(visitas_restantes) || 1;
  const completadas = Number(visitas_completadas) || 0;
  const porcentaje = Math.min((completadas / total) * 100, 100);

  // Unificar lugares del reto y marcar si han sido visitados
  const lugaresCombinados = (lugares_reto || []).map((lugar) => {
    const id = lugar.id_lugar || lugar.lugar?.id || lugar.id;
    const nombre = lugar.lugar?.nombre || lugar.nombre;
    const imagen_url = lugar.lugar?.imagen_url || lugar.imagen_url;
    const visitadoObj = (lugares_visitados || []).find((v) => v.id_lugar === id);
    return {
      id,
      nombre_lugar: nombre,
      imagen_lugar: imagen_url,
      visitado: !!visitadoObj,
      fecha_visita: visitadoObj?.fecha_visita || null,
    };
  });

  return (
    <div
      className="relative flex items-center flex-col w-full h-screen
         bg-cover bg-center "
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      <div
        className="py-8  w-full bg-[#ffffff]/75 flex items-center rounded-b-2xl 
      shadow-lg "
      >
        <div className=" rounded-full  h-24  ">
          <img
            className="bg-cover  h-full w-full"
            src="\Avatar\Avatar.png"
          ></img>
        </div>
        <div>
          <p className="text-texto -ml-7 text-2xl font-bold">{nombre}</p>
        </div>
      </div>
      <div className=" flex flex-col justify-center  px-3 py-10 w-full  ">
        {/* Progreso del usuario */}
        <div className="flex flex-col px-5 py-4 bg-[#FEF7F7]  rounded-md shadow-lg">
          <div className="flex gap-20 ">
            <p className="text-texto font-bold ">Recorrido</p>
            <p className="text-primary font-normal ">
              {visitas_completadas} de {visitas_restantes} lugares vistados
            </p>
          </div>
          {/* Barra de progreo */}
          <div className="relative w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-primary/60 h-4 rounded-full"
              style={{
                width: `${(visitas_completadas / visitas_restantes) * 100}%`,
              }}
            ></div>
            {/* Icono de la bici avanzando */}
            <div
              className="absolute bottom-0 -translate-y-1/2"
              style={{
                left: `calc(${porcentaje}% - 16px)`,
                transform: "translateX(-50%)",
              }}
            >
              <LuBike size={32} className="text-primary drop-shadow-lg" />
            </div>
          </div>
          <p className="font-light text-texto mt-3 text-sm">
            Visita{" "}
            <span className="font-semibold">
              {" "}
              {visitas_restantes} lugares más
            </span>{" "}
            y obten una promo en
            <span className="text-primary font-semibold "> BiCitas</span>
          </p>
        </div>
        {/* Lugares */}
        <div className="flex flex-col gap-y-2 mt-6">
          <p className="text-texto font-bold text-lg">Lugares</p>

          {lugaresCombinados.length > 0 ? (
            lugaresCombinados.map((lugar, idx) => (
              <BoxPlace
                key={lugar.id || idx}
                nombre_lugar={lugar.nombre_lugar}
                imagen_lugar={lugar.imagen_lugar}
                visitado={lugar.visitado}
                fecha_visita={lugar.fecha_visita}
              />
            ))
          ) : (
            <p className="text-gray-400">No hay lugares.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileC;
