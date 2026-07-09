import React from "react";
import { useNavigate } from "react-router-dom";
import { LuBike } from "react-icons/lu";
import BoxPlace from "./BoxPlace";
import { getDaysLeft } from "../../services/user_premium.service";
import { MdOutlineDirections } from "react-icons/md";
import ButtonPink from "../../shared/components/ButtonPink";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";
import Progress from "./Progress";

function ProfileC({
  nombre,
  descripcion_reto,
  lugares_visitados,
  lugares_reto,
  fecha_expiracion,
  es_premium,
}) {
  const navigate = useNavigate();
  const { setUserAuth, setUserData } = useAuth();
  // Handler para cerrar sesión
  const handleLogout = async () => {
    await logoutUser();
    setUserAuth(null);
    setUserData(null);
    navigate("/");
  };
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
  // Procesar el nombre para mostrarlo en partes y el último apellido en color
  const nombreParts = (nombre || "").trim().split(/\s+/);
  let nombre1 = "",
    nombre2 = "",
    apellido1 = "",
    apellido2 = "";
  if (nombreParts.length >= 4) {
    [nombre1, nombre2, apellido1, apellido2] = nombreParts;
  } else if (nombreParts.length === 3) {
    [nombre1, apellido1, apellido2] = nombreParts;
  } else if (nombreParts.length === 2) {
    [nombre1, apellido1] = nombreParts;
  } else if (nombreParts.length === 1) {
    [nombre1] = nombreParts;
  }

  return (
    <div
      className="relative flex flex-col w-full h-dvh bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      {/* Botón de cerrar sesión */}
      <button
        className="absolute top-12 right-4 z-50    transition-colors"
        title="Cerrar sesión"
        onClick={handleLogout}
        name="Cerrar sesión"
      >
        <IoLogOutOutline className="text-primary" size={24} />
      </button>
      <div className="py-8  mt-1 w-full bg-[#ffffff]/75 flex items-center rounded-b-2xl shadow-lg ">
        <div className="rounded-full ml-5 w-24 aspect-square overflow-hidden flex items-center justify-center  shadow-md">
          <img
            className="object-cover w-full h-full"
            src="/Avatar/Avatar.png"
            alt="Avatar"
          />
        </div>
        <div>
          <p className="text-texto ml-3 text-2xl font-bold">
            {/* Mostrar nombres y apellidos, el último en color primario */}
            {nombre1} {nombre2} {apellido1}
            {apellido2 && <span className="text-primary"> {apellido2}</span>}
          </p>
        </div>
      </div>
      <div className="mt-5 relative flex flex-col justify-center px-3 py-5 w-full flex-1 min-h-0 overflow-y-auto pb-24">
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
          <Progress
            completadas={completadas}
            total={total}
            porcentaje={porcentaje}
            texto="visitados"
            mostrarTitulo={true}
            colorTexto="primary"
            tamanoTexto="base"
          />
        </div>
        {fecha_expiracion && (
          <div>
            <p className="text-sm text-center text-gray-500 mt-2">
              Tienes{" "}
              <span className="text-primary font-bold">
                {getDaysLeft(fecha_expiracion)} días
              </span>{" "}
              restantes para completar el reto.
            </p>
            {descripcion_reto && (

              <p className="text-base font-semibold italic text-center text-[#6F4E37] mt-2  bg-white">
                {descripcion_reto}
              </p>
            )}
          </div>
        )}
        {/* Lugares */}
        <div className="flex flex-col gap-y-2 mt-2">
          {/* <p className="text-texto font-thin text-lg ">Lugares</p> */}

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
