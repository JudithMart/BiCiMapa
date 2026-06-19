// calculateRouteInfo.js
import mapboxgl from "mapbox-gl";

export const calculateRouteInfo = async (start, end) => {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.routes || !data.routes[0]) {
      return {
        minutes: null,
        km: null,
      };
    }

    const duration = data.routes[0].duration;
    const distance = data.routes[0].distance;

    return {
      minutes: Math.ceil(duration / 60),
      km: (distance / 1000).toFixed(2),
      geometry: data.routes[0].geometry,
    };
  } catch (error) {
    console.error(error);

    return {
      minutes: null,
      km: null,
      geometry: null,
    };
  }
};