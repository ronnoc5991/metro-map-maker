import Station from "../../../../classes/Station";
import { Position } from "../../../../types/Position";

export type DrawableStation = Station & {
  radius: number;
};

const drawStations = (
  stations: Array<DrawableStation>,
  context: CanvasRenderingContext2D
) => {
  context.save();
  context.translate(0.5, 0.5);
  stations.forEach((station) => {
    drawCircle(station.position, station.radius, context);
  });
  context.restore();
};

const drawCircle = (
  { x, y }: Position,
  radius: number,
  context: CanvasRenderingContext2D
) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.strokeStyle = "#000000";
  context.lineWidth = 1;
  context.fillStyle = "#FFFFFF";
  context.fill();
  context.stroke();
};

export default drawStations;
