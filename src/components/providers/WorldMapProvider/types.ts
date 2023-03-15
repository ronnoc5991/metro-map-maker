import Line from "../../../classes/Line";
import LineSegment from "../../../classes/LineSegment";
import Station from "../../../classes/Station";
import { Position } from "../../../types/Position";

export type WorldMap = {
  uniqueId: number;
  stations: Record<Station["id"], Station>;
  lineSegments: Record<LineSegment["id"], LineSegment>;
  lines: Record<Line["id"], Line>;
};

export type WorldMapAction =
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
    }
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
