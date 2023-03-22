import { useContext } from "react";
import { MapControlsContext } from "../contexts/MapControlsContext";

export const useMapControlsContext = () => {
  const context = useContext(MapControlsContext);

  if (context === undefined) throw Error("No MapControlsContext was provided!");

  return context;
};
