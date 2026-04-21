import React, { useState } from "react";

import { MdOutlineDiscount, MdOutlineDirections } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Heart, Ticket } from "lucide-react";
import ButtonPink from "./ButtonPink";
import ButtonGray from "./ButtonGray";
import { useNavigate } from "react-router-dom";

function Card({
  image,
  title,
  slogan,
  description,
  tipo,
  direction,
  promotion,
  cupon,
  onClose,
  onRouteClick,
  minutes,
  km,
  es_premium,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col rounded-3xl px-5
       w-96 md:w-[650px] lg:w-[650px] h-full 
       shadow-lg bg-cover bg-center"
      style={{
        backgroundImage: "url('/Fondos/FondoBicis.jpeg')",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      {/* Overlay gris semitransparente */}
      <div className="absolute inset-0 bg-secundary bg-opacity-10 rounded-3xl pointer-events-none z-0" />

      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500"
      >
        ✕
      </button>
      <div className="flex gap-4 mt-8 w-full  rounded-2xl z-10 relative">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 md:w-48 md:h-48 object-cover rounded-xl flex-shrink-0"
        />
        <div>
          {/* TÍTULO */}
          <p className="text-texto font-semibold text-xl">{title}</p>

          {/* SLOGAN (highlight emocional) */}
          <p className="text-[#B57A86]  text-base mt-1 leading-snug line-clamp-2">
            "{slogan}"
          </p>

          {/* TIPO  */}
          <p className="text-gray-400 text-xs mt-2 tracking-wide">
            {tipo?.toUpperCase()}
          </p>
          {/* TIEMPO */}
          <p className="text-gray-400 text-xs mt-1 tracking-wide">
            {minutes} minutos | {km} km
          </p>
        </div>
      </div>
      {/* PUEDEN SER VARIAS PROMOCIONES  */}

      {promotion && (
        <div className="relative z-10 flex gap-4 mt-5 px-4 py-1 rounded-xl bg-secundary border-2 border-[#F6B4B7]">
          {/* Overlay solo sobre la promoción */}
          {!es_premium && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
            
              <span className="flex gap-2 text-gray-200 text-xs bg-opacity-70 py-2 rounded-xl bg-black px-10 font-bold mb-1">
                  <TbLock  className="text-[13px]"/>
                Visita Bicitas para ver la promo
              </span>
            </div>
          )}
          <div className=" flex mt-1 items-center justify-center rounded-full bg-primary/20  h-8 w-8">
            <span className="text-primary text-lg">
              <MdOutlineDiscount />
            </span>
          </div>
          <div className="flex flex-col ">
            <p className="text-texto font-normal text-base">{promotion}</p>
            {/* LOGICA DEL TIEMPO */}
            <p className="text-gray-500 font-light text-[12px]">
              Tiempo: 3 días
            </p>
          </div>
        </div>
      )}
      <div
        className={`z-10 flex justify-between py-5 -mt-8 shadow-sm ${!es_premium ? "opacity-50 pointer-events-none" : ""}`}
      >
        <ButtonGray
          texto={
            <span className="flex items-center gap-2">
              {es_premium ? (
                <MdOutlineDirections className="w-5 h-5" />
              ) : (
                <TbLock className="w-4 h-4 text-gray-400" />
              )}
              Dirección
            </span>
          }
          px="px-7"
          onClick={() => onRouteClick()}
        />
        <ButtonPink
          texto={
            <span className="flex items-center gap-2">
              {es_premium ? (
                <Ticket className="w-4 h-4 text-white" />
              ) : (
                <TbLock className="w-4 h-4 text-white" />
              )}
              Promociones
            </span>
          }
          px="px-5"
          onClick={() => {
            const slug = title.toLowerCase().replace(/\s+/g, "-");
            navigate(`/lugar/${slug}/cupones`);
          }}
        />
      </div>
    </div>
  );
}

export default Card;
