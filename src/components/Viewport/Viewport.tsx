import { FunctionComponent, useEffect, useRef } from "react";
import clsx from "clsx";
import drawGridLines from "./utils/drawGridLines";
import drawStations from "./utils/drawStations";
import useMouse from "./hooks/useMouse";
import { ViewportProps } from "./types";
import "./styles.scss";

const Viewport: FunctionComponent<ViewportProps> = ({
  dimensions,
  gridLines,
  stations,
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
    drawStations(stations, context.current);
  });

  return (
    <canvas
      ref={canvasRef}
      className={clsx("Viewport", className)}
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
