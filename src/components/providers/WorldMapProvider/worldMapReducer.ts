import { Reducer } from "react";
import Line from "../../../classes/Line";
import LineSegment from "../../../classes/LineSegment";
import Station from "../../../classes/Station";
import { WorldMap, WorldMapAction } from "./types";

const worldMapReducer: Reducer<WorldMap, WorldMapAction> = (
  worldMap,
  action
) => {
  switch (action.type) {
    case "create-line": {
      const newLine = new Line(worldMap.uniqueId);

      return {
        ...worldMap,
        uniqueId: worldMap.uniqueId + 1,
        lines: {
          ...worldMap.lines,
          [newLine.id]: newLine,
        },
      };
    }
    case "create-station": {
      const newStation = new Station(action.position, worldMap.uniqueId);

      return {
        ...worldMap,
        uniqueId: worldMap.uniqueId + 1,
        stations: {
          ...worldMap.stations,
          [newStation.id]: newStation,
        },
      };
    }
    case "create-line-segment": {
      // first, check if this line-segment exists already
      for (const lineSegmentId in worldMap.lineSegments) {
        const lineSegment = worldMap.lineSegments[lineSegmentId];

        if (
          lineSegment.stationIds.includes(action.stationIds[0]) &&
          lineSegment.stationIds.includes(action.stationIds[1])
        ) {
          const newLineSegment = { ...lineSegment };
          newLineSegment.parentLineIds.push(action.parentLineId);

          const newParentLine = { ...worldMap.lines[action.parentLineId] };
          newParentLine.segmentIds.push(newLineSegment.id);

          return {
            ...worldMap,
            lines: {
              ...worldMap.lines,
              [newParentLine.id]: newParentLine,
            },
            lineSegments: {
              ...worldMap.lineSegments,
              [newLineSegment.id]: newLineSegment,
            },
          };
        }
      }

      const newStations = { ...worldMap.stations };

      const involvedStationCopies = action.stationIds.map((stationId) => ({
        ...newStations[stationId],
      })) as [Station, Station];

      const newLineSegment = new LineSegment(
        involvedStationCopies,
        worldMap.uniqueId,
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
        uniqueId: worldMap.uniqueId + 1,
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
          lineSegment.parentLineIds.forEach((parentLineId) => {
            const newParentLine = { ...newLines[parentLineId] };
            newParentLine.segmentIds = newParentLine.segmentIds.filter(
              (segmentId) => `${segmentId}` !== lineSegmentId
            );
            newLines[parentLineId] = newParentLine;
          });
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
        const newLineSegment = { ...newLineSegments[lineSegmentId] };

        newLineSegment.parentLineIds = newLineSegment.parentLineIds.filter(
          (id) => id !== action.id
        );

        if (newLineSegment.parentLineIds.length === 0) {
          delete newLineSegments[lineSegmentId];
        } else {
          newLineSegments[lineSegmentId] = newLineSegment;
        }
      });

      delete newLines[action.id];

      return { ...worldMap, lines: newLines, lineSegments: newLineSegments };
    }
    case "delete-line-segment": {
      const newLineSegments = { ...worldMap.lineSegments };
      const newLines = { ...worldMap.lines };
      const newStations = { ...worldMap.stations };

      const lineSegmentToBeDeleted = newLineSegments[action.id];

      lineSegmentToBeDeleted.parentLineIds.forEach((parentLineId) => {
        const newParentLine = { ...newLines[parentLineId] };

        newParentLine.segmentIds = newParentLine.segmentIds.filter(
          (id) => id !== action.id
        );

        newLines[parentLineId] = newParentLine;
      });

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
