// routeProgress.js
export const findClosestPointIndex = (
  userCoords,
  routeCoordinates
) => {
  let closestIndex = 0;
  let minDistance = Infinity;

  routeCoordinates.forEach((coord, index) => {
    const distance =
      Math.pow(coord[0] - userCoords[0], 2) +
      Math.pow(coord[1] - userCoords[1], 2);

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};