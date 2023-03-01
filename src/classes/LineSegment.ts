import Station from "./Station";
import Line from "./Line";

export default class LineSegment {
  public parentLineIds: Array<Line["id"]> = [];

  constructor(
    public stationIds: [Station["id"], Station["id"]],
    public readonly id: number,
    parentLineId: Line["id"]
  ) {
    this.parentLineIds.push(parentLineId);
    // this.weight = getEuclideanDistanceBetweenPoints(
    //     vertices[0].position,
    //     vertices[1].position
    //   );
    //   const deltaX = vertices[1].position.x - vertices[0].position.x;
    //   const deltaY = vertices[1].position.y - vertices[0].position.y;
    //   this.controlPointOne = {
    //     x: vertices[0].position.x + deltaX / 3,
    //     y: vertices[0].position.y + deltaY / 3,
    //   };
    //   this.controlPointTwo = {
    //     x: vertices[0].position.x + (deltaX * 2) / 3,
    //     y: vertices[0].position.y + (deltaY * 2) / 3,
    //   };
  }
}
