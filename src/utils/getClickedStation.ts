import Station from "../classes/Station";
import { WorldMap } from "../components/providers/WorldMapProvider/types";
import { Position } from "../types/Position";

const getClickedStation = (
  clickedPosition: Position,
  stations: WorldMap["stations"]
): Station | undefined => {
  for (const stationId in stations) {
    const { position } = stations[stationId];
    const leftEdge = position.x - Station.radius;
    const rightEdge = position.x + Station.radius;
    const topEdge = position.y - Station.radius;
    const bottomEdge = position.y + Station.radius;

    if (
      clickedPosition.x >= leftEdge &&
      clickedPosition.x <= rightEdge &&
      clickedPosition.y >= topEdge &&
      clickedPosition.y <= bottomEdge
    )
      return stations[stationId];
  }
};

export default getClickedStation;
