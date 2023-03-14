import { sizes } from "../config";
import { Position } from "../types/Position";
import LineSegment from "./LineSegment";

export default class Station {
  static radius = sizes.stationRadius;

  public name: string;
  public connectedLineSegmentIds: Array<LineSegment["id"]> = [];
  public cost: number;

  constructor(public position: Position, public id: number) {
    this.name = `New Station - ${id}`;
    this.cost = Infinity;
  }
}

// export default class Vertex {
//   public edges: Array<Edge>;
//   public distanceToTarget: number | null;
//   public cost: number;
//   public previousVertexInPath: Vertex | null;

//   constructor(public position: Position, public name: string) {
//     this.edges = [];
//     this.distanceToTarget = null;
//     this.cost = Infinity;
//     this.previousVertexInPath = null;
//   }

//   public addEdge(edge: Edge): void {
//     this.edges.push(edge);
//   }
// }
