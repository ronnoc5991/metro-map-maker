import {
  FunctionComponent,
  useEffect,
  useRef,
  MouseEventHandler,
  WheelEventHandler,
} from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../../../../types/BaseComponentProps";
import { CustomDragEventHandler } from "../../../../../../types/CustomDragEventHandler";
import { Dimensions } from "../../../../../../types/Dimensions";
import { StraightLine } from "../../../../../../types/StraightLine";
import { DrawableStation } from "./utils/drawStations";
import drawGridLines from "./utils/drawGridLines";
import drawStations from "./utils/drawStations";
import useMouse from "./hooks/useMouse";
import drawLineSegments from "./utils/drawLineSegments";
import { BezierCurve } from "../../../../../../types/BezierCurve";

type ViewportProps = BaseComponentProps & {
  dimensions: Dimensions;
  gridLines: Array<StraightLine>;
  stations: Array<DrawableStation>;
  lineSegments: Array<BezierCurve>;
  onMouseDown: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onDrag: CustomDragEventHandler;
  onWheel: WheelEventHandler;
};

// TODO: think about displaying station names above them? Maybe only on hover?

const Viewport: FunctionComponent<ViewportProps> = ({
  dimensions,
  gridLines,
  stations,
  lineSegments,
  className,
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
    drawGridLines(gridLines, context.current);
    drawLineSegments(lineSegments, context.current);
    drawStations(stations, context.current);
  });

  return (
    <canvas
      ref={canvasRef}
      className={clsx(className)}
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
