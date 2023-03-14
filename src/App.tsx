import { FunctionComponent, useRef } from "react";
import GlobalEventDispatchProvider from "./components/providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import LineSegmentCreationProvider from "./components/providers/LineSegmentCreationProvider/LineSegmentCreationProvider";
import ControlPanelStackProvider from "./components/providers/ControlPanelStackProvider/ControlPanelStackProvider";
import WithMouseEventHandlers from "./components/WithMouseEventHandlers/WithMouseEventHandlers";
import MouseModeProvider from "./components/providers/MouseModeProvider/MouseModeProvider";
import WorldMapProvider from "./components/providers/WorldMapProvider/WorldMapProvider";
import ControlPanelControls from "./components/organisms/ControlPanelControls/ControlPanelControls";
import ControlPanel from "./components/organisms/ControlPanel/ControlPanel";
import useDimensions from "./hooks/useDimensions";
import Window from "./components/Window/Window";
import styles from "./App.module.scss";

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { dimensions: viewportDimensions } = useDimensions(container);

  // window should ALMOST always be draggable, unless we are dragging an edge control point for example
  const isWindowDraggable = true;

  return (
    <div className={styles.app} ref={container}>
      <WorldMapProvider>
        <ControlPanelStackProvider>
          <MouseModeProvider>
            <LineSegmentCreationProvider>
              <GlobalEventDispatchProvider>
                <WithMouseEventHandlers
                  Component={Window}
                  props={{
                    isDraggable: isWindowDraggable,
                    viewportDimensions: viewportDimensions,
                  }}
                />
                <ControlPanel className={styles["control-panel"]} />
                <ControlPanelControls
                  className={styles["control-panel-controls"]}
                />
              </GlobalEventDispatchProvider>
            </LineSegmentCreationProvider>
          </MouseModeProvider>
        </ControlPanelStackProvider>
      </WorldMapProvider>
    </div>
  );
};

export default App;
