import { createContext } from "react";
import { MetroMap } from "../types/MetroMap";

export const MapContext = createContext<MetroMap>({
  stations: [],
  lines: [],
  lineSegments: [],
});
