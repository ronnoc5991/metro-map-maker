import { Dimensions } from "../../../../../../types/Dimensions";
import { Position } from "../../../../../../types/Position";
import { WindowBounds } from "../../../../../../types/WindowBounds";

type Translator = (
  value: number,
  viewportDimensions: Dimensions,
  windowBounds: WindowBounds
) => number;

export const getViewportXFromWindowX: Translator = (
  windowX,
  viewportDimensions,
  windowBounds
): number => {
  return (
    viewportDimensions.width *
    ((windowX - windowBounds.minX) / (windowBounds.maxX - windowBounds.minX))
  );
};

export const getViewportYFromWindowY: Translator = (
  windowY,
  viewportDimensions,
  windowBounds
): number => {
  return (
    viewportDimensions.height *
    ((windowY - windowBounds.minY) / (windowBounds.maxY - windowBounds.minY))
  );
};

export const getViewportPositionFromWindowPosition = (
  windowPosition: Position,
  dimensions: Dimensions,
  windowBounds: WindowBounds
): Position => {
  return {
    x: getViewportXFromWindowX(windowPosition.x, dimensions, windowBounds),
    y: getViewportYFromWindowY(windowPosition.y, dimensions, windowBounds),
  };
};

export const getWindowXFromViewportX = (
  viewportX: number,
  viewportDimensions: Dimensions,
  windowBounds: WindowBounds
): number => {
  return (
    windowBounds.minX +
    (windowBounds.maxX - windowBounds.minX) *
      (viewportX / viewportDimensions.width)
  );
};

export const getWindowYFromViewportY = (
  viewportY: number,
  viewportDimensions: Dimensions,
  windowBounds: WindowBounds
): number => {
  return (
    windowBounds.minY +
    (windowBounds.maxY - windowBounds.minY) *
      (viewportY / viewportDimensions.height)
  );
};

export const getWindowPositionFromViewportPosition = (
  viewportPosition: Position,
  viewportDimensions: Dimensions,
  windowBounds: WindowBounds
): Position => {
  return {
    x: getWindowXFromViewportX(
      viewportPosition.x,
      viewportDimensions,
      windowBounds
    ),
    y: getWindowYFromViewportY(
      viewportPosition.y,
      viewportDimensions,
      windowBounds
    ),
  };
};
