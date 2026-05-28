import React from "react";
import { LuBike } from "react-icons/lu";
import BoxPlace from "./BoxPlace";
import { getDaysLeft } from "../../services/user_premium.service";

function ProfileC({
  nombre,
  lugares_visitados,
  lugares_reto,
  fecha_expiracion,
}) {


  // Unificar lugares del reto y marcar si han sido visitados
  const lugaresCombinados = (lugares_reto || []).map((lugar) => {
    const id = lugar.id_lugar || lugar.lugar?.id || lugar.id;
    const nombre = lugar.lugar?.nombre || lugar.nombre;
    const imagen_url = lugar.lugar?.imagen_url || lugar.imagen_url;
    const visitadoObj = (lugares_visitados || []).find(
      (v) => v.id_lugar === id,
    );
    return {
      id,
      nombre_lugar: nombre,
      imagen_lugar: imagen_url,
      visitado: !!visitadoObj,
      fecha_visita: visitadoObj?.fecha_visita || null,
    };
  });

  const total = lugaresCombinados.length || 1;
const completadas = lugaresCombinados.filter(l => l.visitado).length;

const porcentaje = Math.min((completadas / total) * 100, 100);
  return (
    <div
      className="relative flex items-center flex-col w-full h-screen
         bg-cover bg-center "
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      <div
        className="py-8  mt-1 w-full bg-[#ffffff]/75 flex items-center rounded-b-2xl 
      shadow-lg "
      >
        <div className=" rounded-full w-52 h-[85px]  ">
          <img
            className="bg-cover  h-full w-full"
            src="\Avatar\Avatar.png"
          ></img>
        </div>
        <div>
          <p className="text-texto -ml-5 text-2xl font-bold">{nombre}</p>
          
          
        </div>
        
      </div>
      <div className=" flex flex-col justify-center  px-3 py-5 w-full  ">
            
        {/* Progreso del usuario */}
        <div className="flex flex-col px-5 py-4 bg-[#FEF7F7]  rounded-md shadow-lg">
          <div className="flex gap-20 ">
            <p className="text-texto font-bold ">Recorrido</p>
            <p className="text-primary font-normal ">
              {completadas} de {total} lugares visitados
            </p>
          </div>
          {/* Barra de progreo */}
          <div className="relative w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-primary/60 h-4 rounded-full"
              style={{
               width: `${porcentaje}%`,
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
              {total - completadas} lugares más
            </span>{" "}
            y obten una promo en
            <span className="text-primary font-semibold "> BiCitas</span>
          </p>
        </div>
         {fecha_expiracion && (
            <p className="text-xs text-center text-gray-500">
             Tienes {getDaysLeft(fecha_expiracion)} días restantes para completar el reto.
            </p>
          )}
        {/* Lugares */}
        <div className="flex flex-col gap-y-2 mt-2">
          <p className="text-texto font-bold text-lg ">Lugares</p>
     

          {lugaresCombinados.length > 0 ? (
            lugaresCombinados.map((lugar, idx) => (
              <BoxPlace
                key={lugar.id || idx}
                nombre_lugar={lugar.nombre_lugar}
                imagen_lugar={lugar.imagen_lugar}
                visitado={lugar.visitado}
                fecha_visita={lugar.fecha_visita}
                fecha_expiracion={fecha_expiracion}
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
