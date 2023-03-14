import { createContext, Dispatch, SetStateAction } from "react";
import { MouseMode } from "../MouseModeProvider";

export const MouseModeDispatchContext = createContext<
  Dispatch<SetStateAction<MouseMode>>
>(() => "exploration");
