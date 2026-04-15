import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { createRoot } from "react-dom/client";
import { MdDirectionsBike } from "react-icons/md";
import { GiDutchBike } from "react-icons/gi";

import { placeTypes } from "../config/placeTypes";
import { getPlaces } from "../services/lugar.service";
import Card from "./Card";

function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]);
  const userLocationRef = useRef(null);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const userMarkerRef = useRef(null);

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

  //Funcion para trazar ruta
  const drawRoute = async (place) => {
    if (!userLocationRef.current) {
      alert("Ubicación no disponible");
      return;
    }

    const start = userLocationRef.current;
    const end = [place.longitud, place.latitud];

    const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const res = await fetch(url);
    const data = await res.json();

    const route = data.routes[0].geometry;

    // Si ya existe una ruta, eliminarla
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    // Agregar ruta
    mapRef.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: route,
      },
    });

    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": place.tipo?.color_hex || "#B57A86",
        "line-width": 4,
        "line-opacity": 0.8,
      },
    });

    // Ajustar vista
    const bounds = new mapboxgl.LngLatBounds();
    route.coordinates.forEach((coord) => bounds.extend(coord));

    mapRef.current.fitBounds(bounds, {
      padding: 80,
    });
  };

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
      center: allende, // Morelia
      zoom: 16,
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

    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          userLocationRef.current = [longitude, latitude];

          // Si ya existe marcador → solo lo movemos
          if (userMarkerRef.current) {
            userMarkerRef.current.setLngLat([longitude, latitude]);
          } else {
            // Crear marcador solo una vez
            const el = document.createElement("div");
            const root = createRoot(el);

            root.render(
              <>
                <div className="absolute w-8 h-8 bg-[#B57A86] rounded-full animate-pulse"></div>
                <div className="text-white text-lg bg-[#B57A86] rounded-full p-2 shadow-lg">
                  <MdDirectionsBike />
                </div>
              </>,
            );

            userMarkerRef.current = new mapboxgl.Marker(el)
              .setLngLat([longitude, latitude])
              .addTo(mapRef.current);
          }
          const prev = userLocationRef.current;
          if (
            !prev ||
            Math.abs(prev[0] - longitude) > 0.0001 ||
            Math.abs(prev[1] - latitude) > 0.0001
          ) {
            mapRef.current.easeTo({
              center: [longitude, latitude],
              duration: 1000,
            });
          }
        },
        (error) => {
          console.error("Error ubicación:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        },
      );
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
      if (watchId) navigator.geolocation.clearWatch(watchId);
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
      {
        /* Iconos por tipo */
      }
      root.render(
        <button onClick={() => setSelectedPlace(place)}>
          <div className="flex flex-col items-center transition-all duration-200">
            {/* CÍRCULO PRINCIPAL */}
            <div
              className={`relative flex items-center justify-center rounded-full ${
                place.es_convenio ? "w-9 h-9 shadow-md" : "w-7 h-7 opacity-80"
              }`}
              style={{
                backgroundColor: place.es_convenio
                  ? place.tipo?.color_hex
                  : "#fff",
                color: place.es_convenio ? "#fff" : place.tipo?.color_hex,
                border: `1px solid ${place.tipo?.color_hex}40`, // más sutil en no convenio
              }}
            >
              {getIcon(place.id_tipo)}

              {/*  SOLO CONVENIO */}
              {place.es_convenio && (
                <span className="absolute font-semibold -top-1 -right-1 text-[12px] bg-white text-[#B57A86] rounded-full px-1 shadow-sm">
                  <GiDutchBike />
                </span>
              )}
            </div>

            {/* PUNTA TIPO PIN */}
            <div
              className={`rotate-45 -mt-1 ${
                place.es_convenio ? "w-2 h-2" : "w-1.5 h-1.5 opacity-60"
              }`}
              style={{
                backgroundColor: place.tipo?.color_hex,
              }}
            />

            {/* NOMBRE SOLO PARA CONVENIO */}
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
        </button>,
      );

      const marker = new mapboxgl.Marker(el)
        .setLngLat([place.longitud, place.latitud])
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });
  }, [places]);

  return (
    <>
      {/* MAPA */}
      <div ref={mapContainerRef} className="w-full h-[100dvh]" />
      {/* TEXTURA (overlay) */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[100]" />

      {/* CARD OVERLAY */}
      {selectedPlace && (
        <div className="fixed bottom-28 left-0 right-0 z-50 flex justify-center px-4 animate-slide-up">
          <Card
            image={selectedPlace.imagen_url}
            title={selectedPlace.nombre}
            slogan={selectedPlace.slogan}
            description={selectedPlace.descripcion}
            tipo={selectedPlace.tipo?.nombre}
            direction={selectedPlace.direccion}
            promotion={
              selectedPlace.promocion?.length
                ? selectedPlace.promocion[0].descripcion
                : null
            }
            onClose={() => setSelectedPlace(null)}
            onRouteClick={() => drawRoute(selectedPlace)}
          />
        </div>
      )}
    </>
  );
}

export default MapView;
