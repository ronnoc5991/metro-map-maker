import { Reducer } from "react";
import { WorldMap, WorldMapAction } from "./types";

const worldMapReducer: Reducer<WorldMap, WorldMapAction> = (
  worldMap,
  action
) => {
  switch (action.type) {
    case "add-line": {
      return {
        ...worldMap,
        lines: {
          ...worldMap.lines,
          [action.line.id]: action.line,
        },
      };
    }
    case "add-line-segment": {
      return {
        ...worldMap,
        lineSegments: {
          ...worldMap.lineSegments,
          [action.lineSegment.id]: action.lineSegment,
        },
      };
    }
    case "add-station": {
      return {
        ...worldMap,
        stations: {
          ...worldMap.stations,
          [action.station.id]: action.station,
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
        stations: newStations,
        lines: newLines,
        lineSegments: newLineSegments,
      };
    }
  }
};

export default worldMapReducer;
