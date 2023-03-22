import { Dispatch } from "react";
import useStack, { Stack } from "../../../../hooks/useStack";
import {
  createLinesListGetter,
  createStationsListGetter,
  LinesListProps,
  StationsListProps,
} from "../../ItemList/ItemList";
import {
  createLineDetailsGetter,
  LineDetailsProps,
} from "../../LineDetails/LineDetails";
import {
  createLineSegmentCreatorGetter,
  LineSegmentCreatorProps,
} from "../../LineSegmentCreator/LineSegmentCreator";
import {
  createLineSegmentDetailsGetter,
  LineSegmentDetailsProps,
} from "../../LineSegmentDetails/LineSegmentDetails";
import {
  createRoutePlannerGetter,
  RoutePlannerProps,
} from "../../RoutePlanner/RoutePlanner";
import {
  createStationDetailsGetter,
  StationDetailsProps,
} from "../../StationDetails/StationDetails";
import { FrameGetter } from "../types";

export type ControlPanelStack = Stack<FrameGetter>;
export type ControlPanelStackDispatch = Dispatch<ControlPanelStackAction>;

export const useControlPanelStack = (): [
  ControlPanelStack,
  ControlPanelStackDispatch
] => {
  const stack = useStack<FrameGetter>();
  const dispatch = getControlPanelStackDispatch(stack);

  return [stack, dispatch];
};

export type ControlPanelStackAction =
  | {
      type: "clear";
    }
  | {
      type: "pop";
    }
  | {
      type: "open-stations-list";
      props: StationsListProps;
    }
  | {
      type: "open-lines-list";
      props: LinesListProps;
    }
  | {
      type: "open-line-details";
      props: LineDetailsProps;
    }
  | {
      type: "open-line-segment-creator";
      props: LineSegmentCreatorProps;
    }
  | {
      type: "open-line-segment-details";
      props: LineSegmentDetailsProps;
    }
  | {
      type: "open-route-planner";
      props: RoutePlannerProps;
    }
  | {
      type: "open-station-details";
      props: StationDetailsProps;
    };

export const getControlPanelStackDispatch = (
  controlPanelStack: Stack<FrameGetter>
) => {
  return (action: ControlPanelStackAction) => {
    switch (action.type) {
      case "clear": {
        controlPanelStack.clear();
        break;
      }
      case "pop": {
        controlPanelStack.pop();
        break;
      }
      case "open-stations-list": {
        controlPanelStack.push(createStationsListGetter(action.props));
        break;
      }
      case "open-lines-list": {
        controlPanelStack.push(createLinesListGetter(action.props));
        break;
      }
      case "open-line-details": {
        controlPanelStack.push(createLineDetailsGetter(action.props));
        break;
      }
      case "open-line-segment-creator": {
        controlPanelStack.push(createLineSegmentCreatorGetter(action.props));
        break;
      }
      case "open-line-segment-details": {
        controlPanelStack.push(createLineSegmentDetailsGetter(action.props));
        break;
      }
      case "open-route-planner": {
        controlPanelStack.push(createRoutePlannerGetter(action.props));
        break;
      }
      case "open-station-details": {
        controlPanelStack.push(createStationDetailsGetter(action.props));
        break;
      }
      default: {
        // action.type;
        throw Error("Unhandled ControlPanelAction type");
      }
    }
  };
};
