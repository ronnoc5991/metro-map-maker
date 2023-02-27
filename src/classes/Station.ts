import { sizes } from "../config";
import { Position } from "../types/Position";

export default class Station {
  static radius = sizes.stationRadius;

  public name: string;

  constructor(public position: Position, public id: number) {
    this.name = `Station ${id}`;
  }
}
