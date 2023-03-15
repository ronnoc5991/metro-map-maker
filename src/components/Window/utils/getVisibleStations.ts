import Station from "../../../classes/Station";
import { Position } from "../../../types/Position";
import { WindowBounds } from "../../../types/WindowBounds";
import { WorldMap } from "../../providers/WorldMapProvider/types";

const getVisibleStations = (
  stations: WorldMap["stations"],
  bounds: WindowBounds
): Array<Station> => {
  const visibleStations = [];

  for (const stationId in stations) {
    const station = stations[stationId];
    if (isStationVisible(station.position, Station.radius, bounds))
      visibleStations.push(station);
  }

  return visibleStations;
};

function isStationVisible(
  { x, y }: Position,
  radius: number,
  { minX, maxX, minY, maxY }: WindowBounds
) {
  if (x > minX && x < maxX && y > minY && y < maxY) return true;

  const rightEdge = x + radius;
  const leftEdge = x - radius;
  const topEdge = y - radius;
  const bottomEdge = y + radius;
  const isRightEdgeVisible = rightEdge > minX && rightEdge < maxX;
  const isLeftEdgeVisible = leftEdge > minX && leftEdge < maxX;
  const isTopEdgeVisible = topEdge > minY && topEdge < maxY;
  const isBottomEdgeVisible = bottomEdge > minY && bottomEdge < maxY;

  if (
    (isRightEdgeVisible || isLeftEdgeVisible) &&
    (isTopEdgeVisible || isBottomEdgeVisible)
  )
    return true;

  return false;
}

export default getVisibleStations;
