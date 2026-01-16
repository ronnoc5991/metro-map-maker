import uniqueId from "../utils/uniqueId";
import Vertex from "./Vertex";

export class Edge {
  public readonly id: number = uniqueId();

  constructor(
    public readonly from: Vertex,
    public readonly to: Vertex,
    public readonly weight: number
  ) {}
}
