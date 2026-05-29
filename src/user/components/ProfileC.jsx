import React from "react";
import { useNavigate } from "react-router-dom";
import { LuBike } from "react-icons/lu";
import BoxPlace from "./BoxPlace";
import { getDaysLeft } from "../../services/user_premium.service";
import { MdOutlineDirections } from "react-icons/md";
import ButtonPink from "../../shared/components/ButtonPink";

function ProfileC({
  nombre,
  lugares_visitados,
  lugares_reto,
  fecha_expiracion,
  es_premium,
}) {
  const navigate = useNavigate();
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
  const completadas = lugaresCombinados.filter((l) => l.visitado).length;

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
      <div className=" relative flex flex-col justify-center px-3 py-5 w-full  ">
        {!es_premium && (
          <div
            className="
      absolute inset-0 z-30 mt-16
      flex items-center justify-center
      px-6
    "
          >
            {/* Fondo blur */}
            <div
              className="
        absolute inset-0
        bg-white/35
      "
            />

            {/* Card premium */}
            <div
              className="
        relative z-40
        bg-white/35
        backdrop-blur-md
        border border-white/40
        shadow-2xl
        rounded-3xl
        px-6
        py-7
        max-w-[320px]
        text-center
      "
            >
              <div className="flex justify-center">
                <img
                  src="/Logos/logoB2.png"
                  alt="BiCitas Historicas"
                  className="w-14 h-14 md:w-20 md:h-20 object-cover flex-shrink-0 rounded-lg"
                />
              </div>

              <p className="text-texto text-xl font-bold mt-5">
                Vive la experiencia BiCitas
              </p>

              <p className="text-texto text-sm mt-3 leading-relaxed">
                Completa rutas históricas, desbloquea promociones y explora
                Morelia de una forma diferente.
              </p>

              <ButtonPink
                texto={
                  <span className="flex justify-center  gap-2">
                    <MdOutlineDirections className="w-5 h-5" />
                    Ir a BiCitas
                  </span>
                }
                px="px-7"
                mt="mt-2"
                onClick={() => navigate("/mapa?goto=allende")}
              />
            </div>
          </div>
        )}

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
          {total - completadas === 0 ? (
            <p className="font-light text-texto mt-3 text-sm text-center">
              Felicidades completaste el reto ve a{" "}
              <span className="text-primary font-semibold">BiCitas</span> y
              reclama tu premio
            </p>
          ) : (
            <p className="font-light text-texto mt-3 text-sm">
              Visita{" "}
              <span className="font-semibold">
                {" "}
                {total - completadas} lugares más
              </span>{" "}
              y obten una promo en
              <span className="text-primary font-semibold "> BiCitas</span>
            </p>
          )}
        </div>
        {fecha_expiracion && (
          <p className="text-sm text-center text-gray-500 mt-2">
            Tienes{" "}
            <span className="text-primary font-bold">
              {getDaysLeft(fecha_expiracion)} días
            </span>{" "}
            restantes para completar el reto.
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
