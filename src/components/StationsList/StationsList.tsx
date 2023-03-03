import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { DispatchContext } from "../../contexts/dispatchContext";
import { MapContext } from "../../contexts/mapContext";
import Button from "../Button/Button";

// Responsibilites:
// render each preexisting station in a button that pulls up their details
// render a button that allows for creating a new station

export type StationsListProps = BaseComponentProps & {};

const StationsList: FunctionComponent<StationsListProps> = ({ className }) => {
  const map = useContext(MapContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className={clsx(className)}>
      <h1>Stations</h1>
      {
        <ul>
          {map.stations.map((station) => {
            return (
              <li key={station.id}>
                <Button
                  onClick={() =>
                    dispatch({ type: "select-station", id: station.id })
                  }
                >
                  {station.name}
                </Button>
              </li>
            );
          })}
          <li>
            <Button
              onClick={() => dispatch({ type: "enter-station-creation-mode" })}
            >
              +
            </Button>
          </li>
        </ul>
      }
    </div>
  );
};

export default StationsList;
