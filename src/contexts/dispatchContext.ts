import { createContext } from "react";
import { Position } from "../types/Position";
import Station from "../classes/Station";
import Line from "../classes/Line";
import LineSegment from "../classes/LineSegment";

export type DispatchPayload =
  | {
      type: "open-stations-list";
    }
  | {
      type: "enter-station-creation-mode";
    }
  | {
      type: "create-new-station";
      position: Position;
    }
  | {
      type: "select-station";
      id: Station["id"];
    }
  | {
      type: "update-station-name";
      id: Station["id"];
      newName: string;
    }
  | {
      type: "delete-station";
      id: Station["id"];
    }
  | {
      type: "open-lines-list";
    }
  | {
      type: "create-line";
    }
  | {
      type: "select-line";
      id: Line["id"];
    }
  | {
      type: "update-line-name";
      id: Line["id"];
      newName: string;
    }
  | {
      type: "delete-line";
      id: Line["id"];
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
      type: "select-line-segment";
      id: LineSegment["id"];
    }
  | {
      type: "delete-line-segment";
      id: LineSegment["id"];
    };

export const DispatchContext = createContext<
  (payload: DispatchPayload) => void
>(() => null);
