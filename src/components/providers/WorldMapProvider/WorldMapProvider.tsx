import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  useReducer,
} from "react";
import { emptyWorldMap } from "./config";
import { WorldMap, WorldMapAction } from "./types";
import worldMapReducer from "./worldMapReducer";

export const WorldMapContext = createContext<WorldMap>(emptyWorldMap);
export const WorldMapDispatchContext = createContext<Dispatch<WorldMapAction>>(
  () => undefined
);

const WorldMapProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [map, dispatch] = useReducer(worldMapReducer, emptyWorldMap);

  return (
    <WorldMapContext.Provider value={map}>
      <WorldMapDispatchContext.Provider value={dispatch}>
        {children}
      </WorldMapDispatchContext.Provider>
    </WorldMapContext.Provider>
  );
};

export default WorldMapProvider;
