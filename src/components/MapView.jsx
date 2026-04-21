import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { createRoot } from "react-dom/client";
import { MdDirectionsBike } from "react-icons/md";
import { GiDutchBike } from "react-icons/gi";

import { placeTypes } from "../config/placeTypes";
import { getPlaces } from "../services/lugar.service";
import { getCurrentUser } from "../services/auth.service";
import Card from "./Card";

function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]);
  const userLocationRef = useRef(null);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const userMarkerRef = useRef(null);
  const routeCoordinatesRef = useRef(null);

  const lastRecalcRef = useRef(0);

  const selectedPlaceRef = useRef(null);
  // Estado para el usuario
  //--------
  const [user, setUser] = useState(null);
    // Obtener usuario solo una vez al montar
    useEffect(() => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    }, []);
  useEffect(() => {
    selectedPlaceRef.current = selectedPlace;
  }, [selectedPlace]);
  //------------
  //------------
  // Animación de rutas

  let progress = 0;

  const animateRoute = (coordinates, place) => {
    const partialRoute = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    };

    // Eliminar si ya existe
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    mapRef.current.addSource("route", {
      type: "geojson",
      data: partialRoute,
    });

    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      paint: {
        "line-color": place.tipo?.color_hex || "#B57A86",
        "line-width": 4,
        "line-opacity": 0.8,
      },
    });

    function step() {
      if (progress < coordinates.length) {
        partialRoute.geometry.coordinates.push(coordinates[progress]);

        mapRef.current.getSource("route").setData(partialRoute);

        progress++;
        requestAnimationFrame(step);
      }
    }

    step();
  };

  //------------

  // Estado para minutos y km de la ruta
  const [routeInfo, setRouteInfo] = useState({ minutes: null, km: null });

  const allende = {
    name: "Allende 527",
    lng: -101.19633730177365,
    lat: 19.701918925746046,
  };

  //------------
  // Solo dibuja la ruta visual, no calcula minutos/km
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
    routeCoordinatesRef.current = route.coordinates;

    // ANIMACIÓN
    progress = 0;
    animateRoute(route.coordinates);

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
  //------------
  //------------
  // Función para detectar si el usuario se salió de la ruta (umbral de ~30m)
  const isUserOffRoute = (userCoords) => {
    if (!routeCoordinatesRef.current) return false;

    const threshold = 0.0003; // ≈ 30 metros

    return !routeCoordinatesRef.current.some((coord) => {
      const distance = Math.sqrt(
        Math.pow(coord[0] - userCoords[0], 2) +
          Math.pow(coord[1] - userCoords[1], 2),
      );
      return distance < threshold;
    });
  };
  //------------
  //------------
  // Calcular minutos/km automáticamente al abrir la Card
  useEffect(() => {
    const fetchRouteInfo = async () => {
      if (!selectedPlace || !userLocationRef.current) {
        setRouteInfo({ minutes: null, km: null });
        return;
      }
      const start = userLocationRef.current;
      const end = [selectedPlace.longitud, selectedPlace.latitud];
      const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        const duration = data.routes[0].duration; // segundos
        const distance = data.routes[0].distance; // metros
        const minutes = Math.ceil(duration / 60);
        const km = (distance / 1000).toFixed(2);
        setRouteInfo({ minutes, km });
      } catch (e) {
        setRouteInfo({ minutes: null, km: null });
      }
    };
    fetchRouteInfo();
  }, [selectedPlace]);
  //------------

  //------------

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

  //------------
  //------------

  const getIcon = (type) => {
    const Icon = placeTypes[type]?.icon;

    if (!Icon) return <span>📍</span>;

    return <Icon />;
  };

  //------------
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

    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoords = [longitude, latitude];

          const prev = userLocationRef.current;
          userLocationRef.current = newCoords;

          // Si ya existe marcador → solo lo movemos
          if (userMarkerRef.current) {
            userMarkerRef.current.setLngLat(newCoords);
          } else {
            // Crear marcador solo una vez
            const el = document.createElement("div");
            const root = createRoot(el);
            // Ubicación
            root.render(
              <>
                <div className="absolute w-7 h-7 bg-[#B57A86] rounded-full animate-pulse"></div>
                <div className="text-white text-sm bg-[#B57A86] rounded-full p-2 shadow-lg">
                  <MdDirectionsBike />
                </div>
              </>,
            );

            userMarkerRef.current = new mapboxgl.Marker(el)
              .setLngLat([longitude, latitude])
              .addTo(mapRef.current);
          }

          if (routeCoordinatesRef.current && selectedPlaceRef.current) {
            const offRoute = isUserOffRoute(newCoords);

            if (offRoute) {
              const now = Date.now();

              if (now - lastRecalcRef.current > 5000) {
                // 5 segundos
                console.log("Recalculando ruta...");
                drawRoute(selectedPlaceRef.current);
                lastRecalcRef.current = now;
              }
            }
          }
          if (!mapRef.current) return;
          if (
            !prev ||
            Math.abs(prev[0] - longitude) > 0.0001 ||
            Math.abs(prev[1] - latitude) > 0.0001
          ) {
            mapRef.current.easeTo({
              center: [longitude, latitude],
              duration: 500,
            });
          }
        },
        (error) => {
          console.error("Error ubicación:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        },
      );
    }

    map.on("load", () => {
      const el = document.createElement("div");
      const root = createRoot(el);
      // Ubicación BiCitas
      root.render(
        <div className="marker-content w-8 h-10">
          <img
            className="w-full h-full animate-soft-bounce"
            src="/Logos/Ubicación-logo.png"
            alt="BiCita"
          />
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

  //------------
  //------------

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Crear marcadores de lugares
    places.forEach((place) => {
      const el = document.createElement("div");
      const root = createRoot(el);
      root.render(
        <button onClick={() => setSelectedPlace(place)}>
          <div className="flex flex-col items-center transition-all duration-200 marker-content">
            {/* CÍRCULO PRINCIPAL */}
            <div
              className={`relative flex items-center justify-center rounded-full ${
                place.es_convenio
                  ? " w-8 h-8 shadow-md"
                  : " 7 w-7 h-7 opacity-80"
              }`}
              style={{
                backgroundColor: place.es_convenio
                  ? place.tipo?.color_hex
                  : "#fff",
                color: place.es_convenio ? "#fff" : place.tipo?.color_hex,
                border: `1px solid ${place.tipo?.color_hex}40`,
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

    // Función para actualizar el scale de todos los marcadores .marker-content
    const updateAllMarkerScale = () => {
      if (!mapRef.current) return;
      const zoom = mapRef.current.getZoom();
      const scale = Math.max(1, zoom / 12);
      // Selecciona todos los marker-content (lugares y BiCitas)
      const allMarkers = document.querySelectorAll(".marker-content");
      allMarkers.forEach((content) => {
        content.style.transform = `scale(${scale})`;
        content.style.transformOrigin = "center";
      });
    };

    mapRef.current.on("zoom", updateAllMarkerScale);
    updateAllMarkerScale();

    return () => {
      if (mapRef.current) {
        mapRef.current.off("zoom", updateAllMarkerScale);
      }
    };
  }, [places]);
  //------------

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
            minutes={routeInfo.minutes}
            km={routeInfo.km}
            es_premium={user?.user?.user_metadata?.es_premium}
          />
        </div>
      )}
    </>
  );
}

export default MapView;
