import { FunctionComponent, MouseEventHandler, WheelEventHandler } from "react";
import clsx from "clsx";
import {
  getViewportPositionFromWindowPosition,
  getWindowPositionFromViewportPosition,
} from "./utils/translators";
import { CustomClickEventHandler } from "../../../types/CustomClickEventHandler";
import { CustomDragEventHandler } from "../../../types/CustomDragEventHandler";
import { WindowBounds } from "../../../types/WindowBounds";
import { StraightLine } from "../../../types/StraightLine";
import { Dimensions } from "../../../types/Dimensions";
import Viewport from "../Viewport/Viewport";
import Station from "../../../classes/Station";
import { DrawableStation } from "../Viewport/utils/drawStations";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import LineSegment from "../../../classes/LineSegment";
import { BezierCurve } from "../../../types/BezierCurve";
import { WorldMap } from "../../../App/reducers/mapReducer";

// Responsibility
// Transform coordinates from above to viewport coordinates
// Transform coordinates from below to window coordinates

type Props = BaseComponentProps & {
  windowBounds: WindowBounds;
  viewportDimensions: Dimensions;
  onMouseDown: CustomClickEventHandler;
  onMouseUp: CustomClickEventHandler;
  onDrag: CustomDragEventHandler;
  onWheel: WheelEventHandler;
  map: WorldMap;
  visibleStations: Array<Station>;
  visibleGridLines: Array<StraightLine>;
  visibleLineSegments: Array<LineSegment>;
};

const WindowViewportInterpreter: FunctionComponent<Props> = ({
  windowBounds,
  viewportDimensions,
  onMouseDown,
  onMouseUp,
  onDrag,
  onWheel,
  map,
  visibleStations,
  visibleGridLines,
  visibleLineSegments,
  className,
}) => {
  const { stations, lines } = map;

  const getTranslatedClickEventHandler = (
    callback: CustomClickEventHandler
  ): MouseEventHandler => {
    return ({ clientX, clientY }) => {
      const windowPosition = getWindowPositionFromViewportPosition(
        { x: clientX, y: clientY },
        viewportDimensions,
        windowBounds
      );

      callback(windowPosition);
    };
  };

  const getTranslatedDragEventHandler = (
    callback: CustomDragEventHandler
  ): CustomDragEventHandler => {
    return (deltaX, deltaY) => {
      const translatedDeltaX =
        (deltaX / viewportDimensions.width) *
        (windowBounds.maxX - windowBounds.minX);
      const translatedDeltaY =
        (deltaY / viewportDimensions.height) *
        (windowBounds.maxY - windowBounds.minY);

      callback(translatedDeltaX, translatedDeltaY);
    };
  };

  const translatedStations: Array<DrawableStation> = visibleStations.map(
    (station) => ({
      ...station,
      position: getViewportPositionFromWindowPosition(
        station.position,
        viewportDimensions,
        windowBounds
      ),
      radius:
        Station.radius *
        (viewportDimensions.width / (windowBounds.maxX - windowBounds.minX)),
    })
  );

  const translatedGridLines = visibleGridLines.map((gridLine) => ({
    from: getViewportPositionFromWindowPosition(
      gridLine.from,
      viewportDimensions,
      windowBounds
    ),
    to: getViewportPositionFromWindowPosition(
      gridLine.to,
      viewportDimensions,
      windowBounds
    ),
  }));

  const translatedLineSegments: Array<BezierCurve> = visibleLineSegments
    .map((lineSegment) => {
      const stationOne = stations[lineSegment.stationIds[0]];
      const stationTwo = stations[lineSegment.stationIds[1]];

      return {
        width:
          LineSegment.width *
          (viewportDimensions.width / (windowBounds.maxX - windowBounds.minX)),
        start: getViewportPositionFromWindowPosition(
          stationOne.position,
          viewportDimensions,
          windowBounds
        ),
        controlPointOne: getViewportPositionFromWindowPosition(
          lineSegment.controlPointOne,
          viewportDimensions,
          windowBounds
        ),
        controlPointTwo: getViewportPositionFromWindowPosition(
          lineSegment.controlPointTwo,
          viewportDimensions,
          windowBounds
        ),
        end: getViewportPositionFromWindowPosition(
          stationTwo.position,
          viewportDimensions,
          windowBounds
        ),
        color: lines[lineSegment.parentLineId].color,
      };
    })
    .filter((curve) => !!curve);

  return (
    <Viewport
      dimensions={viewportDimensions}
      onMouseDown={getTranslatedClickEventHandler(onMouseDown)}
      onMouseUp={getTranslatedClickEventHandler(onMouseUp)}
      onDrag={getTranslatedDragEventHandler(onDrag)}
      onWheel={onWheel}
      stations={translatedStations}
      gridLines={translatedGridLines}
      lineSegments={translatedLineSegments}
      className={clsx(className)}
    />
  );
};

export default WindowViewportInterpreter;
