import { FunctionComponent, useReducer, useState } from "react";
import MapDisplay from "../components/organisms/MapDisplay/MapDisplay";
import worldMapReducer, { emptyWorldMap } from "./reducers/mapReducer";
import { Position } from "../types/Position";
import getClickedStation from "../utils/getClickedStation";
import selectedStationsReducer, {
  defaultSelectedStations,
} from "./reducers/selectedStationsReducer";
import MapControls from "../components/organisms/MapControls/MapControls";
import styles from "./styles.module.scss";
import { useControlPanelStack } from "../components/organisms/ControlPanel/hooks/useControlPanelStack";

export type MouseMode =
  | "exploration"
  | "station-creation"
  | "station-selection";

const App: FunctionComponent = () => {
  const [map, mapDispatch] = useReducer(worldMapReducer, emptyWorldMap);
  const [mouseMode, setMouseMode] = useState<MouseMode>("exploration");
  const [controlPanelStack, controlPanelStackDispatch] = useControlPanelStack();
  const [selectedStations, selectedStationsDispatch] = useReducer(
    selectedStationsReducer,
    defaultSelectedStations
  );

  const onMapDisplayMouseUp = (position: Position) => {
    const clickedStation = getClickedStation(position, map.stations);
    if (mouseMode === "exploration") {
      if (!clickedStation) return;
      // TODO: should we clear out the stack here?
      controlPanelStackDispatch({
        type: "open-station-details",
        props: { id: clickedStation.id },
      });
    } else if (mouseMode === "station-creation") {
      if (clickedStation) return;
      mapDispatch({ type: "create-station", position });
      setMouseMode("exploration");
    } else if (mouseMode === "station-selection") {
      if (!clickedStation) return;
      selectedStationsDispatch({
        type: "select-station",
        id: clickedStation.id,
      });
    }
    // deselect the edge control point we were dragging?
  };

  // everything wrapped in the map context
  // control panel stack wraps the controls but is changed by clicks on display
  return (
    <div className={styles.app}>
      <MapDisplay map={map} onMouseUp={onMapDisplayMouseUp} />
      <MapControls
        map={map}
        controlPanelStack={controlPanelStack}
        controlPanelStackDispatch={controlPanelStackDispatch}
        mapDispatch={mapDispatch}
        setMouseMode={setMouseMode}
        selectedStations={selectedStations}
        selectedStationsDispatch={selectedStationsDispatch}
      />
    </div>
  );
};

export default App;
