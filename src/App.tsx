import { FunctionComponent } from "react";
import GlobalEventDispatchProvider from "./components/providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import SelectedStationsProvider from "./components/providers/SelectedStationsProvider/SelectedStationsProvider";
import ControlPanelStackProvider from "./components/providers/ControlPanelStackProvider/ControlPanelStackProvider";
import MouseModeProvider from "./components/providers/MouseModeProvider/MouseModeProvider";
import WorldMapProvider from "./components/providers/WorldMapProvider/WorldMapProvider";
import ControlPanelControls from "./components/organisms/ControlPanelControls/ControlPanelControls";
import ControlPanel from "./components/organisms/ControlPanel/ControlPanel";
import styles from "./App.module.scss";
import MapDisplay from "./components/organisms/MapDisplay/MapDisplay";

const App: FunctionComponent = () => {
  // move state from providers here
  // if in the correct mouse mode, start capturing clicked stations?

  // move the world map into this component?

  return (
    <div className={styles.app}>
      <WorldMapProvider>
        <ControlPanelStackProvider>
          <MouseModeProvider>
            <SelectedStationsProvider>
              <GlobalEventDispatchProvider>
                <MapDisplay />
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
