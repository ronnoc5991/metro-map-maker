import { Reducer } from "react";
import Line from "../../classes/Line";
import LineSegment from "../../classes/LineSegment";
import Station from "../../classes/Station";
import { Position } from "../../types/Position";
import uniqueId from "../../utils/uniqueId";

// TODO: if we persist maps... the 'uniqueid' will no longer work correctly
// because on reload it will reset to 0. We need a better way of generating unique ids

export type WorldMap = {
  stations: Record<Station["id"], Station>;
  lineSegments: Record<LineSegment["id"], LineSegment>;
  lines: Record<Line["id"], Line>;
};

export type WorldMapAction =
  | {
      type: "create-station";
      position: Position;
    }
  | {
      type: "create-line";
    }
  | {
      type: "create-line-segment";
      stationIds: [Station["id"], Station["id"]];
      parentLineId: Line["id"];
    }
  | {
      type: "update-station-name";
      id: Station["id"];
      newName: string;
    }
  | {
      type: "update-line-name";
      id: Line["id"];
      newName: string;
    }
  | {
      type: "update-line-color";
      id: Line["id"];
      newColor: string;
    }
  | {
      type: "delete-station";
      id: Station["id"];
    }
  | {
      type: "delete-line";
      id: Line["id"];
    }
  | {
      type: "delete-line-segment";
      id: LineSegment["id"];
    };

export const emptyWorldMap: WorldMap = {
  stations: {},
  lines: {},
  lineSegments: {},
};

const worldMapReducer: Reducer<WorldMap, WorldMapAction> = (
  worldMap,
  action
) => {
  switch (action.type) {
    case "create-line": {
      const newLine = new Line(uniqueId());

      return {
        ...worldMap,
        lines: {
          ...worldMap.lines,
          [newLine.id]: newLine,
        },
      };
    }
    case "create-station": {
      const newStation = new Station(action.position, uniqueId());

      return {
        ...worldMap,
        stations: {
          ...worldMap.stations,
          [newStation.id]: newStation,
        },
      };
    }
    case "create-line-segment": {
      for (const lineSegmentId in worldMap.lineSegments) {
        const lineSegment = worldMap.lineSegments[lineSegmentId];

        if (
          lineSegment.parentLineId === action.parentLineId &&
          lineSegment.stationIds.includes(action.stationIds[0]) &&
          lineSegment.stationIds.includes(action.stationIds[1])
        ) {
          // this lineSegment already exists, we should do nothing!
          return { ...worldMap };
        }
      }

      const newStations = { ...worldMap.stations };

      const involvedStationCopies = action.stationIds.map((stationId) => ({
        ...newStations[stationId],
      })) as [Station, Station];

      const newLineSegment = new LineSegment(
        involvedStationCopies,
        uniqueId(),
        action.parentLineId
      );

      involvedStationCopies.forEach((station) => {
        station.connectedLineSegmentIds = [
          ...station.connectedLineSegmentIds,
          newLineSegment.id,
        ];
      });

      const newParentLine = { ...worldMap.lines[action.parentLineId] };
      newParentLine.segmentIds = [
        ...newParentLine.segmentIds,
        newLineSegment.id,
      ];

      return {
        lines: {
          ...worldMap.lines,
          [newParentLine.id]: newParentLine,
        },
        lineSegments: {
          ...worldMap.lineSegments,
          [newLineSegment.id]: newLineSegment,
        },
        stations: {
          ...newStations,
          [involvedStationCopies[0].id]: involvedStationCopies[0],
          [involvedStationCopies[1].id]: involvedStationCopies[1],
        },
      };
    }
    case "update-line-name": {
      const newLine = { ...worldMap.lines[action.id] };
      newLine.name = action.newName;

      return {
        ...worldMap,
        lines: { ...worldMap.lines, [action.id]: newLine },
      };
    }
    case "update-line-color": {
      const newLine = { ...worldMap.lines[action.id] };
      newLine.color = action.newColor;

      return {
        ...worldMap,
        lines: { ...worldMap.lines, [action.id]: newLine },
      };
    }
    case "update-station-name": {
      const newStation = { ...worldMap.stations[action.id] };
      newStation.name = action.newName;

      return {
        ...worldMap,
        stations: { ...worldMap.stations, [action.id]: newStation },
      };
    }
    case "delete-station": {
      const newStations = { ...worldMap.stations };
      const newLineSegments = { ...worldMap.lineSegments };
      const newLines = { ...worldMap.lines };

      for (const lineSegmentId in newLineSegments) {
        const lineSegment = newLineSegments[lineSegmentId];

        if (lineSegment.stationIds.includes(action.id)) {
          lineSegment.stationIds.forEach((childStationId) => {
            const newStation = { ...newStations[childStationId] };
            newStation.connectedLineSegmentIds =
              newStation.connectedLineSegmentIds.filter(
                (id) => `${id}` !== lineSegmentId
              );
            newStations[childStationId] = newStation;
          });

          const newParentLine = { ...newLines[lineSegment.parentLineId] };
          newParentLine.segmentIds = newParentLine.segmentIds.filter(
            (segmentId) => `${segmentId}` !== lineSegmentId
          );
          newLines[lineSegment.parentLineId] = newParentLine;

          delete newLineSegments[lineSegmentId];
        }
      }

      delete newStations[action.id];

      return {
        ...worldMap,
        stations: newStations,
        lineSegments: newLineSegments,
        lines: newLines,
      };
    }
    case "delete-line": {
      const newLines = { ...worldMap.lines };
      const newLineSegments = { ...worldMap.lineSegments };

      const lineToBeDeleted = newLines[action.id];

      lineToBeDeleted.segmentIds.forEach((lineSegmentId) => {
        delete newLineSegments[lineSegmentId];
      });

      delete newLines[action.id];

      return { ...worldMap, lines: newLines, lineSegments: newLineSegments };
    }
    case "delete-line-segment": {
      const newLineSegments = { ...worldMap.lineSegments };
      const newLines = { ...worldMap.lines };
      const newStations = { ...worldMap.stations };

      const lineSegmentToBeDeleted = newLineSegments[action.id];

      const newParentLine = {
        ...newLines[lineSegmentToBeDeleted.parentLineId],
      };

      newParentLine.segmentIds = newParentLine.segmentIds.filter(
        (id) => id !== action.id
      );
      newLines[lineSegmentToBeDeleted.parentLineId] = newParentLine;

      lineSegmentToBeDeleted.stationIds.forEach((stationId) => {
        const newStation = { ...newStations[stationId] };

        newStation.connectedLineSegmentIds =
          newStation.connectedLineSegmentIds.filter((id) => id !== action.id);

        newStations[stationId] = newStation;
      });

      delete newLineSegments[action.id];

      return {
        ...worldMap,
        stations: newStations,
        lines: newLines,
        lineSegments: newLineSegments,
      };
    }
  }
};

export default worldMapReducer;
