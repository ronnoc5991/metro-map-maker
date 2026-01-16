import { Position } from "../types/Position";
import uniqueId from "../utils/uniqueId";

export default class Vertex {
  public readonly id: number = uniqueId();
  constructor(public readonly position: Position) {}
}
