import { Edge } from "./Edge";
import Vertex from "./Vertex";

export class Graph {
  private vertices: Array<Vertex> = [];
  private table: Map<Vertex, Array<Edge>> = new Map();

  addVertex(v: Vertex) {
    this.vertices.push(v);
  }

  addEdge(e: Edge) {
    if (!this.table.has(e.from)) this.table.set(e.from, new Array());
    if (!this.table.has(e.to)) this.table.set(e.to, new Array());
    this.table.get(e.from)?.push(e);
    this.table.get(e.to)?.push(e);
  }

  getVertices(): ReadonlyArray<Vertex> {
    return this.vertices;
  }

  getNeighbors(v: Vertex): ReadonlyArray<Vertex> {
    return this.table.get(v)?.map((edge) => edge.to) ?? [];
  }

  getEdgeWeight(from: Vertex, to: Vertex): number {
    const edges = this.table.get(from);
    const edge = edges?.find((e) => e.to === to);
    return edge ? edge.weight : Infinity;
  }
}
