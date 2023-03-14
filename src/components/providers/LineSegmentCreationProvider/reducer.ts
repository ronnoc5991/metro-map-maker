import { Reducer } from "react";
import { defaultState } from "./config";
import {
  LineSegmentCreationAction,
  LineSegmentCreationState,
  StationIdTuple,
} from "./types";

const reducer: Reducer<LineSegmentCreationState, LineSegmentCreationAction> = (
  currentState,
  action
) => {
  switch (action.type) {
    case "set-active-index": {
      return {
        ...currentState,
        activeIndex: action.index,
      };
    }
    case "select-station": {
      const newIds = [...currentState.selectedStationIds] as StationIdTuple;
      newIds[currentState.activeIndex] = action.station.id;

      return {
        activeIndex: currentState.activeIndex === 0 ? 1 : 0,
        selectedStationIds: newIds,
      };
    }
    case "reset": {
      return {
        ...defaultState,
      };
    }
  }
};

export default reducer;
