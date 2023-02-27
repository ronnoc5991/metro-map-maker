import { sizes } from "../../../config";
import { Dimensions } from "../../../types/Dimensions";
import { StraightLine } from "../../../types/StraightLine";
import { WindowBounds } from "../../../types/WindowBounds";
import {
  getViewportXFromWindowX,
  getViewportYFromWindowY,
} from "./unitTranslation";

type LineGetter = (
  from: number,
  to: number,
  gridCellSize: number
) => Array<StraightLine>;

const getGridLines = (bounds: WindowBounds, dimensions: Dimensions) => {
  const getVerticalLines = getLines((validValue) => {
    const xValue = getViewportXFromWindowX(validValue, dimensions, bounds);

    return {
      from: { x: xValue, y: 0 },
      to: { x: xValue, y: dimensions.height },
    };
  });

  const getHorizontalLines: LineGetter = getLines((validValue) => {
    const yValue = getViewportYFromWindowY(validValue, dimensions, bounds);
    return {
      from: { x: 0, y: yValue },
      to: { x: dimensions.width, y: yValue },
    };
  });

  return [
    ...getVerticalLines(bounds.minX, bounds.maxX, sizes.gridCell),
    ...getHorizontalLines(bounds.minY, bounds.maxY, sizes.gridCell),
  ];
};

function getLines(
  createLine: (validValue: number) => StraightLine
): LineGetter {
  return (from: number, to: number, gridCellSize: number) => {
    const lines: Array<StraightLine> = [];
    let firstValidValue = null;

    for (let i = Math.round(from); i <= to; i++) {
      if (i % gridCellSize !== 0) continue;
      firstValidValue = i;
      break;
    }

    if (firstValidValue === null) return lines;

    for (let i = firstValidValue; i <= to; i += gridCellSize) {
      const newLine = createLine(i);
      lines.push(newLine);
    }

    return lines;
  };
}

export default getGridLines;
