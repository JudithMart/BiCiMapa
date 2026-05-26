import React from "react";
import { MdOutlineDirections } from "react-icons/md";

function BoxRoad({ nombre, descripcion, tiempo, distancia }) {
  return (
    <div className="relative z-10 flex gap-4 mt-2 px-4 py-1 rounded-xl bg-secundary border-2 border-[#F6B4B7]">
      {" "}
      <div className=" flex mt-1 items-center justify-center rounded-full bg-primary/20  h-8 w-8">
        <span className="text-primary text-lg">
          <MdOutlineDirections className="w-5 h-5" />
        </span>
      </div>
      <div className="flex flex-col ">
        <p className="text-texto font-medium text-base">{nombre}</p>
        {/* <p className="text-gray-500 font-light text-[12px]">{descripcion}</p> */}
        <p className="text-gray-500 font-light text-[12px]">Tiempo: {tiempo}</p>
        <p className="text-gray-500 font-light text-[12px]">Distancia: {distancia} km</p>
      </div>
    </div>
  );
}

export default BoxRoad;
