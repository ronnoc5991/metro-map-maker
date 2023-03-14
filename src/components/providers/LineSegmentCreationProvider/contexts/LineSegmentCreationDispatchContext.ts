import { createContext, Dispatch } from "react";
import { LineSegmentCreationAction } from "../types";

export const LineSegmentCreationDispatchContext = createContext<
  Dispatch<LineSegmentCreationAction>
>(() => null);
