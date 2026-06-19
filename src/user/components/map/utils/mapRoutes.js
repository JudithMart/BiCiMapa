// mapRoutes.js
import mapboxgl from "mapbox-gl";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { MdOutlineElectricBike } from "react-icons/md";

let progress = 0;

let bicitasMarker = null;
const traveledId = "route-traveled";
const remainingId = "route-remaining";

export const clearRoutes = (map) => {
  ["route", "route-traveled", "route-remaining"].forEach((id) => {
    if (map.getLayer(id)) map.removeLayer(id);

    if (map.getSource(id)) map.removeSource(id);
  });
};

export const clearBicitasMarker = () => {
  if (bicitasMarker) {
    bicitasMarker.remove();
    bicitasMarker = null;
  }
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

    routeCoordinatesRef.current = route;

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
    console.error(error);
  }
};
export const drawProgressRoute = ({ map, traveled, remaining, color }) => {
  if (!map.isStyleLoaded()) return;

  const traveledData = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: traveled,
    },
  };

  const remainingData = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: remaining,
    },
  };

  if (!map.getSource(traveledId)) {
    map.addSource(traveledId, {
      type: "geojson",
      data: traveledData,
    });

    map.addLayer({
      id: traveledId,
      type: "line",
      source: traveledId,
      paint: {
        "line-color": "#CFCFCF",
        "line-width": 6,
      },
    });
  } else {
    map.getSource(traveledId).setData(traveledData);
  }

  if (!map.getSource(remainingId)) {
    map.addSource(remainingId, {
      type: "geojson",
      data: remainingData,
    });

    map.addLayer({
      id: remainingId,
      type: "line",
      source: remainingId,
      paint: {
        "line-color": color,
        "line-width": 6,
      },
    });
  } else {
    map.getSource(remainingId).setData(remainingData);
  }
};
export const drawSingleBicitasRoute = async ({
  map,
  start,
  lugar,
  routeCoordinatesRef,
}) => {
  const end = [lugar.longitud, lugar.latitud];

  const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.join(
    ",",
  )};${end.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes?.length) return;

  const route = data.routes[0].geometry.coordinates;

  routeCoordinatesRef.current = route;

  clearRoutes(map);
  clearBicitasMarker();

  const el = document.createElement("div");

  const root = createRoot(el);

  root.render(
    createElement(
      "div",
      {
        style: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "#B57A86",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "18px",
          boxShadow: "0 4px 12px rgba(0,0,0,.25)",
        },
      },
      createElement(MdOutlineElectricBike),
    ),
  );

  bicitasMarker = new mapboxgl.Marker(el).setLngLat(end).addTo(map);

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
    paint: {
      "line-color": "#B57A86",
      "line-width": 5,
    },
  });
};
