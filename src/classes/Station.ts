import { sizes } from "../config";
import { Position } from "../types/Position";
import LineSegment from "./LineSegment";

export default class Station {
  static radius = sizes.stationRadius;

  public name: string;
  public connectedLineSegmentIds: Array<LineSegment["id"]> = [];

  constructor(public position: Position, public id: number) {
    this.name = `New Station`;
  }
}
