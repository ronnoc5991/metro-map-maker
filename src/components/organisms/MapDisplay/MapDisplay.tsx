import { useContext, useEffect, useState } from "react";
import { CustomClickEventHandler } from "../../../types/CustomClickEventHandler";
import { CustomDragEventHandler } from "../../../types/CustomDragEventHandler";
import { Dimensions } from "../../../types/Dimensions";
import getClickedStation from "../../../utils/getClickedStation";
import { GlobalEventDispatchContext } from "../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { MouseModeContext } from "../../providers/MouseModeProvider/contexts/MouseModeContext";
import { WorldMapContext } from "../../providers/WorldMapProvider/WorldMapProvider";
import Window from "./Window/Window";

// window should ALMOST always be draggable, unless we are dragging an edge control point for example
// include controls here that manipulate the window? (zoom)
// include here a toggle for the grid lines?

const MapDisplay = () => {
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

  const mouseMode = useContext(MouseModeContext);
  const { stations } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const onMouseDown: CustomClickEventHandler = () => {
    if (mouseMode === "exploration") return;
    // when we are in segment editing mode, a mouse down on a control point will tell us what we are dragging
  };

  const onDrag: CustomDragEventHandler = () => {
    // control point drag, update active control point position
  };

  const onMouseUp: CustomClickEventHandler = (position) => {
    const clickedStation = getClickedStation(position, stations);
    if (mouseMode === "exploration") {
      // if there is a clicked station, select it
      if (!clickedStation) return;
      // TODO: should we clear out the stack here?
      globalEventDispatch({
        type: "open-station-details",
        id: clickedStation.id,
      });
    } else if (mouseMode === "station-creation") {
      if (clickedStation) return;
      globalEventDispatch({ type: "create-station", position });
    } else if (mouseMode === "station-selection") {
      if (!clickedStation) return;
      globalEventDispatch({
        type: "select-station",
        id: clickedStation.id,
      });
    }
    // deselect the edge control point we were dragging?
  };

  return (
    <Window
      isDraggable={true}
      onDrag={onDrag}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      viewportDimensions={dimensions}
    />
  );
};

export default MapDisplay;
