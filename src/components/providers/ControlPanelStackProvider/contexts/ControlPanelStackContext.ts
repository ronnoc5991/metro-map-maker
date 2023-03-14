import { createContext } from "react";
import { Stack } from "../../../../hooks/useStack";
import { ControlPanelFrame } from "../../../organisms/ControlPanel/types";

export const ControlPanelStackContext = createContext<
  Omit<Stack<ControlPanelFrame>, "push" | "pop" | "clear">
>({
  topFrame: undefined,
  size: 0,
});
