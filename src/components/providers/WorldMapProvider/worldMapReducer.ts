import { Reducer } from "react";
import { WorldMap, WorldMapAction } from "./types";

const worldMapReducer: Reducer<WorldMap, WorldMapAction> = (
  worldMap,
  action
) => {
  switch (action.type) {
    case "add-line": {
      const newLines = [...worldMap.lines, action.line];
      return {
        ...worldMap,
        lines: newLines,
      };
    }
    case "add-line-segment": {
      const newLineSegments = [...worldMap.lineSegments, action.lineSegment];
      return {
        ...worldMap,
        lineSegments: newLineSegments,
      };
    }
    case "add-station": {
      const newStations = [...worldMap.stations, action.station];
      return {
        ...worldMap,
        stations: newStations,
      };
    }
    case "update-line-name": {
      const newLines = [...worldMap.lines];
      const lineIndex = newLines.findIndex((line) => line.id === action.id);

      if (lineIndex === -1) return worldMap;

      newLines.splice(lineIndex, 1, {
        ...newLines[lineIndex],
        name: action.newName,
      });

      return {
        ...worldMap,
        lines: newLines,
      };
    }
    case "update-station-name": {
      // TODO: This is the same as the function above... DRY
      const newStations = [...worldMap.stations];

      const stationIndex = newStations.findIndex(
        (station) => station.id === action.id
      );

      if (stationIndex === -1) return worldMap;

      newStations.splice(stationIndex, 1, {
        ...newStations[stationIndex],
        name: action.newName,
      });

      return {
        ...worldMap,
        stations: newStations,
      };
    }
    case "delete-station": {
      const newStations = worldMap.stations.filter(
        (station) => station.id !== action.id
      );
      // TODO: need to delete the line segments that this is a part of

      // need to find all of the line segment ids
      // then delete those from each of the parent lines?

      const newLineSegments = worldMap.lineSegments.filter(
        (lineSegment) => !lineSegment.stationIds.includes(action.id)
      );

      return {
        ...worldMap,
        stations: newStations,
        lineSegments: newLineSegments,
      };
    }
    case "delete-line": {
      let newLineSegments = [...worldMap.lineSegments];

      const line = worldMap.lines.find((line) => line.id === action.id);

      if (!line) {
        console.error(`Unable to find line with id: ${action.id}.`);
        return worldMap;
      }

      line.segmentIds.forEach((lineSegmentId) => {
        const lineSegment = worldMap.lineSegments.find(
          (lineSegment) => lineSegment.id === lineSegmentId
        );
        if (!lineSegment) {
          console.error(
            `Line with id: ${action.id} was holding a reference to an undefined lineSegment with id: ${lineSegmentId}.`
          );
          return worldMap;
        }

        lineSegment.parentLineIds = lineSegment.parentLineIds.filter(
          (id) => id !== action.id
        );

        if (lineSegment.parentLineIds.length === 0) {
          newLineSegments = newLineSegments.filter(
            (lineSegment) => lineSegment.id !== lineSegmentId
          );
        }
      });

      const newLines = [...worldMap.lines].filter(
        (line) => line.id !== action.id
      );

      return {
        ...worldMap,
        lines: newLines,
        lineSegments: newLineSegments,
      };
    }
    case "delete-line-segment": {
      const lineSegment = worldMap.lineSegments.find(
        (lineSegment) => lineSegment.id === action.id
      );
      if (!lineSegment) {
        console.error(`Unable to find the line segment with id: ${action.id}`);
        return worldMap;
      }

      lineSegment.parentLineIds.forEach((parentLineId) => {
        const parentLine = worldMap.lines.find(
          (line) => line.id === parentLineId
        );

        if (!parentLine) {
          console.error(
            `Line Segment was holding a reference to a non existent parent line with id: ${parentLineId}.`
          );
          return worldMap;
        }

        parentLine.segmentIds = parentLine.segmentIds.filter(
          (id) => id !== action.id
        );
      });

      lineSegment.stationIds.forEach((id) => {
        const station = worldMap.stations.find((station) => station.id === id);

        if (!station) {
          console.error(
            `Line segment was holding a reference to a non existent station with id: ${id}`
          );
          return worldMap;
        }

        station.connectedLineSegmentIds =
          station.connectedLineSegmentIds.filter((id) => id !== action.id);
      });

      const newLineSegments = [...worldMap.lineSegments].filter(
        (segment) => segment.id !== action.id
      );

      return {
        ...worldMap,
        lineSegments: newLineSegments,
      };
    }
  }
};

export default worldMapReducer;
