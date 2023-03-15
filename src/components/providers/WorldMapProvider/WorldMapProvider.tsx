import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useReducer,
  useRef,
} from "react";
import Line from "../../../classes/Line";
import LineSegment from "../../../classes/LineSegment";
import Station from "../../../classes/Station";
import { emptyWorldMap } from "./config";
import { WorldMap, WorldMapDispatch } from "./types";
import worldMapReducer from "./worldMapReducer";

export const WorldMapContext = createContext<WorldMap>(emptyWorldMap);
export const WorldMapDispatchContext = createContext<WorldMapDispatch>(
  () => undefined
);

const WorldMapProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const stationId = useRef(1);
  const lineSegmentId = useRef(1);
  const lineId = useRef(1);
  const [map, dispatch] = useReducer(worldMapReducer, emptyWorldMap);

  // allows us to return ids of newly created items (not possible from real dispatch)
  const worldMapDispatchProxy: WorldMapDispatch = (action) => {
    switch (action.type) {
      case "create-station": {
        const newStation = new Station(action.position, stationId.current++);
        dispatch({ type: "add-station", station: newStation });
        return newStation.id;
      }
      case "create-line": {
        const newLine = new Line(lineId.current++);
        dispatch({ type: "add-line", line: newLine });
        return newLine.id;
      }
      case "create-line-segment": {
        // TODO: refactor, DRY
        const parentLine = map.lines[action.parentLineId];

        const involvedStations = [
          map.stations[action.stationIds[0]],
          map.stations[action.stationIds[1]],
        ] as [Station, Station];

        let preexistingLineSegment;

        for (const lineSegmentId in map.lineSegments) {
          const lineSegment = map.lineSegments[lineSegmentId];

          if (
            lineSegment.stationIds.includes(action.stationIds[0]) &&
            lineSegment.stationIds.includes(action.stationIds[1])
          )
            preexistingLineSegment = lineSegment;
        }

        if (!!preexistingLineSegment) {
          preexistingLineSegment.parentLineIds.push(action.parentLineId);
          parentLine.segmentIds.push(preexistingLineSegment.id);
          return preexistingLineSegment.id;
        }

        const newLineSegment = new LineSegment(
          involvedStations,
          lineSegmentId.current++,
          action.parentLineId
        );

        involvedStations.forEach((station) =>
          station.connectedLineSegmentIds.push(newLineSegment.id)
        );
        parentLine.segmentIds.push(newLineSegment.id);
        dispatch({ type: "add-line-segment", lineSegment: newLineSegment });
        return newLineSegment.id;
      }
    }
    dispatch(action);
  };

  return (
    <WorldMapContext.Provider value={map}>
      <WorldMapDispatchContext.Provider value={worldMapDispatchProxy}>
        {children}
      </WorldMapDispatchContext.Provider>
    </WorldMapContext.Provider>
  );
};

export default WorldMapProvider;
