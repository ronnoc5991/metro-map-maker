import Station from "../../../classes/Station";

export const tupleIndices = [0, 1] as const;

export type TupleIndex = typeof tupleIndices[number];

export type StationIdTuple = [Station["id"] | null, Station["id"] | null];

export type SelectedStationsState = {
  selectedStationIds: StationIdTuple;
  activeIndex: TupleIndex;
};

// TODO: look into ways of creating and destroying this context at the appropriate times
// that way we do not have to ensure that it is 'clean'

export type SelectedStationsAction =
  | {
      type: "reset";
      index?: TupleIndex;
    }
  | {
      type: "set-active-index";
      index: TupleIndex;
    }
  | {
      type: "select-station";
      id: Station["id"];
    };
