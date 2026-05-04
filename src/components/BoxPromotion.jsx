import React from 'react';
import { useNavigate } from 'react-router-dom';

function BoxPromotion({ nombre, imagen_lugar, total_promociones, slug }) {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Clicked place with slug:", slug);
    navigate(`/promociones/${slug}`);
  };

  return (
    <button
      className="flex items-center gap-4 rounded-xl shadow-md p-3 bg-white/90 transition-transform duration-150 active:scale-95 hover:scale-105 focus:outline-none"
      onClick={handleClick}
      type="button"
    >
      {imagen_lugar && (
        <img src={imagen_lugar} alt={nombre} className="w-16 h-16 object-cover rounded-lg" />
      )}
      <div className="flex justify-between w-full items-center">
        <div className="mt-2">
          <p className="font-bold text-texto">{nombre}</p>
        </div>
        <div className="flex flex-col items-end ml-8">
          <div className="flex bg-[#F0FDF4]">
            <span className="px-2 py-1 text-xs text-[#16A34A] font-medium rounded">
              {total_promociones} promociones
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default BoxPromotion;