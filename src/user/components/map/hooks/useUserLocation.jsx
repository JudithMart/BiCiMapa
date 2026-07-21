//userLocation.jsx
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { MdDirectionsBike } from "react-icons/md";
import { findClosestPointIndex } from "../utils/routeProgress";
import {
  drawProgressRoute,
  clearRoutes,
  clearBicitasMarker,
} from "../utils/mapRoutes";

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

  finishRuta,
  lastClosestIndexRef,
  bikeIconRef,
  setArrivedPlace,
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
    let angle = 0;

    setLocationStatus?.("waiting");

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const newCoords = [longitude, latitude];

            const prev = userLocationRef.current;

            if (prev) {
              const dx = longitude - prev[0];
              const dy = latitude - prev[1];

              angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            }

            userLocationRef.current = newCoords;

            if (!prev || distanceInMeters(prev, newCoords) > 5) {
              setUserLocation?.(newCoords);
            }

            const lugarActual = bicitasProgressRef?.current?.lugarActual;

            if (lugarActual?.longitud != null && lugarActual?.latitud != null) {
              const destino = [lugarActual.longitud, lugarActual.latitud];
              const distancia = distanceInMeters(newCoords, destino);

              if (distancia < 25) {
                if (bicitasProgressRef.current?.procesando) return;
                if (!bicitasProgressRef.current) return;

                bicitasProgressRef.current.procesando = true;

                setLlegaste(true);

                setArrivedPlace?.(lugarActual);
                const progreso = bicitasProgressRef.current;

                if (!progreso?.ruta?.ruta_lugar) {
                  // NUEVO
                  bicitasProgressRef.current.procesando = false;
                  return;
                }
                const siguiente = progreso.puntoActual + 1;

                const total = progreso.ruta.ruta_lugar.length;

                if (siguiente > total) {
                  await finishRuta(progreso.usuarioRutaId);

                  setBicitasProgress(null);

                  setLlegaste(false);
                  clearRoutes(mapRef.current);
                  clearBicitasMarker();

                  routeCoordinatesRef.current = null;

if (bicitasProgressRef.current) { // NUEVO
    bicitasProgressRef.current.procesando = false;
  }

                  console.log(JSON.stringify(routeCoordinatesRef.current));

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

                setLlegaste(false);

                setTimeout(() => {
                  bicitasProgressRef.current.procesando = false;
                }, 3000);
              }
            }

            //agregado
            if (routeCoordinatesRef.current?.length) {
              const closestIndex = findClosestPointIndex(
                newCoords,
                routeCoordinatesRef.current,
                lastClosestIndexRef.current,
              );
  const umbral = routeCoordinatesRef.current.length <= 20 ? 1 : 2;

console.log("closestIndex:", closestIndex, "lastClosest:", lastClosestIndexRef.current); // NUEVO
              const avanzoSuficiente =
                closestIndex - lastClosestIndexRef.current >= umbral;
console.log("avanzoSuficiente:", avanzoSuficiente);
              if (avanzoSuficiente) {
                lastClosestIndexRef.current = closestIndex;

                const traveled = routeCoordinatesRef.current.slice(
                  0,
                  closestIndex + 1,
                );

                const remaining =
                  routeCoordinatesRef.current.slice(closestIndex);
console.log("llamando drawProgressRoute, traveled:", traveled.length, "remaining:", remaining.length); // NUEVO

                drawProgressRoute({
                  map: mapRef.current,
                  traveled,
                  remaining,
                  color: routeColorRef.current,
                });
              }else {
  console.log("routeCoordinatesRef.current no tiene .length:", routeCoordinatesRef.current); }
            }

            if (userMarkerRef.current) {
              userMarkerRef.current.setLngLat(newCoords);

              if (bikeIconRef.current) {
                bikeIconRef.current.style.transform = `rotate(${angle + 90}deg)`;
                bikeIconRef.current.style.transition = "transform .3s";
              }
            } else {
              const bikeDiv = document.createElement("div");

              bikeDiv.className =
                "text-white text-sm bg-[#B57A86] rounded-full p-2 shadow-lg";

              const root = createRoot(bikeDiv);

              root.render(<MdDirectionsBike />);

              bikeIconRef.current = bikeDiv;

              const wrapper = document.createElement("div");
              wrapper.appendChild(bikeDiv);

              userMarkerRef.current = new mapboxgl.Marker(wrapper)
                .setLngLat(newCoords)
                .addTo(mapRef.current);
            }
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
          } catch (err) {
            console.error("Error en watchPosition callback:", err); // NUEVO
          }
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
    advanceRoute,

    finishRuta,
    setBicitasProgress,
  ]);
};
