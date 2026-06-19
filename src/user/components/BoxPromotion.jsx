import React from "react";
import { useNavigate } from "react-router-dom";
import { TbLock } from "react-icons/tb";

function BoxPromotion({
  nombre,
  imagen_lugar,
  total_promociones,
  slug,
  es_premium,
  tipo,
  tipoColor,
  es_convenio,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/promociones/${slug}`);
  };

  // Lógica para tipos usando tipo como string
  const tipoNombre = tipo?.toLowerCase?.() || "";
  const esBaño = tipoNombre === "baño";
  const esCiclopuerto = tipoNombre === "ciclopuerto";

  // Imagen por tipo
  let imagenMostrar = imagen_lugar;
  if (esBaño) imagenMostrar = "/Tipos/2/tipo2_baño.jpg";
  if (esCiclopuerto) imagenMostrar = "/Tipos/4/tipo4_ciclopuerto.jpg";

  return (
    <div className="relative w-full">
      <button
        className="relative flex items-center gap-4 rounded-xl shadow-md p-3
         bg-white/90 transition-transform duration-150 active:scale-90
         focus:outline-none w-full "
        onClick={handleClick}
        type="button"
        disabled={!es_premium || !es_convenio}
        style={!es_premium ? { opacity: 0.7, cursor: "not-allowed" } : {}}
      >
        {/* Overlay solo si no es premium */}
        {!es_premium && (
          <div className="absolute inset-0 flex items-center justify-center z-20 rounded-xl">
            <span className="flex gap-2 text-gray-100 text-xs bg-opacity-75 py-1.5 rounded-xl bg-black px-6 font-bold mb-1">
              <TbLock className="text-2xl" />¡ Pedalea hasta BiCitas y descubre
              esta sorpresa!
            </span>
          </div>
        )}
        {imagenMostrar && (
          <img
            src={imagenMostrar}
            alt={nombre}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex justify-between w-full items-center">
          <div className="mt-2 flex flex-col items-start ">
            <p className="text-texto font-semibold text-base text-left line-clamp-2">
              {nombre}
            </p>
            <p
              className="text-sm  font-light  uppercase"
              style={tipoColor ? { color: tipoColor } : {}}
            >
              {tipo}
            </p>
          </div>
          {es_convenio && (
            <div className="flex flex-col items-end ml-8 bg-[#F0FDF4]">
              <span className="px-2 py-1 text-xs text-[#16A34A] font-medium rounded ">
                {total_promociones} promociones
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

export default BoxPromotion;
