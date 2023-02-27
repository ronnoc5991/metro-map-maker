import config from "../config/config";

export default function isZoomAllowed(
  delta: number,
  zoomPercentage: number
): boolean {
  return (
    (delta > 0 && zoomPercentage < config.MAX_ZOOM_PERCENTAGE) ||
    (delta < 0 && zoomPercentage > config.MIN_ZOOM_PERCENTAGE)
  );
}
