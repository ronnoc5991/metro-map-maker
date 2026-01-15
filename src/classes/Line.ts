import uniqueId from "../utils/uniqueId";
import LineSegment from "./LineSegment";

export default class Line {
  public name: string;
  public color: string = "#000000";
  public segmentIds: Array<LineSegment["id"]> = [];
  public readonly id = uniqueId();

  constructor() {
    this.name = `New Line`;
  }
}
