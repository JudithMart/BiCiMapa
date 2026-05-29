import React from "react";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BoxCuopon({ nombre, descripcion, descuento, id, imagen_lugar }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/validacion/${id}`, {
      state: {
        nombreLugar: nombre,
        descripcion,
        descuento,
        imagenLugar: imagen_lugar,
      },
    });
  };

  return (
    <button
      className="flex items-center gap-4 rounded-xl shadow-md p-3 bg-white/90 
      transition-transform duration-150 active:scale-90  focus:outline-none"
      type="button"
      onClick={handleClick}
    >
      <div className="bg-primary/70 flex items-center justify-center rounded-full w-20 h-14">
        <Ticket className=" w-10 h-10 text-white" />
      </div>

      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col w-full items-start">
          <p className="font-bold text-texto uppercase">{descuento}</p>
          <p className="font-light text-texto text-sm ">{descripcion}</p>
        </div>
        <span className="px-2 py-1 text-xs text-[#16A34A] font-medium rounded">
          Canjear
        </span>
      </div>
    </button>
  );
}

export default BoxCuopon;
