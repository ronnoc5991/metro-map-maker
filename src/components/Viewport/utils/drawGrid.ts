import { Dimensions } from "../../../types/Dimensions";
import { Position } from "../../../types/Position";
import { WindowBounds } from "../../../types/WindowBounds";

type Line = { from: Position; to: Position };

type LineGetter = (
  from: number,
  to: number,
  gridCellSize: number
) => Array<Line>;

const drawGrid = (
  bounds: WindowBounds,
  dimensions: Dimensions,
  gridCellSize: number,
  context: CanvasRenderingContext2D
) => {
  const getVerticalLines = getLines((validValue) => {
    const xValue = validValue - bounds.minX;
    return {
      from: { x: xValue, y: 0 },
      to: { x: xValue, y: dimensions.height },
    };
  });

  const getHorizontalLines: LineGetter = getLines((validValue) => {
    const yValue = validValue - bounds.minY;
    return {
      from: { x: 0, y: yValue },
      to: { x: dimensions.width, y: yValue },
    };
  });

  const lines = [
    ...getVerticalLines(bounds.minX, bounds.maxX, gridCellSize),
    ...getHorizontalLines(bounds.minY, bounds.maxY, gridCellSize),
  ];

  lines.forEach(({ from, to }) => {
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  });
};

function getLines(createLine: (validValue: number) => Line): LineGetter {
  return (from: number, to: number, gridCellSize: number) => {
    const lines: Array<Line> = [];
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

export default drawGrid;
