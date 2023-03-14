import Line from "../../../../classes/Line";
import Station from "../../../../classes/Station";
import { Position } from "../../../../types/Position";
import { ActiveTupleIndex } from "../../SelectedStationsProvider/types";
import { ControlPanelStackAction } from "../../ControlPanelStackProvider/types";
import { WorldMapCommonAction } from "../../WorldMapProvider/types";

export type GlobalEventDispatchAction =
  | Exclude<ControlPanelStackAction, "clear" | "open-line-segment-creator">
  | WorldMapCommonAction
  | {
      type: "enter-station-creation-mode";
    }
  | {
      type: "create-new-station";
      position: Position;
    }
  | {
      type: "create-line";
    }
  | {
      type: "enter-line-segment-creation-mode";
      parentLineId: Line["id"];
    }
  | {
      type: "create-line-segment";
      stationIds: [Station["id"], Station["id"]];
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
