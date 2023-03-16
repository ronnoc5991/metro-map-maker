import { Reducer } from "react";
import { defaultState } from "./config";
import {
  SelectedStationsAction,
  SelectedStationsState,
  StationIdTuple,
} from "./types";

const reducer: Reducer<SelectedStationsState, SelectedStationsAction> = (
  currentState,
  action
) => {
  switch (action.type) {
    case "reset": {
      if (action.index === undefined) return { ...defaultState };

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

export default reducer;
