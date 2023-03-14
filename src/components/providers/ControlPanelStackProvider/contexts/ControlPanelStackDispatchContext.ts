import { createContext } from "react";
import { ControlPanelStackDispatch } from "../types";

export const ControlPanelStackDispatchContext =
  createContext<ControlPanelStackDispatch>(() => null);
