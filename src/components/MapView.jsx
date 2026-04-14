import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { createRoot } from "react-dom/client";
import { MdDirectionsBike } from "react-icons/md";

import { placeTypes } from "../config/placeTypes";
import { getPlaces } from "../services/lugar.service";

function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]);

  //PRUEBAS
  // const locations = [
  //   { lng: -101.195, lat: 19.7045 },
  //   { lng: -101.19, lat: 19.7 },
  // ];

  const allende = {
    name: "Allende 527",
    lng: -101.19633730177365,
    lat: 19.701918925746046,
  };

  //PRUEBAS
  // const bathrooms = [
  //   {
  //     name: "Baños Públicos Pintor",
  //     lng: -101.1935,
  //     lat: 19.7038,
  //   },
  //   {
  //     name: "Baños Antonio Alzate",
  //     lng: -101.1927,
  //     lat: 19.7042,
  //   },
  //   {
  //     name: "Baños Mercado Revolución",
  //     lng: -101.192,
  //     lat: 19.7029,
  //   },
  //   {
  //     name: "Baños Nicolás Bravo",
  //     lng: -101.1942,
  //     lat: 19.7051,
  //   },
  //   {
  //     name: "Baños DIF Centro",
  //     lng: -101.1939,
  //     lat: 19.7049,
  //   },
  // ];

  useEffect(() => {
    const fetchPlaces = async () => {
      const { places, error } = await getPlaces();

      if (error) {
        console.error(error);
        return;
      }

      setPlaces(places);
    };

    fetchPlaces();
  }, []);

  const getIcon = (type) => {
    const Icon = placeTypes[type]?.icon;

    if (!Icon) return <span>📍</span>;

    return <Icon />;
  };
  useEffect(() => {
    if (mapRef.current) return; // evita múltiples inicializaciones

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: import.meta.env.VITE_MAPBOX_STYLE,
      center: [-101.195, 19.7045], // Morelia
      zoom: 17,
    });

    mapRef.current = map;

    //Por cada ubicación, crea un marcador con el icono de café prueba
    // locations.forEach((loc) => {
    //   const el = document.createElement("div");
    //   const root = createRoot(el);
    //   root.render(
    //     // <img className="w-8 h-10 flex items-center justify-center" src="/Ubicaciones/Cafe.png" alt="BiCita"></img>
    //     <div className="text-[#B57A86] text-2xl bg-white rounded-full p-1 shadow-md flex items-center justify-center w-8 h-8">
    //       <GiCoffeeCup />
    //     </div>,
    //     // text-[#6F4E37]
    //   );
    //   new mapboxgl.Marker(el)
    //     .setLngLat([loc.lng, loc.lat])
    //     .addTo(mapRef.current);
    // });

    // Por cada baño, crea un marcador personalizado PRUEBAS
    // bathrooms.forEach((place) => {
    //   const el = document.createElement("div");

    //   const root = createRoot(el);
    //   root.render(
    //     <div className="text-[#B57A86] text-xl bg-white rounded-full p-1 shadow-md">
    //       <LuToilet />
    //     </div>,
    //   );

    //   new mapboxgl.Marker(el)
    //     .setLngLat([place.lng, place.lat])
    //     .addTo(mapRef.current);
    // });

    // Solicitar permiso de ubicación al usuario solo una vez por sesión
    if (
      navigator.geolocation &&
      !sessionStorage.getItem("ubicacionSolicitada")
    ) {
      sessionStorage.setItem("ubicacionSolicitada", "true");
      if (
        window.confirm(
          "¿Permites que la aplicación acceda a tu ubicación para mostrarte en el mapa?",
        )
      ) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            const el = document.createElement("div");
            const root = createRoot(el);
            root.render(
              <>
                {/* Ubicación del usuario */}
                <div className="absolute w-8 h-8 bg-[#B57A86] rounded-full animate-pulse"></div>
                <div className="text-white text-lg bg-[#B57A86] rounded-full p-2 shadow-lg ">
                  <MdDirectionsBike />
                </div>
              </>,
            );

            new mapboxgl.Marker(el)
              .setLngLat([longitude, latitude])
              .addTo(mapRef.current);

            //  centrar mapa
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 17,
            });
          },
          (error) => {
            alert("No se pudo obtener la ubicación: " + error.message);
          },
        );
      }
    }

    map.on("load", () => {
      const el = document.createElement("div");
      const root = createRoot(el);

      root.render(
        <div className="relative  ">
          {/* Ubicación BiCitas */}
          <img
            className="w-8 h-10 flex items-center justify-center animate-soft-bounce"
            src="/Logos/Ubicación-logo.png"
            alt="BiCita"
          ></img>
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

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    places.forEach((place) => {
      const el = document.createElement("div");
      const root = createRoot(el);
    {/* Iconos por tipo */}
      root.render(
      
        <div className="flex flex-col items-center">
          <div
            className={` rounded-full flex items-center justify-center${place.es_convenio ? " shadow-md w-7 h-7" : "w-11 h-11"}`}
            style={
              place.es_convenio
                ? {
                    backgroundColor: place.tipo?.color_hex,
                    color: "#fff",
                    border: `1px solid ${place.tipo?.color_hex}`,
                  }
                : {
                    backgroundColor: "",
                    color: place.tipo?.color_hex,
                    border: "none",
                  }
            }
          >
            {getIcon(place.id_tipo)}
          </div>
          {place.es_convenio && (
            <span
              className="text-[8px] mt-[3px] px-2 py-[2px] rounded-full font-extralight shadow-sm whitespace-nowrap"
              style={{
                backgroundColor: "#fff",
                color: place.tipo?.color_hex,
              }}
            >
              {place.nombre}
            </span>
          )}
        </div>
      );

      const marker = new mapboxgl.Marker(el)
        .setLngLat([place.longitud, place.latitud])
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });
  }, [places]);

  return <div ref={mapContainerRef} className="w-full h-[100dvh]" />;
}

export default MapView;
