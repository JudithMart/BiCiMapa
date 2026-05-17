import React, { useState, useEffect } from "react";

import { MdOutlineDiscount, MdOutlineDirections } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Heart, Ticket } from "lucide-react";
import ButtonPink from "../../shared/components/ButtonPink";
import ButtonGray from "../../shared/components/ButtonGray";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { addFavorito, removeFavorito } from "../../services/lugar.service";

function Card({
  image,
  title,
  slogan,
  tipo,
  promotion,
  onRouteClick,
  minutes,
  km,
  es_premium,
  id_lugar,
  id_usuario,
  favorite,
  slug
}) {
  const navigate = useNavigate();
  // Estado local para saber si es favorito
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [loadingFav, setLoadingFav] = useState(false);

  // Consultar si el lugar es favorito al montar
  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  // Función para agregar/quitar favorito

  const handleFavorite = async () => {
    if (!id_usuario || loadingFav) return;

    setLoadingFav(true);

    try {
      if (isFavorite) {
        await removeFavorito(id_usuario, id_lugar);
        setIsFavorite(false);
      } else {
        const { error } = await addFavorito(id_usuario, id_lugar);

        if (error && error.code !== "23505") {
          // duplicate
          console.error(error);
          return;
        }

        setIsFavorite(true);
      }
    } finally {
      setLoadingFav(false);
    }
  };

  // Lógica para tipos usando tipo como objeto
  const tipoNombre = tipo?.nombre?.toLowerCase?.() || "";
  const esBaño = tipoNombre === "baño";
  const esCiclopuerto = tipoNombre === "ciclopuerto";

  // Imagen por tipo
  let imagenMostrar = image;
  if (esBaño) imagenMostrar = "/Tipos/2/tipo2_baño.jpg";
  if (esCiclopuerto) imagenMostrar = "/Tipos/4/tipo4_ciclopuerto.jpg";

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

      {/* Icono de favorito */}
      <button
        onClick={handleFavorite}
        disabled={loadingFav}
        className={`absolute top-3 right-5 text-xl 
    ${!id_usuario ? "opacity-50 cursor-not-allowed" : ""}
    ${isFavorite ? "text-primary" : "text-gray-500"}`}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <FaHeart
          className={
            isFavorite ? "fill-primary" : "stroke-gray-400 fill-gray-500"
          }
        />
      </button>
      <div className="flex gap-4 mt-8 w-full  rounded-2xl z-10 relative">
        <img
          src={imagenMostrar}
          alt={title}
          className="w-24 h-24 md:w-48 md:h-48 object-cover rounded-xl flex-shrink-0"
        />
        <div>
          {/* TÍTULO */}
          <p className="text-texto font-semibold text-xl">{title}</p>

          {/* SLOGAN (highlight emocional) */}
          <p className="text-[#B57A86]  text-base mt-1 leading-snug line-clamp-2">
            {slogan}
          </p>


          {/* TIPO  */}
          <p className="text-gray-400 text-xs mt-2 tracking-wide">
            {tipo?.nombre?.toUpperCase()}
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
                <TbLock className="text-[13px]" />
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
        className={`z-10 py-5 -mt-8 shadow-sm ${!es_premium && !esBaño && !esCiclopuerto ? "opacity-50 pointer-events-none" : ""} 
        ${esBaño || esCiclopuerto ? "flex justify-center" : "flex justify-between"}`}
      >
        <ButtonGray
          texto={
            <span className="flex items-center gap-2">
              <MdOutlineDirections className="w-5 h-5" />
              Dirección
            </span>
          }
          px="px-7"
          onClick={() => onRouteClick()}
        />
        {/* Solo mostrar promociones si NO es baño ni ciclopuerto */}
        {!(esBaño || esCiclopuerto) && (
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
              navigate(`/promociones/${slug}`);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Card;
