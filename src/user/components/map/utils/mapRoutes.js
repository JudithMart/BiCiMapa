// mapRoutes.js
import mapboxgl from "mapbox-gl";

let progress = 0;

export const clearRoutes = (map) => {
  ["route", "route-traveled", "route-remaining"].forEach((id) => {
    if (map.getLayer(id)) map.removeLayer(id);

    if (map.getSource(id)) map.removeSource(id);
  });
};

export const animateRoute = ({ map, coordinates, color = "#B57A86" }) => {
  const partialRoute = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  };

  // Eliminar anterior
  clearRoutes(map);

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
      partialRoute.geometry.coordinates.push(coordinates[progress]);

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

  routeCoordinatesRef.current = route;

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

export const isUserOffRoute = (routeCoordinates, userCoords) => {
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

export const drawBicitasRoute = async ({
  map,
  start,
  ruta,
  routeCoordinatesRef,
}) => {
  try {
    // Ordenar lugares
    const lugaresOrdenados = [...ruta.ruta_lugar]
      .sort((a, b) => a.orden - b.orden)
      .map((item) => [item.lugar.longitud, item.lugar.latitud]);

    // Inicio usuario + puntos ruta
    const coordinates = [start, ...lugaresOrdenados];

    const coordsString = coordinates.map((coord) => coord.join(",")).join(";");

    const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordsString}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.routes?.length) return;

    const route = data.routes[0].geometry.coordinates;

    routeCoordinatesRef.current = route.coordinates;

    // borrar anterior
    clearRoutes(map);

    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      },
    });

    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#B57A86",
        "line-width": 5,
      },
    });
  } catch (error) {
    // console.error(error);
  }
};

export const drawProgressRoute = ({ map, traveled, remaining, color }) => {
  ["route-traveled", "route-remaining"].forEach((id) => {
    if (map.getLayer(id)) map.removeLayer(id);

    if (map.getSource(id)) map.removeSource(id);
  });

  map.addSource("route-traveled", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: traveled,
      },
    },
  });

  map.addLayer({
    id: "route-traveled",
    type: "line",
    source: "route-traveled",
    paint: {
      "line-color": "#CFCFCF",
      "line-width": 6,
    },
  });

  map.addSource("route-remaining", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: remaining,
      },
    },
  });

  map.addLayer({
    id: "route-remaining",
    type: "line",
    source: "route-remaining",
    paint: {
      "line-color": color,
      "line-width": 6,
    },
  });
};
