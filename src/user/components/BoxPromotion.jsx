import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TbLock } from "react-icons/tb";

function BoxPromotion({ nombre, imagen_lugar, total_promociones, slug, es_premium }) {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Clicked place with slug:", slug);
    navigate(`/promociones/${slug}`);
  };

  return (
    <div className="relative w-full">
      <button
        className="relative flex items-center gap-4 rounded-xl shadow-md p-3 bg-white/90 transition-transform duration-150 active:scale-90
         focus:outline-none w-full "
        onClick={handleClick}
        type="button"
        disabled={!es_premium}
        style={!es_premium ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
      >
        {/* Overlay solo si no es premium */}
        {!es_premium && (
          <div className="absolute inset-0 flex items-center justify-center z-20 rounded-xl">
            <span className="flex gap-2 text-gray-200 text-xs bg-opacity-70 py-2 rounded-xl bg-black px-10 font-bold mb-1">
              <TbLock className="text-[13px]" />
              Visita Bicitas para ver la promo
            </span>
          </div>
        )}
        {imagen_lugar && (
          <img src={imagen_lugar} alt={nombre} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
        )}
        <div className="flex justify-between w-full items-center">
          <div className="mt-2">
            <p className="text-texto font-semibold text-base">{nombre}</p>
          </div>
          <div className="flex flex-col items-end ml-8 bg-[#F0FDF4]">
            <span className="px-2 py-1 text-xs text-[#16A34A] font-medium rounded">
              {total_promociones} promociones
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

export default BoxPromotion;