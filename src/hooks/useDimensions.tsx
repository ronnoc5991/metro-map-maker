import { MutableRefObject, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { Dimensions } from "../types/Dimensions";

const useDimensions = (
  target: MutableRefObject<HTMLDivElement | null>
): { dimensions: Dimensions } => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useResizeObserver(target, (entry) => {
    const { width, height } = entry.contentRect;
    setDimensions({ width, height });
  });

  return { dimensions };
};

export default useDimensions;
