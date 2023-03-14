import Line from "../../../classes/Line";
import LineSegment from "../../../classes/LineSegment";
import Station from "../../../classes/Station";

export type ControlPanelStackAction =
  | {
      type: "open-stations-list";
    }
  | {
      type: "open-lines-list";
    }
  | {
      type: "open-station-details";
      id: Station["id"];
    }
  | {
      type: "open-line-details";
      id: Line["id"];
    }
  | {
      type: "open-line-segment-details";
      id: LineSegment["id"];
    }
  | {
      type: "open-line-segment-creator";
      id: Line["id"];
    }
  | {
      type: "pop-frame-off-stack";
    }
  | {
      type: "clear";
    };

export type ControlPanelStackDispatch = (
  action: ControlPanelStackAction
) => void;
