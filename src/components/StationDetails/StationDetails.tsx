import clsx from "clsx";
import { FunctionComponent } from "react";
import Station from "../../classes/Station";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./styles.scss";

// Responsibilites
// Render and allow for editing of the station name
// Render a delete button
// TODO: Display the lines/line segments that this station is on?

// Given just an id, could we get the rest of the stuff from a metroMap context?

type Props = BaseComponentProps & {
  station: Station;
  onDelete: () => void;
  onNameChange: (newName: string) => void;
};

const StationDetails: FunctionComponent<Props> = ({
  station,
  onDelete,
  onNameChange,
  className,
}) => {
  return (
    <div className={clsx("StationDetails", className)}>
      <Input
        type="text"
        value={station.name}
        onChange={onNameChange}
        className={"station-name"}
      />
      <Button onClick={onDelete} className="delete-button">
        Delete
      </Button>
    </div>
  );
};

export default StationDetails;
