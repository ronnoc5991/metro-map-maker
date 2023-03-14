import LineSegment from "../../../classes/LineSegment";
import Station from "../../../classes/Station";
import { WindowBounds } from "../../../types/WindowBounds";

const getVisibileLineSegments = (
  lineSegments: Array<LineSegment>,
  stations: Array<Station>,
  bounds: WindowBounds
): Array<LineSegment> =>
  lineSegments.filter((lineSegment) =>
    isLineSegmentVisible(lineSegment, stations, bounds)
  );

function isLineSegmentVisible(
  { stationIds }: LineSegment,
  stations: Array<Station>,
  { minX, maxX, minY, maxY }: WindowBounds
) {
  const stationOne = stations.find((station) => station.id === stationIds[0]);
  const stationTwo = stations.find((station) => station.id === stationIds[1]);

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
