import { useRef, useState } from "react";
import { Position } from "../types/Position";
import Station from "../classes/Station";

const useMetroMap = (): {
  stations: Array<Station>;
  addStation: (position: Position) => void;
  updateStationName: (stationId: number, newName: string) => void;
  deleteStation: (stationId: number) => void;
} => {
  const stationId = useRef(1);
  const [stations, setStations] = useState<Array<Station>>([]);

  const addStation = (position: Position) => {
    const newStation = new Station(position, stationId.current++);
    setStations([...stations, newStation]);
  };

  const updateStationName = (stationId: number, newName: string) => {
    const newStations = [...stations];
    const stationIndex = stations.findIndex(
      (station) => station.id === stationId
    );

    if (stationIndex === -1) return;
    newStations.splice(stationIndex, 1, {
      ...newStations[stationIndex],
      name: newName,
    });
    setStations(newStations);
  };

  const deleteStation = (stationId: number) => {
    const newStations = stations.filter((station) => station.id !== stationId);
    setStations(newStations);
  };

  return { stations, addStation, updateStationName, deleteStation };
};

export default useMetroMap;
