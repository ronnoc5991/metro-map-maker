import Station from "../classes/Station";
import { Position } from "../types/Position";

const getClickedStation = (
  clickedPosition: Position,
  stations: Array<Station>
): Station | undefined => {
  return stations.find(({ position }) => {
    const leftEdge = position.x - Station.radius;
    const rightEdge = position.x + Station.radius;
    const topEdge = position.y - Station.radius;
    const bottomEdge = position.y + Station.radius;

    return (
      clickedPosition.x >= leftEdge &&
      clickedPosition.x <= rightEdge &&
      clickedPosition.y >= topEdge &&
      clickedPosition.y <= bottomEdge
    );
  });
};

export default getClickedStation;
