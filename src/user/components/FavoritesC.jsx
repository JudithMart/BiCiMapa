import React from "react";
import BoxPromotion from "./BoxPromotion";

function FavoritesC({ lugaresFavoritos, es_premium }) {
  return (
    <div
      className="flex flex-col h-dvh bg-cover bg-center"
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      {/* HEADER  */}
      <div className="py-8 mt-1 w-full bg-[#ffffff]/75 flex items-center rounded-b-2xl shadow-lg">
        <div className="rounded-full w-40 h-[85px]">
          <img className="h-full w-full" src="\Avatar\Avatar.png" />
        </div>
        <div className="-ml-5 text-2xl font-bold tracking-wider">
          <p className="text-texto ">Tus lugares </p>
          <p className="text-primary font-light"> favoritos</p>
        </div>
      </div>
      {/* LISTA */}
      <div className="flex-1 overflow-y-auto px-3 py-5 mt-4 pb-24">
        <div className="flex flex-col gap-y-2">
          {lugaresFavoritos && lugaresFavoritos.length > 0 ? (
           lugaresFavoritos.map((lugar) => {
              const tipoNombre = lugar.tipo?.nombre?.toLowerCase?.() || "";
              const esBaño = tipoNombre === "baño";
              const esCiclopuerto = tipoNombre === "ciclopuerto";
              let imagenMostrar = lugar.imagen_url || "/placeholder.png";
              if (esBaño) imagenMostrar = "/Tipos/2/tipo2_baño.jpg";
              if (esCiclopuerto) imagenMostrar = "/Tipos/4/tipo4_ciclopuerto.jpg";
              return (
                <BoxPromotion
                  key={lugar.id}
                  nombre={lugar.nombre || "Lugar sin nombre"}
                  imagen_lugar={imagenMostrar}
                  total_promociones={lugar.total_promociones || 0}
                  tipo={lugar.tipo?.nombre || "Sin tipo"}
                  tipoColor={lugar.tipo?.color_hex || "#000"}
                  slug={lugar.slug || ""}
                  es_premium={es_premium}
                />
              );
            })
          ) : (
            <p className="text-gray-500">No hay lugares favoritos.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesC;
