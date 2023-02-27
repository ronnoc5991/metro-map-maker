import clsx from "clsx";
import { FunctionComponent } from "react";
import Station from "../../classes/Station";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./styles.scss";

type Props = BaseComponentProps & {
  station: Station;
  onDelete: () => void;
  onNameChange: (newName: string) => void;
};

const StationEditor: FunctionComponent<Props> = ({
  station,
  onDelete,
  onNameChange,
  className,
}) => {
  return (
    <div className={clsx("StationEditor", className)}>
      <Input
        type="text"
        value={station.name}
        onChange={onNameChange}
        className={"station-name"}
      />
      <Button onClick={onDelete} className="delete-button">
        D
      </Button>
    </div>
  );
};

export default StationEditor;
