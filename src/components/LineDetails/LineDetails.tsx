import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import { MapContext } from "../../contexts/mapContext";
import { DispatchContext } from "../../contexts/dispatchContext";
import Line from "../../classes/Line";
import Button from "../Button/Button";
import Input from "../Input/Input";

// Responsibilites
// Render and allow for editing of the line name
// Render each preexisting child segment in a button that pulls up their details
// Render a button that allows for creating a new child segment
// Render a delete button

export type LineDetailsProps = BaseComponentProps & {
  id: Line["id"];
};

const LineDetails: FunctionComponent<LineDetailsProps> = ({
  id,
  className,
}) => {
  const map = useContext(MapContext);
  const dispatch = useContext(DispatchContext);

  const line = map.lines.find((line) => line.id === id);

  return (
    <div className={clsx(className)}>
      {line && (
        <>
          <Input
            type="text"
            value={line.name}
            onChange={(newName) =>
              dispatch({ type: "update-line-name", id: line.id, newName })
            }
          />
          <h1>Segments</h1>
          <ul>
            {line.segmentIds.map((childSegmentId) => {
              return (
                <li key={childSegmentId}>
                  <Button
                    onClick={() =>
                      dispatch({
                        type: "select-line-segment",
                        id: childSegmentId,
                      })
                    }
                  >
                    {childSegmentId}
                  </Button>
                </li>
              );
            })}
            <li>
              <Button
                onClick={() =>
                  dispatch({
                    type: "enter-line-segment-creation-mode",
                    parentLineId: id,
                  })
                }
              >
                New Segment
              </Button>
            </li>
          </ul>
          <Button
            onClick={() => dispatch({ type: "delete-line", id: line.id })}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default LineDetails;
