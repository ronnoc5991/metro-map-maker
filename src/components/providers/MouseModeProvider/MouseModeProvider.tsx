import { FunctionComponent, PropsWithChildren, useState } from "react";
import { MouseModeDispatchContext } from "./contexts/MouseModeDispatchContext";
import { MouseModeContext } from "./contexts/MouseModeContext";

export type MouseMode =
  | "exploration"
  | "station-creation"
  | "line-segment-creation";

const MouseModeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [mouseMode, setMouseMode] = useState<MouseMode>("exploration");

  return (
    <MouseModeContext.Provider value={mouseMode}>
      <MouseModeDispatchContext.Provider value={setMouseMode}>
        {children}
      </MouseModeDispatchContext.Provider>
    </MouseModeContext.Provider>
  );
};

export default MouseModeProvider;
