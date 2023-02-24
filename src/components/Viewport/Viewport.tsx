import {
  FunctionComponent,
  MouseEventHandler,
  WheelEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { WindowBounds } from "../../types/WindowBounds";
import { Dimensions } from "../../types/Dimensions";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import drawGrid from "./utils/drawGrid";
import "./styles.css";

type Props = {
  dimensions: Dimensions;
  bounds: MutableRefObject<WindowBounds>;
  gridCellSize: number;
  onMouseDown: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onMouseMove: MouseEventHandler;
  onWheel: WheelEventHandler;
};

const Viewport: FunctionComponent<Props> = ({
  dimensions,
  bounds,
  gridCellSize,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onWheel,
}: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const update = useCallback(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, dimensions.width, dimensions.height);
    drawGrid(bounds.current, dimensions, gridCellSize, context.current);
  }, [bounds, dimensions, gridCellSize]);

  useEffect(() => {
    if (!canvasRef.current) return;
    context.current = canvasRef.current.getContext("2d");
  }, []);

  useAnimationFrame(update);

  return (
    <canvas
      className="Viewport"
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onWheel={onWheel}
    ></canvas>
  );
};

export default Viewport;
