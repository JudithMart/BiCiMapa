import React from "react";
import { LuBike } from "react-icons/lu";

function ProfileC({
  id_usuario,
  nombre,
  visitas_completadas,
  visitas_restantes,
}) {
  // Calcular el porcentaje de progreso
  const total = Number(visitas_restantes) || 1;
  const completadas = Number(visitas_completadas) || 0;
  const porcentaje = Math.min((completadas / total) * 100, 100);

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
      <div className=" flex flex-col justify-center  px-3 py-10 w-full  bg-black">
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
            Visita <span className="font-semibold"> {visitas_restantes} lugares más</span> y obten una promo en 
            <span className="text-primary font-semibold "> BiCitas</span></p>
        </div>
        <p>Lugares Visitados</p>
      </div>
    </div>
  );
}

export default ProfileC;
