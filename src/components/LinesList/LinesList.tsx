import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { MapContext } from "../../contexts/mapContext";
import Button from "../Button/Button";
import { DispatchContext } from "../../contexts/dispatchContext";

// Responsibilites:
// render each preexisting line in a button that pulls up their details
// render a button that allows for creating a new line

export type LinesListProps = BaseComponentProps & {};

const LinesList: FunctionComponent<LinesListProps> = ({ className }) => {
  const map = useContext(MapContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className={clsx(className)}>
      <h1>Lines</h1>
      {
        <ul>
          {map.lines.map((line) => (
            <li key={line.id}>
              <Button
                onClick={() => dispatch({ type: "select-line", id: line.id })}
              >
                {line.name}
              </Button>
            </li>
          ))}
          <li>
            <Button onClick={() => dispatch({ type: "create-line" })}>
              + New Line
            </Button>
          </li>
        </ul>
      }
    </div>
  );
};

export default LinesList;
