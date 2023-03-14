import Station from "../../../classes/Station";

export const stationIdTupleIndices = [0, 1] as const;

export type ActiveTupleIndex = typeof stationIdTupleIndices[number];

export type StationIdTuple = [Station["id"] | null, Station["id"] | null];

export type SelectedStationsState = {
  selectedStationIds: StationIdTuple;
  activeIndex: ActiveTupleIndex;
};

export type SelectedStationsAction =
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
