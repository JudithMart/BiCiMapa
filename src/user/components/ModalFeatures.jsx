import React from "react";
import ButtonGray from "../../shared/components/ButtonGray";
import {  MdOutlineDirections } from "react-icons/md";
import ButtonPink from "../../shared/components/ButtonPink";

function ModalFeatures({ novedades, onRouteClickDirection }) {
  return (
    <div
      className="relative flex flex-col rounded-3xl px-5 py-5 w-full max-w-[650px]  }
      shadow-lg bg-cover bg-center "
      style={{
        backgroundImage: "url('/Fondos/FondoBicis.jpeg')",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      <p className="text-2xl text-center mt-5 text-texto font-semibold">
        Novedades en <span className="font-extralight text-primary">BiCitas</span>{" "}
        Históricas
      </p>

      <div
        className=" mt-5 flex flex-col justify-center items-center gap-3 px-4 py-3 rounded-xl
         bg-[#EDD1A1]/20 border-2 border-[#EBCB8B]"
      >
        {/* Titulo de novedades  */}
        <p className="text-lg font-bold text-texto uppercase">
          {novedades?.titulo }
        </p>
        {/* Descripcion de novedades */}
        <p className="text-base font-light text-texto">
          {novedades?.descripcion }
        </p>
        <button
          className=" mt-4 text-sm font-light text-green-800 underline hover:text-green-800/80 transition-colors"
          onClick={() => window.open(novedades?.url, "_blank")}
        >
          Conocer más
        </button>
      </div>

      <ButtonPink
        texto={
          <span className="flex items-center justify-center gap-2">
            <MdOutlineDirections className="w-5 h-5" />
            Ir a BiCitas
          </span>
        }
        px="px-7"
        mt="mt-10"
       onClick={() => onRouteClickDirection()}
      ></ButtonPink>
   
    </div>
  );
}

export default ModalFeatures;
