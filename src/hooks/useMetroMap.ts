import { useRef, useState } from "react";
import { Position } from "../types/Position";
import Station from "../classes/Station";

const useMetroMap = (): {
  stations: Array<Station>;
  addStation: (position: Position) => void;
  deleteStation: (stationId: number) => void;
} => {
  const stationId = useRef(0);
  const [stations, setStations] = useState<Array<Station>>([]);

  const addStation = (position: Position) => {
    const newStation = new Station(position, stationId.current++);
    setStations([...stations, newStation]);
  };

  const deleteStation = (stationId: number) => {
    const newStations = stations.filter((station) => station.id !== stationId);
    setStations(newStations);
  };

  return { stations, addStation, deleteStation };
};

export default useMetroMap;
