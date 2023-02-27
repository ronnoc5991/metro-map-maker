import Station from "../../../classes/Station";
import { Dimensions } from "../../../types/Dimensions";
import { Position } from "../../../types/Position";
import { WindowBounds } from "../../../types/WindowBounds";
import { DrawableStation } from "../../Viewport/types";
import config from "../config/config";
import { getViewportPositionFromWindowPosition } from "./unitTranslation";

const getDrawableStations = (
  stations: Array<Station>,
  viewportDimensions: Dimensions,
  bounds: WindowBounds,
  zoomPercentage: number
): Array<DrawableStation> =>
  stations
    .filter((station) => {
      return isStationVisible(station.position, Station.radius, bounds);
    })
    .map((station) => {
      return {
        position: getViewportPositionFromWindowPosition(
          station.position,
          viewportDimensions,
          bounds
        ),
        radius:
          zoomPercentage * (Station.radius / config.DEFAULT_ZOOM_PERCENTAGE),
      };
    });

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

export default getDrawableStations;
