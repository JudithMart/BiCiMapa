// src/user/components/map/hooks/usePlaceMarkers.jsx
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { GiDutchBike } from "react-icons/gi";

export const usePlaceMarkers = ({
  mapRef,
  places,
  markersRef,
  getIcon,
  onSelectPlace,
  
}) => {
  useEffect(() => {
    if (!mapRef.current) return;

    // Array local de ESTA ejecución del efecto (no el de la ejecución anterior).
    const createdMarkers = [];

    places.forEach((place) => {
      const el = document.createElement("div");

      const root = createRoot(el);


      root.render(
        <button onClick={() => onSelectPlace(place)}>
          <div className="flex flex-col items-center transition-all duration-200 marker-content">

            <div
              className={`relative flex items-center justify-center rounded-full ${
                place.es_convenio
                  ? " w-9 h-9 shadow-md"
                  : "  w-8 h-8 opacity-80"
              }`}
              style={{
                backgroundColor: place.es_convenio
                  ? place.tipo?.color_hex
                  : "#fff",
                color: place.es_convenio
                  ? "#fff"
                  : place.tipo?.color_hex,
                border: `1px solid ${place.tipo?.color_hex}40`,
              }}
            >
              {getIcon(place.id_tipo)}

              {place.es_convenio && (
                <span className="absolute font-semibold -top-1 -right-1 text-[12px] bg-white text-[#B57A86] rounded-full px-1 shadow-sm">
                  <GiDutchBike />
                </span>
              )}
            </div>

            <div
              className={`rotate-45 -mt-1 ${
                place.es_convenio
                  ? "w-2 h-2"
                  : "w-1.5 h-1.5 opacity-60"
              }`}
              style={{
                backgroundColor: place.tipo?.color_hex,
              }}
            />

            {place.es_convenio && (
              <span
                className="text-[9px] mt-[3px] px-2 py-[1px] rounded-full shadow-sm whitespace-nowrap"
                style={{
                  backgroundColor: "#fff",
                  color: place.tipo?.color_hex,
                }}
              >
                {place.nombre}
              </span>
            )}
          </div>
        </button>
      );

      const marker = new mapboxgl.Marker(el)
        .setLngLat([place.longitud, place.latitud])
        .addTo(mapRef.current);

      createdMarkers.push({ marker, root });
    });

    markersRef.current = createdMarkers;

    // Cleanup: se ejecuta automáticamente cuando `places` cambia (antes de
    // crear los markers nuevos) o cuando el componente se desmonta.
    // OJO: no podemos llamar root.unmount() de forma síncrona aquí, porque
    // este cleanup puede caer en medio de un render de la app principal
    // (React lanza "Attempted to synchronously unmount a root while React
    // was already rendering"). Lo diferimos al siguiente tick.
    return () => {
      createdMarkers.forEach(({ marker, root }) => {
        marker.remove();
        setTimeout(() => root.unmount(), 0);
      });
    };
  }, [places]);
};