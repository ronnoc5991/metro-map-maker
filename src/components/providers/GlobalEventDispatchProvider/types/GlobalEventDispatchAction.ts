import Line from "../../../../classes/Line";
import Station from "../../../../classes/Station";
import { ActiveTupleIndex } from "../../SelectedStationsProvider/types";
import { ControlPanelStackAction } from "../../ControlPanelStackProvider/types";
import { WorldMapAction } from "../../WorldMapProvider/types";

export type GlobalEventDispatchAction =
  | Exclude<ControlPanelStackAction, "clear" | "open-line-segment-creator">
  | WorldMapAction
  | {
      type: "enter-station-creation-mode";
    }
  | {
      type: "enter-line-segment-creation-mode";
      parentLineId: Line["id"];
    }
  | {
      type: "set-selected-stations-active-index";
      index: ActiveTupleIndex;
    }
  | {
      type: "select-station";
      station: Station;
    }
  | {
      type: "close-control-panel";
    }
  | {
      type: "enter-route-planning-mode";
    };
