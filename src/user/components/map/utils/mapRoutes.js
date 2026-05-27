import mapboxgl from "mapbox-gl";

let progress = 0;

export const animateRoute = ({
  map,
  coordinates,
  color = "#B57A86",
}) => {
  const partialRoute = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  };

  // Eliminar anterior
  if (map.getSource("route")) {
    map.removeLayer("route");
    map.removeSource("route");
  }

  map.addSource("route", {
    type: "geojson",
    data: partialRoute,
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    paint: {
      "line-color": color,
      "line-width": 4,
      "line-opacity": 0.8,
    },
  });

  progress = 0;

  function step() {
    if (progress < coordinates.length) {
      partialRoute.geometry.coordinates.push(
        coordinates[progress]
      );

      map.getSource("route").setData(partialRoute);

      progress++;
      requestAnimationFrame(step);
    }
  }

  step();
};

export const drawRoute = async ({
  map,
  start,
  end,
  color,
  routeCoordinatesRef,
}) => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes?.[0]) return null;

  const route = data.routes[0].geometry;

  routeCoordinatesRef.current = route.coordinates;

  animateRoute({
    map,
    coordinates: route.coordinates,
    color,
  });

  const bounds = new mapboxgl.LngLatBounds();

  route.coordinates.forEach((coord) => {
    bounds.extend(coord);
  });

  map.fitBounds(bounds, {
    padding: 80,
  });

  return data.routes[0];
};

export const isUserOffRoute = (
  routeCoordinates,
  userCoords,
) => {
  if (!routeCoordinates) return false;

  const threshold = 0.0003;

  return !routeCoordinates.some((coord) => {
    const distance = Math.sqrt(
      Math.pow(coord[0] - userCoords[0], 2) +
        Math.pow(coord[1] - userCoords[1], 2),
    );

    return distance < threshold;
  });
};