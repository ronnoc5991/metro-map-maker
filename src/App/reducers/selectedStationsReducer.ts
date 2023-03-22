import { Reducer } from "react";
import Station from "../../classes/Station";

export const tupleIndices = [0, 1] as const;
export type TupleIndex = typeof tupleIndices[number];
export type StationIdTuple = [Station["id"] | null, Station["id"] | null];

export type SelectedStationsState = {
  selectedStationIds: StationIdTuple;
  activeIndex: TupleIndex;
};

export const defaultSelectedStations: SelectedStationsState = {
  activeIndex: 0,
  selectedStationIds: [null, null],
};

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

const selectedStationsReducer: Reducer<
  SelectedStationsState,
  SelectedStationsAction
> = (currentState, action) => {
  switch (action.type) {
    case "reset": {
      if (action.index === undefined) return { ...defaultSelectedStations };

      const newIds = [...currentState.selectedStationIds] as StationIdTuple;
      newIds[action.index] = null;

      return {
        ...currentState,
        selectedStationIds: newIds,
      };
    }
    case "set-active-index": {
      return {
        ...currentState,
        activeIndex: action.index,
      };
    }
    case "select-station": {
      const newIds = [...currentState.selectedStationIds] as StationIdTuple;
      newIds[currentState.activeIndex] = action.id;

      // once we have both things selected, maybe we should set the activeIndex to null?
      // that way we do not put anything else into the array unless we select an activeIndex first?

      return {
        activeIndex: currentState.activeIndex === 0 ? 1 : 0, //  TODO: should we do this automatically?
        selectedStationIds: newIds,
      };
    }
  }
};

export default selectedStationsReducer;
