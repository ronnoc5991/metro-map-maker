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
// also allow for clicking of the stations to visit the station detail page?

export type LineSegmentDetailsProps = BaseComponentProps & {
  id: LineSegment["id"];
};

const LineSegmentDetails: FunctionComponent<LineSegmentDetailsProps> = ({
  id,
  className,
}) => {
  const { lineSegments } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const lineSegment = lineSegments.find((lineSegment) => lineSegment.id === id);

  if (!lineSegment) return null;

  return (
    <div className={clsx(className)}>
      <h1>{lineSegment.stationIds[0]}</h1>
      <h1>{lineSegment.stationIds[1]}</h1>

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
