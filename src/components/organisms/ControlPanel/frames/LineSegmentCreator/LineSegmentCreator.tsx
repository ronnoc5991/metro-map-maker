import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import Line from "../../../../../classes/Line";
import { BaseComponentProps } from "../../../../../types/BaseComponentProps";
import { GlobalEventDispatchContext } from "../../../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { SelectedStationsContext } from "../../../../providers/SelectedStationsProvider/SelectedStationsProvider";
import StationSelector from "../../../../molecules/StationSelector/StationSelector";
import Button from "../../../../molecules/Button/Button";

export type LineSegmentCreatorProps = BaseComponentProps & {
  parentLineId: Line["id"];
};

const LineSegmentCreator: FunctionComponent<LineSegmentCreatorProps> = ({
  parentLineId,
  className,
}) => {
  const { selectedStationIds } = useContext(SelectedStationsContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const canCreateLineSegment = selectedStationIds.every(
    (value) => value !== null
  );

  return (
    <div className={clsx(className)}>
      <StationSelector />
      {canCreateLineSegment && (
        <Button
          label="Save"
          onClick={() => {
            globalEventDispatch({
              type: "create-line-segment",
              stationIds: selectedStationIds as [number, number],
              parentLineId: parentLineId,
            });
          }}
        />
      )}
    </div>
  );
};

export default LineSegmentCreator;
