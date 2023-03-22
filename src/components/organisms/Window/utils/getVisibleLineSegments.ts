import { WorldMap } from "../../../../App/reducers/mapReducer";
import LineSegment from "../../../../classes/LineSegment";
import { WindowBounds } from "../../../../types/WindowBounds";

const getVisibileLineSegments = (
  lineSegments: WorldMap["lineSegments"],
  stations: WorldMap["stations"],
  bounds: WindowBounds
): Array<LineSegment> => {
  const visibleLineSegments = [];

  for (const lineSegmentId in lineSegments) {
    const lineSegment = lineSegments[lineSegmentId];
    if (isLineSegmentVisible(lineSegment, stations, bounds))
      visibleLineSegments.push(lineSegment);
  }

  return visibleLineSegments;
};

function isLineSegmentVisible(
  { stationIds }: LineSegment,
  stations: WorldMap["stations"],
  { minX, maxX, minY, maxY }: WindowBounds
) {
  const stationOne = stations[stationIds[0]];
  const stationTwo = stations[stationIds[1]];

  if (!stationOne || !stationTwo) return false;

  const rightEdge = Math.max(stationOne.position.x, stationTwo.position.x);
  const leftEdge = Math.min(stationOne.position.x, stationTwo.position.x);
  const topEdge = Math.min(stationOne.position.y, stationTwo.position.y);
  const bottomEdge = Math.max(stationOne.position.y, stationTwo.position.y);
  const isRightEdgeVisible = rightEdge > minX && rightEdge < maxX;
  const isLeftEdgeVisible = leftEdge > minX && leftEdge < maxX;
  const isTopEdgeVisible = topEdge > minY && topEdge < maxY;
  const isBottomEdgeVisible = bottomEdge > minY && bottomEdge < maxY;

  // TODO: Make this stricter?

  if (
    isRightEdgeVisible ||
    isLeftEdgeVisible ||
    isTopEdgeVisible ||
    isBottomEdgeVisible
  )
    return true;

  return false;
}

export default getVisibileLineSegments;
