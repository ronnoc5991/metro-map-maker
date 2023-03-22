import { WorldMap } from "../../../../../../App/reducers/mapReducer";
import Line from "../../../../../../classes/Line";
import Station from "../../../../../../classes/Station";
import getEuclideanDistanceBetweenPoints from "../../../../../../utils/getEuclideanDistanceBetweenPoints";

// we can put this somewhere else later
const lineChangePenalty = 10;

type Step = {
  stationId: Station["id"];
  departingLineId?: Line["id"];
};

export type Route = Array<Step>;

type Vertex = {
  stationId: Station["id"];
  cost: number;
  from: {
    vertex: Vertex;
    lineId: Line["id"];
  } | null;
};

function getRoute(
  startStation: Station,
  endStation: Station,
  stations: WorldMap["stations"],
  lineSegments: WorldMap["lineSegments"]
): Route {
  const startVertex: Vertex = {
    stationId: startStation.id,
    cost: 0,
    from: null,
  };

  const unexpandedVertices: Array<Vertex> = [startVertex];

  let currentVertex = startVertex;

  while (unexpandedVertices[0].cost < Infinity) {
    if (currentVertex.stationId === endStation.id) break;

    const edgesDepartingCurrentVertex = stations[
      currentVertex.stationId
    ].connectedLineSegmentIds
      .map((id) => lineSegments[id])
      .filter((edge) => {
        if (currentVertex.from === null) return true;

        // don't go down an edge if it leads to where we just were
        if (edge.stationIds.includes(currentVertex.from.vertex.stationId))
          return false;

        return true;
      });

    edgesDepartingCurrentVertex.forEach((edge) => {
      const vertexStationId =
        edge.stationIds[0] === currentVertex.stationId
          ? edge.stationIds[1]
          : edge.stationIds[0];

      const areChangingLines =
        !!currentVertex.from && currentVertex.from.lineId !== edge.parentLineId;

      const vertexCost =
        currentVertex.cost +
        edge.weight +
        (areChangingLines ? lineChangePenalty : 0) +
        getEuclideanDistanceBetweenPoints(
          stations[currentVertex.stationId].position,
          endStation.position
        );

      const newVertex: Vertex = {
        stationId: vertexStationId,
        cost: vertexCost,
        from: {
          vertex: currentVertex,
          lineId: edge.parentLineId,
        },
      };

      unexpandedVertices.push(newVertex);
    });

    unexpandedVertices.shift();

    unexpandedVertices.sort((a, b) => {
      if (a.cost < b.cost) return -1;
      if (a.cost === b.cost) {
        return 0;
      }

      return 1;
    });

    currentVertex = unexpandedVertices[0];
  }

  const route = recreateRoute(currentVertex);

  return route;
}

function recreateRoute(
  currentVertex: Vertex,
  departingLineId?: Line["id"]
): Route {
  return [
    ...(!!currentVertex.from
      ? recreateRoute(currentVertex.from.vertex, currentVertex.from.lineId)
      : []),
    { stationId: currentVertex.stationId, departingLineId },
  ];
}

export default getRoute;
