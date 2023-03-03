import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { DispatchContext } from "../../contexts/dispatchContext";
import { MapContext } from "../../contexts/mapContext";
import Station from "../../classes/Station";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./styles.scss";

// Responsibilites
// Render and allow for editing of the station name
// Render a delete button
// TODO: Display the lines/line segments that this station is on?

export type StationDetailsProps = BaseComponentProps & {
  id: Station["id"];
};

const StationDetails: FunctionComponent<StationDetailsProps> = ({
  id,
  className,
}) => {
  const map = useContext(MapContext);
  const dispatch = useContext(DispatchContext);

  const station = map.stations.find((station) => station.id === id);

  return (
    <div className={clsx("StationDetails", className)}>
      {station && (
        <>
          <Input
            type="text"
            value={station.name}
            className={"station-name"}
            onChange={(newName) =>
              dispatch({
                type: "update-station-name",
                id: station.id,
                newName,
              })
            }
          />
          <Button
            className="delete-button"
            onClick={() => dispatch({ type: "delete-station", id: station.id })}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default StationDetails;
