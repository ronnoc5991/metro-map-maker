import { FunctionComponent, useRef, useState } from "react";
import { CustomClickHandler } from "./types/CustomClickHandler";
import { CustomDragEventHandler } from "./types/CustomDragEventHandler";
import useDimensions from "./hooks/useDimensions";
import useMetroMap from "./hooks/useMetroMap";
import Window from "./components/Window/Window";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Button from "./components/Button/Button";
import "./App.css";

type EditMode = "exploration" | "station-creation";

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { dimensions: viewportDimensions } = useDimensions(container);
  const [editMode, setEditMode] = useState<EditMode>("exploration");

  const { stations, addStation } = useMetroMap();

  const onMouseDown: CustomClickHandler = () => {
    if (editMode === "exploration") return;
    // when we are in edge editing mode, a mouse down on a control point will tell us what we are dragging
  };

  const onDrag: CustomDragEventHandler = () => {
    // control point drag, update active control point position
  };

  const onMouseUp: CustomClickHandler = (position) => {
    if (editMode === "station-creation") {
      addStation(position);
      setEditMode("exploration");
    }

    // deselect the edge control point we were dragging?
  };

  // window should ALMOST always be draggable, unless we are dragging an edge control point for example
  const isWindowDraggable = true;

  return (
    <div className="App" ref={container}>
      <Window
        className="window"
        stations={stations}
        isDraggable={isWindowDraggable}
        viewportDimensions={viewportDimensions}
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
