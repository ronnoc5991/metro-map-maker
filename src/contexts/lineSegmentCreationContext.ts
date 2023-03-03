import { createContext } from "react";
import Station from "../classes/Station";

export type SelectedStationIds = [Station["id"] | null, Station["id"] | null];

export const selectingIndices = [0, 1] as const;

export type SelectingIndex = typeof selectingIndices[number];

export type SelectingIndexSetter = (index: SelectingIndex) => void;

export const LineSegmentCreationContext = createContext<{
  selectedStationIds: SelectedStationIds;
  selectingIndex: SelectingIndex;
  setSelectingIndex: SelectingIndexSetter;
} | null>(null);
