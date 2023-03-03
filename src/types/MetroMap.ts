import Line from "../classes/Line";
import LineSegment from "../classes/LineSegment";
import Station from "../classes/Station";

export type MetroMap = {
  stations: Array<Station>;
  lineSegments: Array<LineSegment>;
  lines: Array<Line>;
};
