import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { CustomClickHandler } from "../../types/CustomClickHandler";
import { CustomDragEventHandler } from "../../types/CustomDragEventHandler";
import { Dimensions } from "../../types/Dimensions";
import { WindowBounds } from "../../types/WindowBounds";
import Button from "../Button/Button";
import ControlPanel from "../ControlPanel/ControlPanel";
import Viewport from "../Viewport/Viewport";
import isZoomAllowed from "./utils/isZoomAllowed";
import config from "./config/config";
import "./styles.css";

type Props = BaseComponentProps & {
  dimensions: Dimensions;
  isDraggable: boolean;
  gridCellSize: number;
  onMouseDown: CustomClickHandler;
  onDrag: CustomDragEventHandler;
  onMouseUp: CustomClickHandler;
};

const Window: FunctionComponent<Props> = ({
  isDraggable,
  dimensions,
  gridCellSize,
  onMouseDown,
  onDrag,
  onMouseUp,
  className,
}) => {
  const zoomPercentage = useRef(config.DEFAULT_ZOOM_PERCENTAGE);
  const previousDimensions = useRef<Dimensions>(dimensions);
  const [bounds, setBounds] = useState<WindowBounds>({
    minX: 0 - dimensions.width / 2,
    maxX: 0 + dimensions.width / 2,
    minY: 0 - dimensions.height / 2,
    maxY: 0 + dimensions.height / 2,
  });

  const resizeBounds = useCallback(
    (
      dimensions: Dimensions,
      horizontalFactor: number = 0.5,
      verticalFactor: number = 0.5
    ) => {
      setBounds((previousBounds) => {
        const previousBoundsWidth = previousBounds.maxX - previousBounds.minX;
        const previousBoundsHeight = previousBounds.maxY - previousBounds.minY;

        const newBoundsWidth = Math.round(
          dimensions.width *
            (config.DEFAULT_ZOOM_PERCENTAGE / zoomPercentage.current)
        );
        const newBoundsHeight = Math.round(
          dimensions.height *
            (config.DEFAULT_ZOOM_PERCENTAGE / zoomPercentage.current)
        );

        const widthDelta = newBoundsWidth - previousBoundsWidth;
        const heightDelta = newBoundsHeight - previousBoundsHeight;

        const minXDelta = widthDelta * horizontalFactor;
        const maxXDelta = widthDelta - minXDelta;
        const minYDelta = heightDelta * verticalFactor;
        const maxYDelta = heightDelta - minYDelta;

        return {
          minX: previousBounds.minX - minXDelta,
          maxX: previousBounds.maxX + maxXDelta,
          minY: previousBounds.minY - minYDelta,
          maxY: previousBounds.maxY + maxYDelta,
        };
      });
    },
    []
  );

  useEffect(() => {
    resizeBounds(dimensions);
    previousDimensions.current.width = dimensions.width;
    previousDimensions.current.height = dimensions.height;
  }, [dimensions, resizeBounds]);

  const translateMousePosition = (
    callback: CustomClickHandler
  ): MouseEventHandler => {
    return ({ clientX, clientY }) => {
      const translatedClientX =
        bounds.minX +
        (bounds.maxX - bounds.minX) * (clientX / dimensions.width);
      const translatedClientY =
        bounds.minY +
        (bounds.maxY - bounds.minY) * (clientY / dimensions.height);

      callback({ x: translatedClientX, y: translatedClientY });
    };
  };

  const onWindowDrag: CustomDragEventHandler = (deltaX, deltaY) => {
    const getScaledValue = (value: number) =>
      value / (zoomPercentage.current / config.DEFAULT_ZOOM_PERCENTAGE);

    const scaledDeltaX = getScaledValue(deltaX);
    const scaledDeltaY = getScaledValue(deltaY);

    if (!isDraggable) {
      onDrag(scaledDeltaX, scaledDeltaY);
      return;
    }

    setBounds({
      minX: bounds.minX - scaledDeltaX,
      maxX: bounds.maxX - scaledDeltaX,
      minY: bounds.minY - scaledDeltaY,
      maxY: bounds.maxY - scaledDeltaY,
    });
  };

  const onZoom: WheelEventHandler = (event) => {
    const scaledZoomStepSize =
      config.ZOOM_SCROLL_STEP_SIZE /
      (config.DEFAULT_ZOOM_PERCENTAGE / zoomPercentage.current);
    if (
      event.deltaY > 0 &&
      zoomPercentage.current > config.MIN_ZOOM_PERCENTAGE
    ) {
      zoomPercentage.current -= scaledZoomStepSize;
    } else if (
      event.deltaY < 0 &&
      zoomPercentage.current < config.MAX_ZOOM_PERCENTAGE
    ) {
      zoomPercentage.current += scaledZoomStepSize;
    } else return;

    const horizontalFactor = event.clientX / previousDimensions.current.width;
    const verticalFactor = event.clientY / previousDimensions.current.height;

    resizeBounds(previousDimensions.current, horizontalFactor, verticalFactor);
  };

  const onZoomIn = () => {
    if (!isZoomAllowed(config.ZOOM_BUTTON_STEP_SIZE, zoomPercentage.current))
      return;
    const allowance = config.MAX_ZOOM_PERCENTAGE - zoomPercentage.current;
    zoomPercentage.current += Math.min(allowance, config.ZOOM_BUTTON_STEP_SIZE);
    resizeBounds(previousDimensions.current);
  };

  const onZoomOut = () => {
    if (!isZoomAllowed(-config.ZOOM_BUTTON_STEP_SIZE, zoomPercentage.current))
      return;
    const allowance = zoomPercentage.current - config.MIN_ZOOM_PERCENTAGE;
    zoomPercentage.current -= Math.min(allowance, config.ZOOM_BUTTON_STEP_SIZE);
    resizeBounds(previousDimensions.current);
  };

  return (
    <div className={clsx("Window", className)}>
      <Viewport
        bounds={bounds}
        dimensions={dimensions}
        gridCellSize={gridCellSize}
        onMouseDown={translateMousePosition(onMouseDown)}
        onDrag={onWindowDrag}
        onMouseUp={translateMousePosition(onMouseUp)}
        onWheel={onZoom}
      />
      <ControlPanel className="zoom-control-panel">
        <Button onClick={onZoomIn}>+</Button>
        <Button onClick={onZoomOut}>-</Button>
      </ControlPanel>
    </div>
  );
};

export default Window;
