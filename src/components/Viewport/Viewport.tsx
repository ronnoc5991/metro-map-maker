import {
  FunctionComponent,
  MouseEventHandler,
  WheelEventHandler,
  useEffect,
  useRef,
} from "react";
import clsx from "clsx";
import { CustomDragEventHandler } from "../../types/CustomDragEventHandler";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { WindowBounds } from "../../types/WindowBounds";
import { Dimensions } from "../../types/Dimensions";
import useMouse from "./hooks/useMouse";
import drawGrid from "./utils/drawGrid";
import "./styles.css";

type Props = BaseComponentProps & {
  dimensions: Dimensions;
  bounds: WindowBounds;
  gridCellSize: number;
  onMouseDown: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onDrag: CustomDragEventHandler;
  onWheel: WheelEventHandler;
};

const Viewport: FunctionComponent<Props> = ({
  className,
  dimensions,
  bounds,
  gridCellSize,
  onMouseDown,
  onDrag,
  onMouseUp,
  onWheel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const { onDown, onMove, onUp } = useMouse(onMouseDown, onDrag, onMouseUp);

  useEffect(() => {
    if (!canvasRef.current) return;
    context.current = canvasRef.current.getContext("2d");
  }, []);

  useEffect(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, dimensions.width, dimensions.height);
    drawGrid(bounds, dimensions, gridCellSize, context.current);
  });

  return (
    <canvas
      className={clsx("Viewport", className)}
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onWheel={onWheel}
    />
  );
};

export default Viewport;
