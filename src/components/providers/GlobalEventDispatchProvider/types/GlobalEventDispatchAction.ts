import Line from "../../../../classes/Line";
import {
  SelectedStationsAction,
  TupleIndex,
} from "../../SelectedStationsProvider/types";
import { ControlPanelStackAction } from "../../ControlPanelStackProvider/types";
import { WorldMapAction } from "../../WorldMapProvider/types";

// TODO: See which of these are simply pass through cases, include the recipient dispatch type here instead of copy pastaing

export type GlobalEventDispatchAction =
  | Exclude<
      ControlPanelStackAction,
      | { type: "clear" }
      | { type: "open-line-segment-creator" }
      | { type: "open-route-planner" }
    >
  | WorldMapAction
  | Exclude<
      SelectedStationsAction,
      { type: "reset" } | { type: "set-active-index" }
    >
  | {
      type: "enter-station-creation-mode";
    }
  | {
      type: "enter-line-segment-creation-mode";
      parentLineId: Line["id"];
    }
  | {
      type: "set-selected-stations-active-index"; // this touches selectedStation
      index: TupleIndex;
    }
  | {
      type: "deselect-station";
      index: TupleIndex;
    }
  | {
      type: "close-control-panel";
      // touches controlpanel
      // touches mouse mode (exploration)
    }
  | {
      type: "enter-route-planning-mode";
      // touches mouse mode
      // touches selectedStations (reset)
      // touches controlPanel
    };
