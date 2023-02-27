import { Position } from "../../../types/Position";
import { DrawableStation } from "../types";

const drawStations = (
  stations: Array<DrawableStation>,
  context: CanvasRenderingContext2D
) => {
  stations.forEach((station) => {
    drawCircle(station.position, station.radius, context);
  });
};

const drawCircle = (
  { x, y }: Position,
  radius: number,
  context: CanvasRenderingContext2D
) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.save();
  context.strokeStyle = "#000000";
  context.lineWidth = 1;
  context.fillStyle = "#FFFFFF";
  context.translate(0.5, 0.5);
  context.fill();
  context.stroke();
  context.restore();
};

export default drawStations;
