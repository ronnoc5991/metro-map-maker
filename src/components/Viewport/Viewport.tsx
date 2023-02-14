import {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useRef,
  WheelEventHandler,
} from "react";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import "./styles.css";

const FRAMES_PER_SECOND = 60;
const INTERVAL = 1000 / FRAMES_PER_SECOND;

type Props = {
  dimensions: {
    width: number;
    height: number;
  };
  onClick: MouseEventHandler;
  onWheel: WheelEventHandler;
};

const Viewport: FunctionComponent<Props> = ({
  dimensions,
  onClick,
  onWheel,
}: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const previousFrameTime = useRef<number>();

  const update = (time: number) => {
    if (previousFrameTime.current === undefined)
      previousFrameTime.current = time;

    const delta = time - previousFrameTime.current;

    if (delta > INTERVAL) {
      console.log("draw");
      previousFrameTime.current = time;
    }
  };

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
      onClick={onClick}
      onWheel={onWheel}
    ></canvas>
  );
};

export default Viewport;
