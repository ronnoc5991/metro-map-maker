import { Dispatch, SetStateAction } from "react";
import { WorldMapDispatch } from "../../WorldMapProvider/types";
import { GlobalEventDispatchAction } from "../types/GlobalEventDispatchAction";
import { MouseMode } from "../../MouseModeProvider/MouseModeProvider";
import { LineSegmentCreationAction } from "../../LineSegmentCreationProvider/types";
import { ControlPanelStackDispatch } from "../../ControlPanelStackProvider/types";

export type GlobalEventDispatch = (action: GlobalEventDispatchAction) => void;

type GlobalEventDispatchGetter = (
  worldMapDispatch: WorldMapDispatch,
  controlPanelStackDispatch: ControlPanelStackDispatch,
  mouseModeDispatch: Dispatch<SetStateAction<MouseMode>>,
  lineSegmentCreationDispatch: Dispatch<LineSegmentCreationAction>
) => GlobalEventDispatch;

export const getGlobalEventDispatch: GlobalEventDispatchGetter = (
  worldMapDispatch,
  controlPanelStackDispatch,
  mouseModeDispatch,
  lineSegmentCreationDispatch
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
        case "select-line-segment-station": {
          lineSegmentCreationDispatch({
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
          mouseModeDispatch("line-segment-creation");
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
          lineSegmentCreationDispatch({ type: "reset" });
          mouseModeDispatch("exploration");
          break;
        }
        case "set-line-segment-creator-active-index": {
          lineSegmentCreationDispatch({
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
      }
    }
  };
};
