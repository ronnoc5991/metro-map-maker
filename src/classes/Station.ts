import { sizes } from "../config";
import { Position } from "../types/Position";
import uniqueId from "../utils/uniqueId";
import LineSegment from "./LineSegment";

export default class Station {
  static radius = sizes.stationRadius;

  public name: string;
  public connectedLineSegmentIds: Array<LineSegment["id"]> = [];
  public readonly id = uniqueId();

  constructor(public readonly position: Position) {
    this.name = `New Station`;
  }
}
