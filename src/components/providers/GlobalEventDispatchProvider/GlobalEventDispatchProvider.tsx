import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from "react";
import { MouseModeDispatchContext } from "../MouseModeProvider/contexts/MouseModeDispatchContext";
import { ControlPanelStackDispatchContext } from "../ControlPanelStackProvider/contexts/ControlPanelStackDispatchContext";
import { WorldMapDispatchContext } from "../WorldMapProvider/WorldMapProvider";
import {
  getGlobalEventDispatch,
  GlobalEventDispatch,
} from "./utils/getGlobalEventDispatch";
import { SelectedStationsDispatchContext } from "../SelectedStationsProvider/SelectedStationsProvider";

export const GlobalEventDispatchContext = createContext<GlobalEventDispatch>(
  () => undefined
);

const GlobalEventDispatchProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const worldMapDispatch = useContext(WorldMapDispatchContext);
  const controlPanelStackDispatch = useContext(
    ControlPanelStackDispatchContext
  );
  const mouseModeDispatch = useContext(MouseModeDispatchContext);
  const selectedStationsDispatch = useContext(SelectedStationsDispatchContext);

  const globalEventDispatch = getGlobalEventDispatch(
    worldMapDispatch,
    controlPanelStackDispatch,
    mouseModeDispatch,
    selectedStationsDispatch
  );

  return (
    <GlobalEventDispatchContext.Provider value={globalEventDispatch}>
      {children}
    </GlobalEventDispatchContext.Provider>
  );
};

export default GlobalEventDispatchProvider;
