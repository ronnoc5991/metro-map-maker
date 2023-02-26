import { FunctionComponent, useRef, useState } from "react";
import { CustomClickHandler } from "./types/CustomClickHandler";
import { CustomDragEventHandler } from "./types/CustomDragEventHandler";
import useDimensions from "./hooks/useDimensions";
// import useMetroMap from "./hooks/useMetroMap";
import Window from "./components/Window/Window";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Button from "./components/Button/Button";
import "./App.css";

const GRID_CELL_SIZE = 50;

type EditMode = "exploration" | "station-creation";

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { dimensions } = useDimensions(container);
  const [editMode, setEditMode] = useState<EditMode>("exploration");

  // const { metroMap, addStation } = useMetroMap();

  // there are two type of drag events
  // a window drag, after which a mouseUp does not mean anything except to stop the window drag
  // a control point drag, after wich a mouseUp should deselect a control point

  const onMouseDown: CustomClickHandler = () => {
    // might be a drag, interpret it on the  mouse up
    if (editMode === "exploration") return;
    // when we are in edge editing mode, a mouse down on a control point will tell us what we are dragging
  };

  const onDrag: CustomDragEventHandler = () => {
    // this will be useful when updating the positions of edge control points
  };

  const onMouseUp: CustomClickHandler = (position) => {
    // if we are in station-creation mode, and we did not just finish a window drag
    // addStation(position);
    // we can deselect the edge control point we were dragging?
  };

  // window should ALMOST always be draggable, unless we are dragging an edge control point for example
  const isWindowDraggable = editMode === "exploration";

  // create a control panel that presents different edit mode buttons

  return (
    <div className="App" ref={container}>
      <Window
        className="window"
        isDraggable={isWindowDraggable}
        gridCellSize={GRID_CELL_SIZE}
        dimensions={dimensions}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onDrag={onDrag}
      />
      <ControlPanel className="edit-mode-panel">
        <Button onClick={() => setEditMode("exploration")}>EX</Button>
        <Button onClick={() => setEditMode("station-creation")}>SC</Button>
      </ControlPanel>
    </div>
  );
};

export default App;
