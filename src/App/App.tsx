import { FunctionComponent, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { Dimensions } from "../types/Dimensions";
import useWindow from "../hooks/useWindow";
import useMouse from "../hooks/useMouse";
import Viewport from "../components/Viewport/Viewport";
import "./App.css";

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useResizeObserver(container, (entry) => {
    const { width, height } = entry.contentRect;
    setDimensions({ width, height });
  });

  const { bounds, onDrag } = useWindow(dimensions);
  const { onDown, onMove, onUp } = useMouse(onDrag);

  return (
    <div className="App" ref={container}>
      <Viewport
        dimensions={dimensions}
        bounds={bounds}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseMove={onMove}
      ></Viewport>
    </div>
  );
};

export default App;
