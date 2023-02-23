import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { WindowBounds } from "../../types/WindowBounds";
import { Dimensions } from "../../types/Dimensions";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import drawGrid from "./utils/drawGrid";
import "./styles.css";

const GRID_CELL_SIZE = 25; // decide where this lives

type Props = {
  dimensions: Dimensions;
  bounds: WindowBounds;
  onMouseDown: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onMouseMove: MouseEventHandler;
};

const Viewport: FunctionComponent<Props> = ({
  dimensions,
  bounds,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const update = useCallback(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, dimensions.width, dimensions.height);
    drawGrid(bounds, dimensions, GRID_CELL_SIZE, context.current);
  }, [bounds, dimensions]);

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
    ></canvas>
  );
};

export default Viewport;
