import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  useReducer,
} from "react";
import { defaultState } from "./config";
import reducer from "./reducer";
import {
  ActiveTupleIndex,
  SelectedStationsAction,
  StationIdTuple,
} from "./types";

export const SelectedStationsContext = createContext<{
  selectedStationIds: StationIdTuple;
  activeIndex: ActiveTupleIndex;
}>(defaultState);

export const SelectedStationsDispatchContext = createContext<
  Dispatch<SelectedStationsAction>
>(() => null);

const SelectedStationsProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <SelectedStationsContext.Provider value={state}>
      <SelectedStationsDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedStationsDispatchContext.Provider>
    </SelectedStationsContext.Provider>
  );
};

export default SelectedStationsProvider;
