import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import Station from "../../classes/Station";
import Button from "../Button/Button";

// Responsibilites:
// render each preexisting station in a button that pulls up their details
// render a button that allows for creating a new station

type Props = BaseComponentProps & {
  stations: Array<Station>;
  onStationClick: (stationId: Station["id"]) => void;
  onNewStationClick: () => void;
};

const StationsList: FunctionComponent<Props> = ({
  stations,
  onStationClick,
  onNewStationClick,
  className,
}) => {
  return (
    <div className={clsx(className)}>
      <h1>Stations</h1>
      <ul>
        {stations.map((station) => {
          return (
            <li key={station.id}>
              <Button onClick={() => onStationClick(station.id)}>
                {station.name}
              </Button>
            </li>
          );
        })}
        <li>
          <Button onClick={() => onNewStationClick()}>+</Button>
        </li>
      </ul>
    </div>
  );
};

export default StationsList;
