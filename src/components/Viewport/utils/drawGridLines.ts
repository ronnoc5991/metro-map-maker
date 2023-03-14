import { StraightLine } from "../../../types/StraightLine";

const drawGridLines = (
  gridLines: Array<StraightLine>,
  context: CanvasRenderingContext2D
): void => {
  context.save();
  context.translate(0.5, 0.5); // hack to get crisper lines
  context.strokeStyle = "#aaaaaa";
  gridLines.forEach(({ from, to }) => {
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  });
  context.restore();
};

export default drawGridLines;
