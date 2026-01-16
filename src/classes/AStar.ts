import { Graph } from "./Graph";
import Vertex from "./Vertex";

type OpenSet = Array<Vertex>;
type VisitedSet = Set<Vertex>;
type FScore = Map<Vertex, number>;
type GScore = Map<Vertex, number>;
type CameFrom = Map<Vertex, Vertex | null>;
type Heuristic = (u: Vertex, v: Vertex) => number;

class ShortestPathAlgorithm {
  private graph: Graph;
  private start: Vertex;
  private end: Vertex;
  private h: Heuristic;
  private openSet: OpenSet;
  private visitedSet: VisitedSet;
  private fScore: FScore;
  private gScore: GScore;
  private cameFrom: CameFrom;
  private vertexBeingExpanded: Vertex | null = null;
  private vertexBeingEvaluated: Vertex | null = null;

  constructor(graph: Graph, start: Vertex, end: Vertex, h: Heuristic) {
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.h = h;
    const { cameFrom, fScore, gScore, openSet, visitedSet } =
      this.initializeState(graph, start, end, h);
    this.cameFrom = cameFrom;
    this.fScore = fScore;
    this.gScore = gScore;
    this.openSet = openSet;
    this.visitedSet = visitedSet;
  }

  public findShortestPath(): Array<Vertex> | null {
    const pathExists = this.search();

    if (pathExists) {
      return this.reconstructPath(this.end, this.cameFrom);
    } else {
      return null;
    }
  }

  private initializeState(
    graph: Graph,
    start: Vertex,
    end: Vertex,
    h: (u: Vertex, v: Vertex) => number
  ) {
    const openSet: OpenSet = [start];
    const visitedSet: VisitedSet = new Set();
    const fScore: FScore = new Map();
    const gScore: GScore = new Map();
    const cameFrom: CameFrom = new Map();

    graph.getVertices().forEach((v) => {
      cameFrom.set(v, null);
      gScore.set(v, v === start ? 0 : Infinity);
      fScore.set(v, v === start ? h(v, end) : Infinity);
    });

    return {
      openSet,
      visitedSet,
      fScore,
      gScore,
      cameFrom,
    };
  }

  private async evaluateVertex() {
    if (!this.vertexBeingEvaluated || !this.vertexBeingExpanded) return;

    const g = this.gScore.get(this.vertexBeingEvaluated) ?? Infinity;

    // get the newGScore for this one
    const potentialG =
      (this.gScore.get(this.vertexBeingExpanded) ?? Infinity) +
      this.graph.getEdgeWeight(
        this.vertexBeingExpanded,
        this.vertexBeingEvaluated
      );

    if (potentialG < g) {
      this.cameFrom.set(this.vertexBeingEvaluated, this.vertexBeingExpanded);
      this.gScore.set(this.vertexBeingEvaluated, potentialG);
      this.fScore.set(
        this.vertexBeingEvaluated,
        potentialG + this.h(this.vertexBeingEvaluated, this.end)
      );
      if (!this.visitedSet.has(this.vertexBeingEvaluated))
        this.openSet.push(this.vertexBeingEvaluated);
    }
  }

  private search(): boolean {
    while (this.openSet.length > 0) {
      this.sortOpenSet();
      this.vertexBeingExpanded = this.openSet.shift() as Vertex;

      if (this.vertexBeingExpanded === this.end) return true;

      const neighbors = [...this.graph.getNeighbors(this.vertexBeingExpanded)];

      while (neighbors.length > 0) {
        this.vertexBeingEvaluated = neighbors.shift() as Vertex; // this could be dangerous if it ever directly mutates the graph...
        this.evaluateVertex();
        this.vertexBeingEvaluated = null;
      }
    }

    return false; // no path found
  }

  private sortOpenSet() {
    this.openSet.sort(
      (a, b) =>
        (this.fScore.get(a) || Infinity) - (this.fScore.get(b) || Infinity)
    );
  }

  private reconstructPath(end: Vertex, cameFrom: Map<Vertex, Vertex | null>) {
    const pathInReverse: Array<Vertex> = [];

    let curr: Vertex | null = end;

    while (curr) {
      pathInReverse.push(curr);
      curr = cameFrom.get(curr) ?? null;
    }

    return pathInReverse.length > 1 ? pathInReverse.reverse() : null;
  }
}

export class AStar extends ShortestPathAlgorithm {
  private static h: Heuristic = (v1: Vertex, v2: Vertex) => {
    const startPosition = v1.position;
    const endPosition = v2.position;
    return Math.sqrt(
      Math.pow(Math.abs(startPosition.x - endPosition.x), 2) +
        Math.pow(Math.abs(startPosition.y - endPosition.y), 2)
    ); // the hypotenuse
  };

  constructor(graph: Graph, start: Vertex, end: Vertex) {
    super(graph, start, end, AStar.h);
  }
}
