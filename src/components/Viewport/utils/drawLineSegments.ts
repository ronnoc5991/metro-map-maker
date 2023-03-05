import { BezierCurve } from "../../../types/BezierCurve";

const drawLineSegments = (
  lineSegments: Array<BezierCurve>,
  context: CanvasRenderingContext2D
) => {
  context.save();
  lineSegments.forEach((LineSegment) => {
    drawBezierCurve(LineSegment, context);
  });
  context.restore();
};

function drawBezierCurve(
  { start, controlPointOne, controlPointTwo, end }: BezierCurve,
  context: CanvasRenderingContext2D
): void {
  context.moveTo(start.x, start.y);
  context.bezierCurveTo(
    controlPointOne.x,
    controlPointOne.y,
    controlPointTwo.x,
    controlPointTwo.y,
    end.x,
    end.y
  );
  context.stroke();
}

export default drawLineSegments;
