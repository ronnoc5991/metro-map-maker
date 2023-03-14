import { createContext } from "react";
import { defaultState } from "../config";
import { ActiveTupleIndex, StationIdTuple } from "../types";

export const LineSegmentCreationContext = createContext<{
  selectedStationIds: StationIdTuple;
  activeIndex: ActiveTupleIndex;
}>(defaultState);
