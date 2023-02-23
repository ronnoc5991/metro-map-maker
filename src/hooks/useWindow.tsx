import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions } from "../types/Dimensions";
import { WindowBounds } from "../types/WindowBounds";

// const DEFAULT_ZOOM_PERCENTAGE = 100;

// const [zoomPercentage, setZoomPercentage] = useState<number>(
//   DEFAULT_ZOOM_PERCENTAGE
// );

const useWindow = (
  dimensions: Dimensions
): {
  bounds: WindowBounds;
  onDrag: (deltaX: number, deltaY: number) => void;
} => {
  const previousDimensions = useRef<Dimensions>(dimensions);
  const [bounds, setBounds] = useState<WindowBounds>({
    minX: 0 - dimensions.width / 2,
    maxX: 0 + dimensions.width / 2,
    minY: 0 - dimensions.height / 2,
    maxY: 0 + dimensions.height / 2,
  });

  const onDrag = useCallback(
    (deltaX: number, deltaY: number) => {
      setBounds({
        minX: bounds.minX - deltaX,
        maxX: bounds.maxX - deltaX,
        minY: bounds.minY - deltaY,
        maxY: bounds.maxY - deltaY,
      });
    },
    [bounds]
  );

  useEffect(() => {
    const proportionalChangeInWidth =
      dimensions.width / previousDimensions.current.width;
    const proportionalChangeInHeight =
      dimensions.height / previousDimensions.current.height;

    const previousBoundsWidth = bounds.maxX - bounds.minX;
    const previousBoundsHeight = bounds.maxY - bounds.minY;

    const newBoundsWidth = previousBoundsWidth * proportionalChangeInWidth;
    const newBoundsHeight = previousBoundsHeight * proportionalChangeInHeight;

    const previouslyCenteredX = bounds.minX + previousBoundsWidth / 2;
    const previouslyCenteredY = bounds.minY + previousBoundsHeight / 2;

    const halfNewBoundsWidth = newBoundsWidth / 2;
    const halfNewBoundsHeight = newBoundsHeight / 2;

    setBounds({
      minX: previouslyCenteredX - halfNewBoundsWidth,
      maxX: previouslyCenteredX + halfNewBoundsWidth,
      minY: previouslyCenteredY - halfNewBoundsHeight,
      maxY: previouslyCenteredY + halfNewBoundsHeight,
    });

    previousDimensions.current.width = dimensions.width;
    previousDimensions.current.height = dimensions.height;
  }, [dimensions]);

  // TODO: Create an onZoom

  return {
    bounds,
    onDrag,
  };
};

export default useWindow;
