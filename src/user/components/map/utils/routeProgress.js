// routeProgress.js
export const findClosestPointIndex = (
  userCoords,
  routeCoordinates,
  fromIndex = 0,
  windowSize = 60, // cuántos puntos hacia adelante busca
) => {
  const start = Math.max(0, fromIndex);
  const end = Math.min(routeCoordinates.length, fromIndex + windowSize);

  let closestIndex = start;
  let minDistance = Infinity;

  for (let i = start; i < end; i++) {
    const coord = routeCoordinates[i];
    const distance =
      Math.pow(coord[0] - userCoords[0], 2) +
      Math.pow(coord[1] - userCoords[1], 2);

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
};