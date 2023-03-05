import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from "react";
import clsx from "clsx";
import { CustomClickEventHandler } from "../../types/CustomClickEventHandler";
import { CustomDragEventHandler } from "../../types/CustomDragEventHandler";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { WindowBounds } from "../../types/WindowBounds";
import { Dimensions } from "../../types/Dimensions";
import { MapContext } from "../../contexts/mapContext";
import getVisibileLineSegments from "./utils/getVisibleLineSegments";
import getVisibleGridLines from "./utils/getVisibleGridLines";
import getVisibleStations from "./utils/getVisibleStations";
import isZoomAllowed from "./utils/isZoomAllowed";
import WindowViewportInterpreter from "../WindowViewportInterpreter/WindowViewportInterpreter";
import ControlPanel from "../ControlPanel/ControlPanel";
import Button from "../Button/Button";
import config from "./config/config";
import "./styles.scss";

// Responsibility:
// Limit what we see of the Map
// React to zoom
// React to drag

type WindowProps = BaseComponentProps & {
  isDraggable: boolean;
  viewportDimensions: Dimensions;
  onMouseDown: CustomClickEventHandler;
  onDrag: CustomDragEventHandler;
  onMouseUp: CustomClickEventHandler;
};

const Window: FunctionComponent<WindowProps> = ({
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
  const { stations, lineSegments } = useContext(MapContext);

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

  const onDragProxy: CustomDragEventHandler = (deltaX, deltaY) => {
    if (!isDraggable) {
      onDrag(deltaX, deltaY);
      return;
    }

    hasBeenDragged.current = true;
    setBounds({
      minX: bounds.minX - deltaX,
      maxX: bounds.maxX - deltaX,
      minY: bounds.minY - deltaY,
      maxY: bounds.maxY - deltaY,
    });
  };

  const onMouseUpProxy: CustomClickEventHandler = (position) => {
    if (!hasBeenDragged.current) {
      onMouseUp(position);
    } else {
      hasBeenDragged.current = false;
    }
  };

  return (
    <div className={clsx("Window", className)}>
      <WindowViewportInterpreter
        viewportDimensions={viewportDimensions}
        windowBounds={bounds}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUpProxy}
        onDrag={onDragProxy}
        onWheel={onZoom}
        visibleStations={getVisibleStations(stations, bounds)}
        visibleGridLines={getVisibleGridLines(bounds)}
        visibleLineSegments={getVisibileLineSegments(
          lineSegments,
          stations,
          bounds
        )}
      />
      <ControlPanel className="zoom-control-panel">
        <Button onClick={onZoomIn}>+</Button>
        <Button onClick={onZoomOut}>-</Button>
      </ControlPanel>
    </div>
  );
};

export default Window;
