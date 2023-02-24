import { FunctionComponent, useRef } from "react";
import useDimensions from "./hooks/useDimensions";
import useWindow from "./hooks/useWindow";
import useMouse from "./hooks/useMouse";
import Viewport from "./components/Viewport/Viewport";
import "./App.css";

const GRID_CELL_SIZE = 50;

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { dimensions } = useDimensions(container);

  const { bounds, onDrag, onZoom } = useWindow(dimensions);
  const { onDown, onMove, onUp } = useMouse(onDrag);

  return (
    <div className="App" ref={container}>
      <Viewport
        dimensions={dimensions}
        bounds={bounds}
        gridCellSize={GRID_CELL_SIZE}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseMove={onMove}
        onWheel={onZoom}
      ></Viewport>
    </div>
  );
};

export default App;
