import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import LineSegment from "../../classes/LineSegment";
import Button from "../Button/Button";

// Responsibilites
// Display line segment from and to stations?
// Render a delete button
// TODO: Allow for editing/dragging the lines control points
// - should we display an edit button? then update a state in app
// - we should draw the segment's control points
// - and we should allow for dragging them

type Props = BaseComponentProps & {
  segment: LineSegment;
  onDelete: () => void;
};

const LineSegmentDetails: FunctionComponent<Props> = ({
  segment,
  onDelete,
  className,
}) => {
  return (
    <div className={clsx(className)}>
      <h1>From: {segment.stationIds[0]}</h1>
      <h1>To: {segment.stationIds[1]}</h1>

      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
};

export default LineSegmentDetails;
