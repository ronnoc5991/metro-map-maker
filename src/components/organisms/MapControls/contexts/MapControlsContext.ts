import { createContext, Dispatch } from "react";
import { WorldMap, WorldMapAction } from "../../../../App/reducers/mapReducer";
import {
  SelectedStationsAction,
  SelectedStationsState,
  TupleIndex,
} from "../../../../App/reducers/selectedStationsReducer";
import { ControlPanelStackAction } from "../../ControlPanel/hooks/useControlPanelStack";

export type MapControlAction =
  | Exclude<ControlPanelStackAction, { type: "clear" } | { type: "pop" }>
  | Exclude<WorldMapAction, { type: "create-station" }>
  | Exclude<SelectedStationsAction, { type: "reset" }>
  | { type: "deselect-station"; index: TupleIndex }
  | { type: "enter-station-creation-mode" };

export type MapControlsDispatch = Dispatch<MapControlAction>;

export const MapControlsContext = createContext<
  | {
      map: WorldMap;
      selectedStations: SelectedStationsState;
      dispatch: MapControlsDispatch;
    }
  | undefined
>(undefined);
