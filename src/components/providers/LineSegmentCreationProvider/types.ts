import Station from "../../../classes/Station";

export const stationIdTuplelIndices = [0, 1] as const;

export type ActiveTupleIndex = typeof stationIdTuplelIndices[number];

export type StationIdTuple = [Station["id"] | null, Station["id"] | null];

export type LineSegmentCreationState = {
  selectedStationIds: StationIdTuple;
  activeIndex: ActiveTupleIndex;
};

export type LineSegmentCreationAction =
  | {
      type: "set-active-index";
      index: ActiveTupleIndex;
    }
  | {
      type: "select-station";
      station: Station;
    }
  | {
      type: "reset";
    };
