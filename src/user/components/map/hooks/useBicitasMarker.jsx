import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";

export const useBicitasMarker = ({
  mapRef,
  coordinates,
  onClick,
}) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Evita duplicados
    if (markerRef.current) return;

    const el = document.createElement("div");

    const root = createRoot(el);

    root.render(
      <button onClick={onClick}>
        <div className="marker-content w-8 h-10">
          <img
            className="w-full h-full animate-soft-bounce"
            src="/Logos/Ubicación-logo.png"
            alt="BiCita"
          />
        </div>
      </button>
    );

    const marker = new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .addTo(mapRef.current);

    markerRef.current = marker;

    return () => {
      marker.remove();
      markerRef.current = null;
    };
  }, [mapRef, coordinates, onClick]);
};