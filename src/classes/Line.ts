import LineSegment from "./LineSegment";

export default class Line {
  public name: string;
  public color: string = "#000000";
  public segmentIds: Array<LineSegment["id"]> = [];

  constructor(public readonly id: number) {
    this.name = `New Line - ${id}`;
  }
}
