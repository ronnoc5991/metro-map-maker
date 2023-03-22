import { FunctionComponent } from "react";
import Line from "../../../../../classes/Line";
import StationSelector from "../../../../molecules/StationSelector/StationSelector";
import Button from "../../../../molecules/Button/Button";
import { createFrameGetter } from "../../ControlPanel";
import { useMapControlsContext } from "../../../MapControls/hooks/useMapControlsContext";

export type LineSegmentCreatorProps = {
  parentLineId: Line["id"];
};

const LineSegmentCreator: FunctionComponent<LineSegmentCreatorProps> = ({
  parentLineId,
}) => {
  const { selectedStations, dispatch } = useMapControlsContext();
  const { selectedStationIds } = selectedStations;

  const canCreateLineSegment = selectedStationIds.every(
    (value) => value !== null
  );

  return (
    <>
      <StationSelector />
      {canCreateLineSegment && (
        <Button
          label="Save"
          onClick={() => {
            dispatch({
              type: "create-line-segment",
              stationIds: selectedStationIds as [number, number],
              parentLineId: parentLineId,
            });
          }}
        />
      )}
    </>
  );
};

export const createLineSegmentCreatorGetter = (
  props: LineSegmentCreatorProps
) => createFrameGetter<LineSegmentCreatorProps>(LineSegmentCreator, props);

export default LineSegmentCreator;
