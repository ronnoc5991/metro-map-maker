import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../../../types/BaseComponentProps";
import Button from "../../../../molecules/Button/Button";
import LineSegment from "../../../../../classes/LineSegment";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import { GlobalEventDispatchContext } from "../../../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";

// Responsibilites
// Display line segment stations
// Render a delete button
// TODO: Allow for editing/dragging the lines control points
// - should we display an edit button? then update a state in app
// - we should draw the segment's control points
// - and we should allow for dragging them

export type LineSegmentDetailsProps = BaseComponentProps & {
  id: LineSegment["id"];
};

const LineSegmentDetails: FunctionComponent<LineSegmentDetailsProps> = ({
  id,
  className,
}) => {
  const { lineSegments, stations } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const lineSegment = lineSegments[id];

  return (
    <div className={clsx(className)}>
      {lineSegment.stationIds.map((stationId) => {
        return (
          <Button
            onClick={() =>
              globalEventDispatch({
                type: "open-station-details",
                id: stationId,
              })
            }
            label={stations[stationId].name}
          />
        );
      })}

      <Button
        icon="delete"
        title="Delete Line Segment"
        onClick={() =>
          globalEventDispatch({
            type: "delete-line-segment",
            id: lineSegment.id,
          })
        }
      />
    </div>
  );
};

export default LineSegmentDetails;
