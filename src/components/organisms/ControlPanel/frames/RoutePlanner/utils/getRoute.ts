// import LineSegment from "../../../../../../classes/LineSegment";
// import Station from "../../../../../../classes/Station";

// type Route = {};

// function getRoute(
//   startStation: Station,
//   endStation: Station,
//   stations: Array<Station>,
//   lineSegments: Array<LineSegment>
// ): Route {
//   // where to store the costs?
//   // on the vertices?
//   startStation.cost = 0;

//   const unvisitedStations: Array<Station> = [
//     startStation,
//     ...stations.filter((station) => station !== startStation),
//   ];

//   let currentStation = unvisitedStations[0];

//   while (unvisitedStations[0].cost < Infinity) {
//     if (currentStation === endStation) break;

//     currentStation.connectedLineSegmentIds.map(id => lineSegments.) .edges.forEach((edge) => {
//       const connectedVertex = edge.vertices.find(
//         (vertex) => vertex !== currentVertex
//       );

//       if (!connectedVertex) return;

//       if (connectedVertex.distanceToTarget === null && this.end !== null) {
//         connectedVertex.distanceToTarget = getEuclideanDistanceBetweenPoints(
//           connectedVertex.position,
//           this.end.position
//         );
//       }
//       const newCost =
//         currentVertex.cost +
//         edge.weight +
//         (connectedVertex.distanceToTarget ?? 0);

//       if (newCost < connectedVertex.cost) {
//         connectedVertex.cost = newCost;
//         connectedVertex.previousVertexInPath = currentVertex;
//       }
//     });

//     unvisitedVertices.shift();

//     unvisitedVertices.sort((a, b) => {
//       if (a.cost < b.cost) return -1;
//       if (a.cost === b.cost) {
//         return 0;
//       }

//       return 1;
//     });

//     currentVertex = unvisitedVertices[0];
//   }

//   const path = this.recreatePath(this.end);
//   this.resetGraph();
//   return path;
// }

// // TODO: implement this
// function resetGraph() {
//     this.graph.vertices.forEach((vertex) => {
//       vertex.cost = Infinity;
//       vertex.distanceToTarget = null;
//       vertex.previousVertexInPath = null;
//     });
//   }

export {};
