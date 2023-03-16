import { FunctionComponent, useRef } from "react";
import GlobalEventDispatchProvider from "./components/providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import SelectedStationsProvider from "./components/providers/SelectedStationsProvider/SelectedStationsProvider";
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

  // we need to push a frame onto the stack
  // we need to start recording the stationst that are clicked
  // when we have two stations selected, we can calculate a route
  // display the route in the same frame
  // should we have a calculated route context?
  // or just keep that state in the route planner component? THIS

  return (
    <div className={styles.app} ref={container}>
      <WorldMapProvider>
        <ControlPanelStackProvider>
          <MouseModeProvider>
            <SelectedStationsProvider>
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
            </SelectedStationsProvider>
          </MouseModeProvider>
        </ControlPanelStackProvider>
      </WorldMapProvider>
    </div>
  );
};

export default App;
