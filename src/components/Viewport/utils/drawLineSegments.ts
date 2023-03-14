import { BezierCurve } from "../../../types/BezierCurve";

const drawLineSegments = (
  lineSegments: Array<BezierCurve>,
  context: CanvasRenderingContext2D
) => {
  context.save();
  lineSegments.forEach((lineSegment) => {
    drawBezierCurve(lineSegment, context);
  });
  context.restore();
};

function drawBezierCurve(
  { start, controlPointOne, controlPointTwo, end, width }: BezierCurve,
  context: CanvasRenderingContext2D
): void {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineWidth = width; // separate the coordinates from the width/presentation of the lines... this should not be called in a forEach loop above
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
