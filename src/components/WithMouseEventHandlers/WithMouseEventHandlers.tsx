import { FunctionComponent, useContext } from "react";
import { CustomClickEventHandler } from "../../types/CustomClickEventHandler";
import { CustomDragEventHandler } from "../../types/CustomDragEventHandler";
import getClickedStation from "../../utils/getClickedStation";
import { GlobalEventDispatchContext } from "../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { MouseModeContext } from "../providers/MouseModeProvider/contexts/MouseModeContext";
import { WorldMapContext } from "../providers/WorldMapProvider/WorldMapProvider";

interface EventHandlers {
  onMouseDown: CustomClickEventHandler;
  onDrag: CustomDragEventHandler;
  onMouseUp: CustomClickEventHandler;
}

type Props<ChildProps> = {
  Component: FunctionComponent<ChildProps & EventHandlers>;
  props: ChildProps;
};

const WithMouseEventHandlers = <T,>({ Component, props }: Props<T>) => {
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

  return <Component {...{ ...props, onMouseDown, onDrag, onMouseUp }} />;
};

export default WithMouseEventHandlers;
