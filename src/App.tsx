import useResizeObserver from "@react-hook/resize-observer";
import { useRef, useState } from "react";
import Viewport from "./components/Viewport/Viewport";
import "./App.css";

type ElementDimensions = { width: number; height: number };

function App() {
  const container = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<ElementDimensions>({
    width: 0,
    height: 0,
  });

  useResizeObserver(container, (entry) => {
    const { width, height } = entry.contentRect;
    setDimensions({ width, height });
  });

  const onClick = () => {
    console.log("click in parent");
  };

  const onWheel = () => {
    console.log("wheel in parent");
  };

  return (
    <div className="App" ref={container}>
      <Viewport
        dimensions={dimensions}
        onClick={onClick}
        onWheel={onWheel}
      ></Viewport>
    </div>
  );
}

export default App;
