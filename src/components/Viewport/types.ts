import { MouseEventHandler, WheelEventHandler } from "react";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { CustomDragEventHandler } from "../../types/CustomDragEventHandler";
import { Dimensions } from "../../types/Dimensions";
import { Position } from "../../types/Position";
import { StraightLine } from "../../types/StraightLine";

export type DrawableStation = {
  position: Position;
  radius: number;
};

export type ViewportProps = BaseComponentProps & {
  dimensions: Dimensions;
  gridLines: Array<StraightLine>;
  stations: Array<DrawableStation>;
  onMouseDown: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onDrag: CustomDragEventHandler;
  onWheel: WheelEventHandler;
};
