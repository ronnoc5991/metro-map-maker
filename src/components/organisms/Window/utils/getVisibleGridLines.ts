import { sizes } from "../../../../config";
import { StraightLine } from "../../../../types/StraightLine";
import { WindowBounds } from "../../../../types/WindowBounds";

type LineGetter = (
  from: number,
  to: number,
  stepSize: number
) => Array<StraightLine>;

const getVisibleGridLines = (bounds: WindowBounds) => {
  const getVerticalLines = getLines((xValue) => {
    return {
      from: { x: xValue, y: bounds.minY },
      to: { x: xValue, y: bounds.maxY },
    };
  });

  const getHorizontalLines: LineGetter = getLines((yValue) => {
    return {
      from: { x: bounds.minX, y: yValue },
      to: { x: bounds.maxX, y: yValue },
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
  return (from: number, to: number, stepSize: number) => {
    const lines: Array<StraightLine> = [];
    let firstValidValue = null;

    for (let i = Math.round(from); i <= to; i++) {
      if (i % stepSize !== 0) continue;
      firstValidValue = i;
      break;
    }

    if (firstValidValue === null) return lines;

    for (let i = firstValidValue; i <= to; i += stepSize) {
      const newLine = createLine(i);
      lines.push(newLine);
    }

    return lines;
  };
}

export default getVisibleGridLines;
