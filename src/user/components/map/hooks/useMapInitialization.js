import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export const useMapInitialization = ({
  mapRef,
  mapContainerRef,
  center,
}) => {
  useEffect(() => {
    if (mapRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: import.meta.env.VITE_MAPBOX_STYLE,
      center,
      zoom: 16,
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
};