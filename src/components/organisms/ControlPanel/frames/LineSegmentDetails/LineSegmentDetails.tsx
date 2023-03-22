import { FunctionComponent } from "react";
import Button from "../../../../molecules/Button/Button";
import LineSegment from "../../../../../classes/LineSegment";
import { createFrameGetter } from "../../ControlPanel";
import { useMapControlsContext } from "../../../MapControls/hooks/useMapControlsContext";

// Responsibilites
// Display line segment stations
// Render a delete button
// TODO: Allow for editing/dragging the lines control points
// - should we display an edit button? then update a state in app
// - we should draw the segment's control points
// - and we should allow for dragging them

export type LineSegmentDetailsProps = {
  id: LineSegment["id"];
};

const LineSegmentDetails: FunctionComponent<LineSegmentDetailsProps> = ({
  id,
}) => {
  const { map, dispatch } = useMapControlsContext();
  const { lineSegments, stations } = map;

  const lineSegment = lineSegments[id];

  return (
    <>
      {lineSegment.stationIds.map((stationId) => {
        return (
          <Button
            key={stationId}
            onClick={() =>
              dispatch({
                type: "open-station-details",
                props: { id: stationId },
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
          dispatch({
            type: "delete-line-segment",
            id: lineSegment.id,
          })
        }
      />
    </>
  );
};

export const createLineSegmentDetailsGetter = (
  props: LineSegmentDetailsProps
) => createFrameGetter<LineSegmentDetailsProps>(LineSegmentDetails, props);

export default LineSegmentDetails;
