import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { createRoot } from "react-dom/client";
import { LuToilet } from "react-icons/lu";
import { MdDirectionsBike } from "react-icons/md";

function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const locations = [
    { lng: -101.195, lat: 19.7045 },
    { lng: -101.19, lat: 19.7 },
  ];

  const allende = {
    name: "Allende 527",
    lng: -101.19633730177365,
    lat: 19.701918925746046,
  };
 

  const bathrooms = [
    {
      name: "Baños Públicos Pintor",
      lng: -101.1935,
      lat: 19.7038,
    },
    {
      name: "Baños Antonio Alzate",
      lng: -101.1927,
      lat: 19.7042,
    },
    {
      name: "Baños Mercado Revolución",
      lng: -101.192,
      lat: 19.7029,
    },
    {
      name: "Baños Nicolás Bravo",
      lng: -101.1942,
      lat: 19.7051,
    },
    {
      name: "Baños DIF Centro",
      lng: -101.1939,
      lat: 19.7049,
    },
  ];

  useEffect(() => {
    if (mapRef.current) return; // evita múltiples inicializaciones

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      //   style: "mapbox://styles/mapbox/light-v11",
      center: [-101.195, 19.7045], // Morelia
      zoom: 17,
    });

    mapRef.current = map;

    //Por cada ubicación, crea un marcador
    locations.forEach((loc) => {
      const el = document.createElement("div");
      el.className =
        "w-6 h-6 bg-[#B57A86] rounded-full border-2 border-white shadow-md";
      new mapboxgl.Marker(el)
        .setLngLat([loc.lng, loc.lat])
        .addTo(mapRef.current);
    });

    // Por cada baño, crea un marcador personalizado
    bathrooms.forEach((place) => {
      const el = document.createElement("div");

      const root = createRoot(el);
      root.render(
        <div className="text-[#B57A86] text-xl bg-white rounded-full p-1 shadow-md">
          <LuToilet />
        </div>,
      );

      new mapboxgl.Marker(el)
        .setLngLat([place.lng, place.lat])
        .addTo(mapRef.current);
    });

    // Obtener ubicación del usuario y marcarla

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const el = document.createElement("div");

      const root = createRoot(el);
      root.render(
        <div className="text-white text-lg bg-[#B57A86] rounded-full p-2 shadow-lg">
          <MdDirectionsBike />
        </div>,
      );

      new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);

      //  centrar mapa
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 17,
      });
    });

    // Ocultar POIs para un mapa más limpio
    map.on("load", () => {
      const layers = map.getStyle().layers;

      layers.forEach((layer) => {
        if (layer.type === "symbol" && !layer.id.includes("road")) {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      });

      //BiCitas
      const el = document.createElement("div");
      const root = createRoot(el);

      root.render(
        <div className="bg-[#B57A86] text-white text-sm px-2 py-1 rounded-full shadow-md">
          🚲
        </div>,
      );

      new mapboxgl.Marker(el)
        .setLngLat([allende.lng, allende.lat])
        .addTo(mapRef.current);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-[100dvh]" />;
}

export default MapView;

