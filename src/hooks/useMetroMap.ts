import { useRef, useState } from "react";
import { Position } from "../types/Position";
import LineSegment from "../classes/LineSegment";
import Station from "../classes/Station";
import Line from "../classes/Line";
import { MetroMap } from "../types/MetroMap";

const useMetroMap = (): MetroMap & {
  addStation: (position: Position) => Station["id"];
  updateStationName: (stationId: Station["id"], newName: string) => void;
  deleteStation: (stationId: Station["id"]) => void;
  addLine: () => Line["id"];
  updateLineName: (lineId: Line["id"], newName: string) => void;
  deleteLine: (lineId: Line["id"]) => void;
  addLineSegment: (
    stationIds: [Station["id"], Station["id"]],
    parentLine: Line["id"]
  ) => LineSegment["id"];
  deleteLineSegment: (lineSegmentId: LineSegment["id"]) => void;
} => {
  const stationId = useRef(1);
  const lineSegmentId = useRef(1);
  const lineId = useRef(1);

  const [stations, setStations] = useState<Array<Station>>([]);
  const [lineSegments, setLineSegments] = useState<Array<LineSegment>>([]);
  const [lines, setLines] = useState<Array<Line>>([]);

  const addLine = (): Line["id"] => {
    const newLine = new Line(lineId.current++);
    setLines([...lines, newLine]);
    return newLine.id;
  };

  const updateLineName = (lineId: Line["id"], newName: string) => {
    const newLines = [...lines];
    const lineIndex = lines.findIndex((line) => line.id === lineId);

    if (lineIndex === -1) return;
    newLines.splice(lineIndex, 1, {
      ...newLines[lineIndex],
      name: newName,
    });
    setLines(newLines);
  };

  const deleteLine = (lineId: Line["id"]) => {
    const line = lines.find((line) => line.id === lineId);
    if (!line) {
      console.error(`Unable to find line with id: ${lineId}.`);
      return;
    }
    line.segmentIds.forEach((lineSegmentId) => {
      const lineSegment = lineSegments.find(
        (lineSegment) => lineSegment.id === lineSegmentId
      );
      if (!lineSegment) {
        console.error(
          `Line with id: ${lineId} was holding a reference to an undefined lineSegment with id: ${lineSegmentId}.`
        );
        return;
      }

      lineSegment.parentLineIds = lineSegment.parentLineIds.filter(
        (id) => id !== lineId
      );

      if (lineSegment.parentLineIds.length === 0) {
        deleteLineSegment(lineSegmentId);
      }
    });

    const newLines = [...lines].filter((line) => line.id !== lineId);
    setLines(newLines);
  };

  const addLineSegment = (
    stationIds: [Station["id"], Station["id"]],
    parentLineId: Line["id"]
  ): LineSegment["id"] => {
    const preexistingLineSegment = lineSegments.find(
      (lineSegment) =>
        lineSegment.stationIds.includes(stationIds[0]) &&
        lineSegment.stationIds.includes(stationIds[1])
    );

    if (!!preexistingLineSegment) {
      preexistingLineSegment.parentLineIds.push(parentLineId);
      const parentLine = lines.find((line) => line.id === parentLineId);
      parentLine?.segmentIds.push(preexistingLineSegment.id);
      return preexistingLineSegment.id;
    }

    // TODO: should probably check for the parent's existence before creating this?

    const newLineSegment = new LineSegment(
      stationIds,
      lineSegmentId.current++,
      parentLineId
    );
    // for each station involved here
    const involvedStations = stations.filter(
      (station) => station.id === stationIds[0] || station.id === stationIds[1]
    );

    involvedStations.forEach((station) =>
      station.connectedLineSegmentIds.push(newLineSegment.id)
    );
    const parentLine = lines.find((line) => line.id === parentLineId);
    if (parentLine) {
      parentLine.segmentIds.push(newLineSegment.id);
    }
    setLineSegments([...lineSegments, newLineSegment]);
    return newLineSegment.id;
  };

  const deleteLineSegment = (lineSegmentId: LineSegment["id"]) => {
    const lineSegment = lineSegments.find(
      (lineSegment) => lineSegment.id === lineSegmentId
    );
    if (!lineSegment) {
      console.error(
        `Unable to find the line segment with id: ${lineSegmentId}`
      );
      return;
    }

    lineSegment.parentLineIds.forEach((parentLineId) => {
      const parentLine = lines.find((line) => line.id === parentLineId);

      if (!parentLine) {
        console.error(`Unable to find Line with id: ${parentLineId}.`);
        return;
      }

      parentLine.segmentIds = parentLine.segmentIds.filter(
        (id) => id !== lineSegmentId
      );
    });

    lineSegment.stationIds.forEach((id) => {
      const station = stations.find((station) => station.id === id);

      if (!station) {
        console.error(`Unable to find station with id: ${id}`);
        return;
      }

      station.connectedLineSegmentIds = station.connectedLineSegmentIds.filter(
        (id) => id !== lineSegmentId
      );
    });

    const newLineSegments = [...lineSegments].filter(
      (segment) => segment.id !== lineSegmentId
    );
    setLineSegments(newLineSegments);
  };

  const addStation = (position: Position): Station["id"] => {
    const newStation = new Station(position, stationId.current++);
    setStations([...stations, newStation]);
    return newStation.id;
  };

  const updateStationName = (stationId: Station["id"], newName: string) => {
    const newStations = [...stations];
    const stationIndex = stations.findIndex(
      (station) => station.id === stationId
    );

    if (stationIndex === -1) return;
    newStations.splice(stationIndex, 1, {
      ...newStations[stationIndex],
      name: newName,
    });
    setStations(newStations);
  };

  const deleteStation = (stationId: Station["id"]) => {
    const newStations = stations.filter((station) => station.id !== stationId);
    setStations(newStations);
  };

  return {
    stations,
    lineSegments,
    lines,
    addStation,
    updateStationName,
    deleteStation,
    addLine,
    updateLineName,
    deleteLine,
    addLineSegment,
    deleteLineSegment,
  };
};

export default useMetroMap;
