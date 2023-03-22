import { Position } from "./Position";

export type BezierCurve = {
  start: Position;
  controlPointOne: Position;
  controlPointTwo: Position;
  end: Position;
  width: number;
  color: string;
};
