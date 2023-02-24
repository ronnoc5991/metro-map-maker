import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  WheelEventHandler,
} from "react";
import { Dimensions } from "../types/Dimensions";
import { WindowBounds } from "../types/WindowBounds";

const DEFAULT_ZOOM_PERCENTAGE = 100;
const MIN_ZOOM_PERCENTAGE = 50;
const MAX_ZOOM_PERCENTAGE = 300;
const ZOOM_STEP_SIZE = 1;

const useWindow = (
  dimensions: Dimensions
): {
  bounds: MutableRefObject<WindowBounds>;
  onDrag: (deltaX: number, deltaY: number) => void;
  onZoom: WheelEventHandler;
} => {
  const previousDimensions = useRef<Dimensions>(dimensions);
  const zoomPercentage = useRef(DEFAULT_ZOOM_PERCENTAGE);
  const bounds = useRef<WindowBounds>({
    minX: 0 - dimensions.width / 2,
    maxX: 0 + dimensions.width / 2,
    minY: 0 - dimensions.height / 2,
    maxY: 0 + dimensions.height / 2,
  });

  const getScaledValue = useCallback((value: number) => {
    const divisor = zoomPercentage.current / DEFAULT_ZOOM_PERCENTAGE;
    return value / divisor;
  }, []);

  const onDrag = useCallback(
    (deltaX: number, deltaY: number) => {
      const scaledDeltaX = getScaledValue(deltaX);
      const scaledDeltaY = getScaledValue(deltaY);
      bounds.current = {
        minX: bounds.current.minX - scaledDeltaX,
        maxX: bounds.current.maxX - scaledDeltaX,
        minY: bounds.current.minY - scaledDeltaY,
        maxY: bounds.current.maxY - scaledDeltaY,
      };
    },
    [getScaledValue]
  );

  const getNewBounds = useCallback(
    (
      dimensions: Dimensions,
      bounds: WindowBounds,
      horizontalFactor: number,
      verticalFactor: number
    ) => {
      const previousBoundsWidth = bounds.maxX - bounds.minX;
      const previousBoundsHeight = bounds.maxY - bounds.minY;

      const newBoundsWidth = Math.round(
        dimensions.width * (DEFAULT_ZOOM_PERCENTAGE / zoomPercentage.current)
      );
      const newBoundsHeight = Math.round(
        dimensions.height * (DEFAULT_ZOOM_PERCENTAGE / zoomPercentage.current)
      );

      const widthDelta = newBoundsWidth - previousBoundsWidth;
      const heightDelta = newBoundsHeight - previousBoundsHeight;

      const minXDelta = widthDelta * horizontalFactor;
      const maxXDelta = widthDelta - minXDelta;
      const minYDelta = heightDelta * verticalFactor;
      const maxYDelta = heightDelta - minYDelta;

      return {
        minX: bounds.minX - minXDelta,
        maxX: bounds.maxX + maxXDelta,
        minY: bounds.minY - minYDelta,
        maxY: bounds.maxY + maxYDelta,
      };
    },
    []
  );

  useEffect(() => {
    bounds.current = getNewBounds(dimensions, bounds.current, 0.5, 0.5);

    previousDimensions.current.width = dimensions.width;
    previousDimensions.current.height = dimensions.height;
  }, [dimensions, getNewBounds]);

  const onZoom: WheelEventHandler = useCallback(
    (event) => {
      if (event.deltaY > 0 && zoomPercentage.current > MIN_ZOOM_PERCENTAGE) {
        zoomPercentage.current -= ZOOM_STEP_SIZE;
      } else if (
        event.deltaY < 0 &&
        zoomPercentage.current < MAX_ZOOM_PERCENTAGE
      ) {
        zoomPercentage.current += ZOOM_STEP_SIZE;
      } else return;

      const horizontaFactor = event.clientX / previousDimensions.current.width;
      const verticalFactor = event.clientY / previousDimensions.current.height;

      bounds.current = getNewBounds(
        previousDimensions.current,
        bounds.current,
        horizontaFactor,
        verticalFactor
      );
    },
    [getNewBounds]
  );

  return {
    bounds,
    onDrag,
    onZoom,
  };
};

export default useWindow;
