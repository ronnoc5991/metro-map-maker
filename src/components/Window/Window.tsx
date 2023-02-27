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
import { CustomClickHandler } from "../../types/CustomClickHandler";
import { CustomDragEventHandler } from "../../types/CustomDragEventHandler";
import { WindowBounds } from "../../types/WindowBounds";
import { WindowProps } from "./types";
import { getWindowPositionFromViewportPosition } from "./utils/unitTranslation";
import getDrawableStations from "./utils/getDrawableStations";
import getGridLines from "./utils/getGridLines";
import isZoomAllowed from "./utils/isZoomAllowed";
import ControlPanel from "../ControlPanel/ControlPanel";
import Viewport from "../Viewport/Viewport";
import Button from "../Button/Button";
import config from "./config/config";
import "./styles.css";

const Window: FunctionComponent<WindowProps> = ({
  stations,
  isDraggable,
  viewportDimensions,
  className,
  onMouseDown,
  onDrag,
  onMouseUp,
}) => {
  const zoomPercentage = useRef(config.DEFAULT_ZOOM_PERCENTAGE);
  const [bounds, setBounds] = useState<WindowBounds>({
    minX: 0 - viewportDimensions.width / 2,
    maxX: 0 + viewportDimensions.width / 2,
    minY: 0 - viewportDimensions.height / 2,
    maxY: 0 + viewportDimensions.height / 2,
  });
  const hasBeenDragged = useRef(false);

  const resizeBounds = useCallback(
    (horizontalFactor: number = 0.5, verticalFactor: number = 0.5) => {
      setBounds((previousBounds) => {
        const previousBoundsWidth = previousBounds.maxX - previousBounds.minX;
        const previousBoundsHeight = previousBounds.maxY - previousBounds.minY;

        const newBoundsWidth = Math.round(
          viewportDimensions.width *
            (config.DEFAULT_ZOOM_PERCENTAGE / zoomPercentage.current)
        );
        const newBoundsHeight = Math.round(
          viewportDimensions.height *
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
    [viewportDimensions]
  );

  useEffect(() => {
    resizeBounds();
  }, [viewportDimensions, resizeBounds]);

  const translateMousePosition = (
    callback: CustomClickHandler
  ): MouseEventHandler => {
    return ({ clientX, clientY }) => {
      const windowPosition = getWindowPositionFromViewportPosition(
        { x: clientX, y: clientY },
        viewportDimensions,
        bounds
      );

      callback(windowPosition);
    };
  };

  const onZoom: WheelEventHandler = (event) => {
    const scaledZoomStepSize =
      config.ZOOM_SCROLL_STEP_SIZE /
      (config.DEFAULT_ZOOM_PERCENTAGE / zoomPercentage.current);
    if (
      event.deltaY > 0 &&
      isZoomAllowed(-scaledZoomStepSize, zoomPercentage.current)
    ) {
      zoomPercentage.current -= scaledZoomStepSize;
    } else if (
      event.deltaY < 0 &&
      isZoomAllowed(scaledZoomStepSize, zoomPercentage.current)
    ) {
      zoomPercentage.current += scaledZoomStepSize;
    } else return;

    const horizontalFactor = event.clientX / viewportDimensions.width;
    const verticalFactor = event.clientY / viewportDimensions.height;

    resizeBounds(horizontalFactor, verticalFactor);
  };

  const onZoomIn = () => {
    if (!isZoomAllowed(config.ZOOM_BUTTON_STEP_SIZE, zoomPercentage.current))
      return;
    const allowance = config.MAX_ZOOM_PERCENTAGE - zoomPercentage.current;
    zoomPercentage.current += Math.min(allowance, config.ZOOM_BUTTON_STEP_SIZE);
    resizeBounds();
  };

  const onZoomOut = () => {
    if (!isZoomAllowed(-config.ZOOM_BUTTON_STEP_SIZE, zoomPercentage.current))
      return;
    const allowance = zoomPercentage.current - config.MIN_ZOOM_PERCENTAGE;
    zoomPercentage.current -= Math.min(allowance, config.ZOOM_BUTTON_STEP_SIZE);
    resizeBounds();
  };

  const gridLines = getGridLines(bounds, viewportDimensions);
  const drawableStations = getDrawableStations(
    stations,
    viewportDimensions,
    bounds,
    zoomPercentage.current
  );

  const onDragProxy: CustomDragEventHandler = (deltaX, deltaY) => {
    const getScaledValue = (value: number) =>
      value / (zoomPercentage.current / config.DEFAULT_ZOOM_PERCENTAGE);

    const scaledDeltaX = getScaledValue(deltaX);
    const scaledDeltaY = getScaledValue(deltaY);

    if (!isDraggable) {
      onDrag(scaledDeltaX, scaledDeltaY);
      return;
    }

    hasBeenDragged.current = true;
    setBounds({
      minX: bounds.minX - scaledDeltaX,
      maxX: bounds.maxX - scaledDeltaX,
      minY: bounds.minY - scaledDeltaY,
      maxY: bounds.maxY - scaledDeltaY,
    });
  };

  const onMouseUpProxy: CustomClickHandler = (position) => {
    if (!hasBeenDragged.current) {
      onMouseUp(position);
    } else {
      hasBeenDragged.current = false;
    }
  };

  return (
    <div className={clsx("Window", className)}>
      <Viewport
        gridLines={gridLines}
        stations={drawableStations}
        dimensions={viewportDimensions}
        onMouseDown={translateMousePosition(onMouseDown)}
        onDrag={onDragProxy}
        onMouseUp={translateMousePosition(onMouseUpProxy)}
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
