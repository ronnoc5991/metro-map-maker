import { FunctionComponent, useEffect, useState } from "react";
import { WorldMap } from "../../../App/reducers/mapReducer";
import { CustomClickEventHandler } from "../../../types/CustomClickEventHandler";
import { CustomDragEventHandler } from "../../../types/CustomDragEventHandler";
import { Dimensions } from "../../../types/Dimensions";
import { Position } from "../../../types/Position";
import Window from "./Window/Window";

// window should ALMOST always be draggable, unless we are dragging an edge control point for example
// include controls here that manipulate the window? (zoom)
// include here a toggle for the grid lines?

type Props = {
  map: WorldMap;
  onMouseUp: (position: Position) => void;
};

const MapDisplay: FunctionComponent<Props> = ({ map, onMouseUp }) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const onResize = () => {
      setDimensions(() => ({
        height: window.innerHeight,
        width: window.innerWidth,
      }));
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMouseDown: CustomClickEventHandler = () => {
    // if (mouseMode === "exploration") return;
    // when we are in segment editing mode, a mouse down on a control point will tell us what we are dragging
  };

  const onDrag: CustomDragEventHandler = () => {
    // control point drag, update active control point position
  };

  return (
    <Window
      map={map}
      isDraggable={true}
      onDrag={onDrag}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      viewportDimensions={dimensions}
    />
  );
};

export default MapDisplay;
