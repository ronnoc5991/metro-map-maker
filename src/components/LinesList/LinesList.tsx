import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import Line from "../../classes/Line";
import Button from "../Button/Button";

// Responsibilites:
// render each preexisting line in a button that pulls up their details
// render a button that allows for creating a new line

type Props = BaseComponentProps & {
  lines: Array<Line>;
  onLineClick: (lineId: Line["id"]) => void;
  onNewLineClick: () => void;
};

const LinesList: FunctionComponent<Props> = ({
  lines,
  onLineClick,
  onNewLineClick,
  className,
}) => {
  return (
    <div className={clsx(className)}>
      <h1>Lines</h1>
      <ul>
        {lines.map((line) => (
          <li key={line.id}>
            <Button onClick={() => onLineClick(line.id)}>{line.name}</Button>
          </li>
        ))}
        <li>
          <Button onClick={() => onNewLineClick}>Create new Line</Button>
        </li>
      </ul>
    </div>
  );
};

export default LinesList;
