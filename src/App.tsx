import { FunctionComponent, useRef, useState } from "react";
import { CustomClickHandler } from "./types/CustomClickHandler";
import { CustomDragEventHandler } from "./types/CustomDragEventHandler";
import useDimensions from "./hooks/useDimensions";
import Window from "./components/Window/Window";
import "./App.css";

const GRID_CELL_SIZE = 50;

type EditMode = "exploration";

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { dimensions } = useDimensions(container);
  const [editMode] = useState<EditMode>("exploration");

  const onMouseDown: CustomClickHandler = () => {
    // might be a drag, interpret it on the  mouse up
    if (editMode === "exploration") return;
    // when we are in edge editing mode, a mouse down on a control point will tell us what we are dragging
  };

  const onDrag: CustomDragEventHandler = () => {
    // this will be useful when updating the positions of edge control points
  };

  const onMouseUp: CustomClickHandler = () => {
    // we can deselect the edge control point we were dragging?
  };

  // this will get more complicated in the future...
  // window should ALMOST always be draggable, unless we are dragging an edge control point for example
  const isWindowDraggable = editMode === "exploration";

  return (
    <div className="App" ref={container}>
      <Window
        isDraggable={isWindowDraggable}
        gridCellSize={GRID_CELL_SIZE}
        dimensions={dimensions}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onDrag={onDrag}
      />
    </div>
  );
};

export default App;
