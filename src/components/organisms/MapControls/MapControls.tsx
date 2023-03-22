import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { MouseMode } from "../../../App/App";
import { WorldMap, WorldMapAction } from "../../../App/reducers/mapReducer";
import {
  SelectedStationsAction,
  SelectedStationsState,
} from "../../../App/reducers/selectedStationsReducer";
import {
  ControlPanelStack,
  ControlPanelStackDispatch,
} from "../ControlPanel/hooks/useControlPanelStack";
import {
  MapControlsContext,
  MapControlsDispatch,
} from "./contexts/MapControlsContext";
import ControlPanel from "../ControlPanel/ControlPanel";
import ControlPanelControls from "../ControlPanelControls/ControlPanelControls";
import styles from "./styles.module.scss";

type Props = {
  map: WorldMap;
  mapDispatch: Dispatch<WorldMapAction>;
  controlPanelStack: ControlPanelStack;
  controlPanelStackDispatch: ControlPanelStackDispatch;
  setMouseMode: Dispatch<SetStateAction<MouseMode>>;
  selectedStations: SelectedStationsState;
  selectedStationsDispatch: Dispatch<SelectedStationsAction>;
};

const MapControls: FunctionComponent<Props> = ({
  map,
  mapDispatch,
  controlPanelStack,
  controlPanelStackDispatch,
  setMouseMode,
  selectedStations,
  selectedStationsDispatch,
}) => {
  const dispatch: MapControlsDispatch = (action) => {
    switch (action.type) {
      case "open-line-details":
      case "open-line-segment-details":
      case "open-station-details": {
        controlPanelStackDispatch(action);
        break;
      }
      case "open-stations-list":
      case "open-lines-list": {
        controlPanelStackDispatch({ type: "clear" });
        controlPanelStackDispatch(action);
        break;
      }
      case "open-route-planner": {
        selectedStationsDispatch({ type: "reset" });
        setMouseMode("station-selection");
        controlPanelStackDispatch({ type: "clear" });
        controlPanelStackDispatch(action);
        break;
      }
      case "update-station-name":
      case "create-line":
      case "update-line-name":
      case "update-line-color": {
        mapDispatch(action);
        break;
      }
      case "delete-station":
      case "delete-line":
      case "delete-line-segment": {
        mapDispatch(action);
        controlPanelStackDispatch({ type: "pop" });
        setMouseMode("exploration");
        break;
      }
      case "create-line-segment": {
        mapDispatch(action);
        controlPanelStackDispatch({ type: "pop" });
        selectedStationsDispatch({ type: "reset" });
        setMouseMode("exploration");
        break;
      }
      case "enter-station-creation-mode": {
        setMouseMode("station-creation");
        break;
      }
      case "open-line-segment-creator": {
        selectedStationsDispatch({ type: "reset" });
        setMouseMode("station-selection");
        controlPanelStackDispatch(action);
        break;
      }
      case "set-active-index":
      case "select-station": {
        selectedStationsDispatch(action);
        break;
      }
      case "deselect-station": {
        selectedStationsDispatch({ type: "reset", index: action.index });
        break;
      }
      default: {
        // action.type;
      }
    }
  };

  return (
    <MapControlsContext.Provider value={{ map, selectedStations, dispatch }}>
      <ControlPanel
        stack={controlPanelStack}
        stackDispatch={controlPanelStackDispatch}
        className={styles["control-panel"]}
      />
      <ControlPanelControls className={styles["control-panel-controls"]} />
    </MapControlsContext.Provider>
  );
};

export default MapControls;
