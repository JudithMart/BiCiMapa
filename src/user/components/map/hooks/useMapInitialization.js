// useMapInitialization.js
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export const useMapInitialization = ({ mapRef, mapContainerRef, center, setMapReady }) => {
  useEffect(() => {
    if (mapRef.current) return;
    if (!mapContainerRef.current) return; // Wait until the container is available

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: import.meta.env.VITE_MAPBOX_STYLE,
      center,
      zoom: 16,
    });

    map.on("load", () => {
      setMapReady(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapContainerRef]);
};
