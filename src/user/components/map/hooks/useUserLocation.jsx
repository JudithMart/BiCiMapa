//userLocation.jsx
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { MdDirectionsBike } from "react-icons/md";
import { findClosestPointIndex } from "../utils/routeProgress";
import { drawProgressRoute,clearRoutes } from "../utils/mapRoutes";

export const useUserLocation = ({
  mapRef,
  userLocationRef,
  setUserLocation,
  bicitasProgressRef,
  setLlegaste,
  userMarkerRef,
  routeCoordinatesRef,
  mapReady,
  setLocationReady,
  setLocationStatus,
  routeColorRef,
  setBicitasProgress,
  advanceRoute,
  visitPlace,
  drawSingleBicitasRoute,
  finishRuta,
}) => {
  const distanceInMeters = (origin, destination) => {
    const toRadians = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371000;

    const deltaLat = toRadians(destination[1] - origin[1]);
    const deltaLng = toRadians(destination[0] - origin[0]);
    const lat1 = toRadians(origin[1]);
    const lat2 = toRadians(destination[1]);

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

    return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapReady) return;

    let watchId;

    setLocationStatus?.("waiting");

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const newCoords = [longitude, latitude];

          const prev = userLocationRef.current;

          userLocationRef.current = newCoords;
          setUserLocation?.(newCoords);

          const lugarActual = bicitasProgressRef?.current?.lugarActual;

          if (lugarActual?.longitud != null && lugarActual?.latitud != null) {
            const destino = [lugarActual.longitud, lugarActual.latitud];
            const distancia = distanceInMeters(newCoords, destino);

            if (distancia < 25) {
              if (bicitasProgressRef.current?.procesando) return;

              bicitasProgressRef.current.procesando = true;

              setLlegaste(true);

              const progreso = bicitasProgressRef.current;

              const siguiente = progreso.puntoActual + 1;

              const total = progreso.ruta.ruta_lugar.length;

              await visitPlace(progreso.usuarioRutaId, progreso.lugarActual.id);

              if (siguiente > total) {
                await finishRuta(progreso.usuarioRutaId);

                setBicitasProgress(null);

                setLlegaste(false);
                clearRoutes(mapRef.current);

                routeCoordinatesRef.current = null;

                return;
              }
              

              await advanceRoute(progreso.usuarioRutaId, siguiente);

              const siguienteLugar = progreso.ruta.ruta_lugar.find(
                (r) => r.orden === siguiente,
              )?.lugar;

              const nuevo = {
                ...progreso,
                puntoActual: siguiente,
                lugarActual: siguienteLugar,
              };

              bicitasProgressRef.current = nuevo;

              setBicitasProgress(nuevo);

              await drawSingleBicitasRoute({
                map: mapRef.current,

                start: newCoords,

                lugar: siguienteLugar,

                routeCoordinatesRef,
              });

              setLlegaste(false);

              setTimeout(() => {
                bicitasProgressRef.current.procesando = false;
              }, 3000);
            }
          }

          if (routeCoordinatesRef.current?.length) {
            const closestIndex = findClosestPointIndex(
              newCoords,
              routeCoordinatesRef.current,
            );

            const traveled = routeCoordinatesRef.current.slice(0, closestIndex);

            const remaining = routeCoordinatesRef.current.slice(closestIndex);

            drawProgressRoute({
              map: mapRef.current,
              traveled,
              remaining,
              color: routeColorRef.current,
            });
          }
          // mover marcador
          if (userMarkerRef.current) {
            userMarkerRef.current.setLngLat(newCoords);
          } else {
            const el = document.createElement("div");

            const root = createRoot(el);

            root.render(
              <>
                <div className="absolute w-7 h-7 bg-[#B57A86] rounded-full animate-pulse"></div>

                <div className="text-white text-sm bg-[#B57A86] rounded-full p-2 shadow-lg">
                  <MdDirectionsBike />
                </div>
              </>,
            );

            userMarkerRef.current = new mapboxgl.Marker(el)
              .setLngLat(newCoords)
              .addTo(mapRef.current);
          }

          // recalcular ruta
          // if (routeCoordinatesRef.current && selectedPlaceRef.current) {
          //   const now = Date.now();

          //   if (now - lastRecalcRef.current > 5000) {
          //     handleDrawRoute(selectedPlaceRef.current);

          //     lastRecalcRef.current = now;
          //   }
          // }

          // mover cámara
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
          setLocationStatus?.("ready");
          setLocationReady(true);
        },

        (error) => {
          if (error?.code === error.PERMISSION_DENIED || error?.code === 1) {
            setLocationStatus?.("permission-denied");
          } else {
            setLocationStatus?.("unavailable");
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 10000,
        },
      );
    } else {
      setLocationStatus?.("unavailable");
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [
    mapRef,
    mapReady,
    bicitasProgressRef,
    setLlegaste,
    setUserLocation,
    routeCoordinatesRef,
    userLocationRef,
    userMarkerRef,
    routeColorRef,
    setLocationReady,
    setLocationStatus,
  ]);
};
