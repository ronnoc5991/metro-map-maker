import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../../../types/BaseComponentProps";
import Line from "../../../../../classes/Line";
import Button from "../../../../molecules/Button/Button";
import Input from "../../../../atoms/Input/Input";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import { GlobalEventDispatchContext } from "../../../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";

export type LineDetailsProps = BaseComponentProps & {
  id: Line["id"];
};

const LineDetails: FunctionComponent<LineDetailsProps> = ({
  id,
  className,
}) => {
  const { lines } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const line = lines[id];

  return (
    <div className={clsx(className)}>
      {line && (
        <>
          <Input
            type="text"
            value={line.name}
            onChange={(newName) =>
              globalEventDispatch({
                type: "update-line-name",
                id: line.id,
                newName,
              })
            }
          />
          <h1>Segments</h1>
          <ul>
            {line.segmentIds.map((childSegmentId) => {
              return (
                <li key={`${childSegmentId}`}>
                  <Button
                    label={`${childSegmentId}`}
                    onClick={() =>
                      globalEventDispatch({
                        type: "open-line-segment-details",
                        id: childSegmentId,
                      })
                    }
                  />
                </li>
              );
            })}
            <li>
              <Button
                label="New Segment"
                onClick={() =>
                  globalEventDispatch({
                    type: "enter-line-segment-creation-mode",
                    parentLineId: id,
                  })
                }
              />
            </li>
          </ul>
          <Button
            title={`Delete ${line.name}`}
            icon="delete"
            onClick={() =>
              globalEventDispatch({ type: "delete-line", id: line.id })
            }
          />
        </>
      )}
    </div>
  );
};

export default LineDetails;
