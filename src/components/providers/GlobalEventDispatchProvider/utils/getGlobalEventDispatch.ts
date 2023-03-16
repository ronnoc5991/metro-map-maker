import { Dispatch, SetStateAction } from "react";
import { WorldMapAction } from "../../WorldMapProvider/types";
import { GlobalEventDispatchAction } from "../types/GlobalEventDispatchAction";
import { MouseMode } from "../../MouseModeProvider/MouseModeProvider";
import { SelectedStationsAction } from "../../SelectedStationsProvider/types";
import { ControlPanelStackDispatch } from "../../ControlPanelStackProvider/types";

// TODO: get rid of this global event dispatch context
// we can just call the correct contexts from child components
// this is a monster that needs to be destroyed

export type GlobalEventDispatch = (action: GlobalEventDispatchAction) => void;

type GlobalEventDispatchGetter = (
  worldMapDispatch: Dispatch<WorldMapAction>,
  controlPanelStackDispatch: ControlPanelStackDispatch,
  mouseModeDispatch: Dispatch<SetStateAction<MouseMode>>,
  selectedStationsDispatch: Dispatch<SelectedStationsAction>
) => GlobalEventDispatch;

export const getGlobalEventDispatch: GlobalEventDispatchGetter = (
  worldMapDispatch,
  controlPanelStackDispatch,
  mouseModeDispatch,
  selectedStationsDispatch
) => {
  return (action: GlobalEventDispatchAction) => {
    {
      switch (action.type) {
        case "open-stations-list":
        case "open-lines-list":
        case "open-station-details":
        case "open-line-details":
        case "open-line-segment-details":
        case "pop-frame-off-stack": {
          controlPanelStackDispatch(action);
          break;
        }
        case "update-station-name":
        case "update-line-name": {
          worldMapDispatch(action);
          break;
        }
        case "delete-station":
        case "delete-line":
        case "delete-line-segment": {
          // could we just check for the ids in the frames that call this
          // if there is no station, they should pop themselves off?
          worldMapDispatch(action);
          controlPanelStackDispatch({ type: "pop-frame-off-stack" });
          break;
        }
        case "select-station": {
          selectedStationsDispatch({ ...action });
          break;
        }
        case "enter-station-creation-mode": {
          mouseModeDispatch("station-creation");
          break;
        }
        case "enter-line-segment-creation-mode": {
          mouseModeDispatch("station-selection");
          controlPanelStackDispatch({
            type: "open-line-segment-creator",
            id: action.parentLineId,
          });
          break;
        }
        case "create-station": {
          worldMapDispatch({
            type: "create-station",
            position: action.position,
          });
          mouseModeDispatch("exploration");
          break;
        }
        case "create-line": {
          worldMapDispatch({ type: "create-line" });
          break;
        }
        case "create-line-segment": {
          // should mouse mode play some role on the control panel stack?
          worldMapDispatch(action);
          controlPanelStackDispatch({ type: "pop-frame-off-stack" });
          selectedStationsDispatch({ type: "reset" });
          mouseModeDispatch("exploration");
          break;
        }
        case "set-selected-stations-active-index": {
          // TODO: why does this need to be global?
          selectedStationsDispatch({
            type: "set-active-index",
            index: action.index,
          });
          break;
        }
        case "close-control-panel": {
          controlPanelStackDispatch({ type: "clear" });
          mouseModeDispatch("exploration");
          selectedStationsDispatch({ type: "reset" });
          break;
        }
        case "enter-route-planning-mode": {
          mouseModeDispatch("station-selection");
          selectedStationsDispatch({ type: "reset" });
          controlPanelStackDispatch({ type: "open-route-planner" });
          break;
        }
        case "deselect-station": {
          selectedStationsDispatch({ type: "reset", index: action.index });
          break;
        }
        // default: {
        //   action.type;
        // }
      }
    }
  };
};
