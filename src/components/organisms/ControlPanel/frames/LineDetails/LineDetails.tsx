import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../../../types/BaseComponentProps";
import Line from "../../../../../classes/Line";
import Button from "../../../../molecules/Button/Button";
import Input from "../../../../atoms/Input/Input";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import { GlobalEventDispatchContext } from "../../../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import Heading from "../../../../atoms/Heading/Heading";
import LineSegment from "../../../../../classes/LineSegment";

export type LineDetailsProps = BaseComponentProps & {
  id: Line["id"];
};

const LineDetails: FunctionComponent<LineDetailsProps> = ({
  id,
  className,
}) => {
  const { stations, lines, lineSegments } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const line = lines[id];

  const getLineSegmentName = (lineSegmentId: LineSegment["id"]) => {
    const lineSegment = lineSegments[lineSegmentId];
    const stationNames = lineSegment.stationIds.map(
      (stationId) => stations[stationId].name
    ) as [string, string];

    return `${stationNames[0]} - ${stationNames[1]}`;
  };

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
          <Heading as="h2">Segments</Heading>
          <ul>
            {line.segmentIds.map((childSegmentId) => {
              return (
                <li key={childSegmentId}>
                  <Button
                    label={getLineSegmentName(childSegmentId)}
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
