import { Dispatch, SetStateAction } from "react";
import { WorldMapDispatch } from "../../WorldMapProvider/types";
import { GlobalEventDispatchAction } from "../types/GlobalEventDispatchAction";
import { MouseMode } from "../../MouseModeProvider/MouseModeProvider";
import { SelectedStationsAction } from "../../SelectedStationsProvider/types";
import { ControlPanelStackDispatch } from "../../ControlPanelStackProvider/types";

export type GlobalEventDispatch = (action: GlobalEventDispatchAction) => void;

type GlobalEventDispatchGetter = (
  worldMapDispatch: WorldMapDispatch,
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
          worldMapDispatch(action);
          controlPanelStackDispatch({ type: "pop-frame-off-stack" });
          break;
        }
        case "select-station": {
          selectedStationsDispatch({
            type: "select-station",
            station: action.station,
          });
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
        case "create-new-station": {
          const stationId = worldMapDispatch({
            type: "create-station",
            position: action.position,
          });
          if (!stationId) return;
          mouseModeDispatch("exploration");
          controlPanelStackDispatch({
            type: "open-station-details",
            id: stationId,
          });
          break;
        }
        case "create-line": {
          const lineId = worldMapDispatch({ type: "create-line" });
          if (!lineId) return;
          controlPanelStackDispatch({ type: "open-line-details", id: lineId });
          break;
        }
        case "create-line-segment": {
          const lineSegmentId = worldMapDispatch(action);
          controlPanelStackDispatch({ type: "pop-frame-off-stack" });
          if (!lineSegmentId) return;
          controlPanelStackDispatch({
            type: "open-line-segment-details",
            id: lineSegmentId,
          });
          selectedStationsDispatch({ type: "reset" });
          mouseModeDispatch("exploration");
          break;
        }
        case "set-selected-stations-active-index": {
          selectedStationsDispatch({
            type: "set-active-index",
            index: action.index,
          });
          break;
        }
        case "close-control-panel": {
          controlPanelStackDispatch({ type: "clear" });
          mouseModeDispatch("exploration");
          break;
        }
        case "enter-route-planning-mode": {
          mouseModeDispatch("station-selection");
          controlPanelStackDispatch({ type: "open-route-planner" });

          // when we have two stations selected, we can calculate a route
          // display the route in the same frame
          // or just keep that state in the route planner component? THIS
        }
      }
    }
  };
};
