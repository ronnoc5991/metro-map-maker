import Line from "../../../classes/Line";
import LineSegment from "../../../classes/LineSegment";
import Station from "../../../classes/Station";
import { Position } from "../../../types/Position";

export type WorldMap = {
  stations: Array<Station>;
  lineSegments: Array<LineSegment>;
  lines: Array<Line>;
};

export type WorldMapDispatch = (
  action: WorldMapProxyAction
) => Station["id"] | LineSegment["id"] | Line["id"] | void;

export type WorldMapCommonAction =
  | {
      type: "update-station-name";
      id: Station["id"];
      newName: string;
    }
  | {
      type: "update-line-name";
      id: Line["id"];
      newName: string;
    }
  | {
      type: "delete-station";
      id: Station["id"];
    }
  | {
      type: "delete-line";
      id: Line["id"];
    }
  | {
      type: "delete-line-segment";
      id: LineSegment["id"];
    };

export type WorldMapAction =
  | WorldMapCommonAction
  | {
      type: "add-station";
      station: Station;
    }
  | {
      type: "add-line";
      line: Line;
    }
  | {
      type: "add-line-segment";
      lineSegment: LineSegment;
    };

export type WorldMapProxyAction =
  | WorldMapCommonAction
  | {
      type: "create-station";
      position: Position;
    }
  | {
      type: "create-line";
    }
  | {
      type: "create-line-segment";
      stationIds: [Station["id"], Station["id"]];
      parentLineId: Line["id"];
    };
