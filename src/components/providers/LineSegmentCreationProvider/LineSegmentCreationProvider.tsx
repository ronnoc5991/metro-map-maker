import { FunctionComponent, PropsWithChildren, useReducer } from "react";
import { defaultState } from "./config";
import reducer from "./reducer";
import { LineSegmentCreationDispatchContext } from "./contexts/LineSegmentCreationDispatchContext";
import { LineSegmentCreationContext } from "./contexts/LineSegmentCreationContext";

const LineSegmentCreationProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <LineSegmentCreationContext.Provider value={state}>
      <LineSegmentCreationDispatchContext.Provider value={dispatch}>
        {children}
      </LineSegmentCreationDispatchContext.Provider>
    </LineSegmentCreationContext.Provider>
  );
};

export default LineSegmentCreationProvider;
