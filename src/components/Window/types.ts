import Station from "../../classes/Station";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { CustomClickHandler } from "../../types/CustomClickHandler";
import { CustomDragEventHandler } from "../../types/CustomDragEventHandler";
import { Dimensions } from "../../types/Dimensions";

export type WindowProps = BaseComponentProps & {
  stations: Array<Station>;
  viewportDimensions: Dimensions;
  isDraggable: boolean;
  onMouseDown: CustomClickHandler;
  onDrag: CustomDragEventHandler;
  onMouseUp: CustomClickHandler;
};
