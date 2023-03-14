import { createContext } from "react";
import { MouseMode } from "../MouseModeProvider";

export const MouseModeContext = createContext<MouseMode>("exploration");
