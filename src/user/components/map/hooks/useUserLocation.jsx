import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { MdDirectionsBike } from "react-icons/md";

export const useUserLocation = ({
  mapRef,
  userLocationRef,
  userMarkerRef,
  routeCoordinatesRef,
  selectedPlaceRef,
  lastRecalcRef,
  handleDrawRoute,
}) => {
  useEffect(() => {
    if (!mapRef.current) return;

    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const newCoords = [longitude, latitude];

          const prev = userLocationRef.current;

          userLocationRef.current = newCoords;

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
              </>
            );

            userMarkerRef.current = new mapboxgl.Marker(el)
              .setLngLat(newCoords)
              .addTo(mapRef.current);
          }

          // recalcular ruta
          if (
            routeCoordinatesRef.current &&
            selectedPlaceRef.current
          ) {
            const now = Date.now();

            if (now - lastRecalcRef.current > 5000) {
              handleDrawRoute(selectedPlaceRef.current);

              lastRecalcRef.current = now;
            }
          }

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
        },
        (error) => {
          // console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 10000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [mapRef.current]);
};