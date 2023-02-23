import { useCallback, useEffect, useState } from "react";
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
    // what is the question here?
    // how much did the dimensions change as a proportion of their previous size?
    // update the bounds by the same amount?
    // TODO: compare previous dimensions to new dimensions to derive new bounds
    setBounds({
      minX: 0 - dimensions.width / 2,
      maxX: 0 + dimensions.width / 2,
      minY: 0 - dimensions.height / 2,
      maxY: 0 + dimensions.height / 2,
    });
  }, [dimensions]);

  // TODO: Create an onZoom

  return {
    bounds,
    onDrag,
  };
};

export default useWindow;
