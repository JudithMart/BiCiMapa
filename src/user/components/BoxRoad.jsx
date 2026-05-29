import React, { useState } from "react";
import { MdOutlineDirections } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import ButtonGray from "../../shared/components/ButtonGray";

function BoxRoad({
  nombre,
  descripcion,
  tiempo,
  distancia,
  lugares = [],
  onClick,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left rounded-xl transition-all"
      >
        <div
          className="relative z-10 flex justify-between gap-4 px-4 py-3 rounded-xl
         bg-secundary border-2 border-[#F6B4B7]"
        >
          <div className="flex gap-4">
            <div className="flex mt-1 items-center justify-center rounded-full bg-primary/20 h-8 w-8">
              <MdOutlineDirections className="w-5 h-5 text-primary" />
            </div>

            <div className="flex flex-col">
              <p className="text-texto font-medium text-base">{nombre}</p>

              <p className="text-gray-500 text-[12px]">Tiempo: {tiempo}</p>

              <p className="text-gray-500 text-[12px]">
                Distancia: {distancia} km
              </p>
            </div>
          </div>

          <ChevronDown
            className={`transition-transform text-[#F6B4B7] ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* DETALLE */}
      {open && (
        <div className=" px-1 py-3 mx-2  ">
          <p className="text-sm text-texto">{descripcion}</p>
          <div className="mt-3 flex flex-wrap gap-2 ">
            {lugares
              .slice() // para no mutar el array original
              .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
              .map((lugar) => (
                <span
                  key={lugar.id}
                  className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full"
                >
                  {lugar.orden}.- {lugar.nombre}
                </span>
              ))}
          </div>{" "}
          <ButtonGray
            onClick={onClick}
            texto={
              <span className="flex justify-center  gap-2">
                <MdOutlineDirections className="w-5 h-5" />
                Ruta
              </span>
            }
            px="px-7"
            mt="mt-4"
          ></ButtonGray>
        </div>
      )}
    </div>
  );
}

export default BoxRoad;
