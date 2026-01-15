import Station from "./Station";
import Line from "./Line";
import { Position } from "../types/Position";
import { sizes } from "../config";
import getEuclideanDistanceBetweenPoints from "../utils/getEuclideanDistanceBetweenPoints";
import uniqueId from "../utils/uniqueId";

export default class LineSegment {
  static width = sizes.lineSegmentWidth;

  public weight: number;
  public stationIds: [Station["id"], Station["id"]];
  public controlPointOne: Position;
  public controlPointTwo: Position;
  public readonly id = uniqueId();
  // public isBeingEdited: boolean = true;

  constructor(stations: [Station, Station], public parentLineId: Line["id"]) {
    this.stationIds = [stations[0].id, stations[1].id];
    this.weight = getEuclideanDistanceBetweenPoints(
      stations[0].position,
      stations[1].position
    );
    const deltaX = stations[1].position.x - stations[0].position.x;
    const deltaY = stations[1].position.y - stations[0].position.y;
    this.controlPointOne = {
      x: stations[0].position.x + deltaX / 3,
      y: stations[0].position.y + deltaY / 3,
    };
    this.controlPointTwo = {
      x: stations[0].position.x + (deltaX * 2) / 3,
      y: stations[0].position.y + (deltaY * 2) / 3,
    };
  }
}
