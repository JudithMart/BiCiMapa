import mapboxgl from "mapbox-gl";

export const drawBicitasRoute = ({
  map,
  userLocation,
  ruta,
}) => {

  if (!map || !userLocation) return;

  // ordenar lugares
  const lugaresOrdenados = [...ruta.ruta_lugar].sort(
    (a, b) => a.orden - b.orden
  );

  // convertir a coordenadas
  const coordinates = [
    userLocation,
    ...lugaresOrdenados.map((item) => [
      item.lugar.longitud,
      item.lugar.latitud,
    ]),
  ];

  // borrar ruta anterior
  if (map.getLayer("bicitas-route")) {
    map.removeLayer("bicitas-route");
  }

  if (map.getSource("bicitas-route")) {
    map.removeSource("bicitas-route");
  }

  map.addSource("bicitas-route", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
    },
  });

  map.addLayer({
    id: "bicitas-route",
    type: "line",
    source: "bicitas-route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#B57A86",
      "line-width": 5,
    },
  });

  // ajustar cámara
  const bounds = new mapboxgl.LngLatBounds();

  coordinates.forEach((coord) => bounds.extend(coord));

  map.fitBounds(bounds, {
    padding: 80,
  });
};