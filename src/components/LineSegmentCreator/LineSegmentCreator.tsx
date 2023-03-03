import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import {
  LineSegmentCreationContext,
  selectingIndices,
} from "../../contexts/lineSegmentCreationContext";
import { MapContext } from "../../contexts/mapContext";
import Station from "../../classes/Station";
import Button from "../Button/Button";
import { DispatchContext } from "../../contexts/dispatchContext";
import Line from "../../classes/Line";

export type LineSegmentCreatorProps = BaseComponentProps & {
  parentLineId: Line["id"];
};

const LineSegmentCreator: FunctionComponent<LineSegmentCreatorProps> = ({
  parentLineId,
  className,
}) => {
  const context = useContext(LineSegmentCreationContext);
  const map = useContext(MapContext);
  const dispatch = useContext(DispatchContext);

  if (!context) return null;

  const findStation = (stationId: Station["id"] | null) =>
    map.stations.find((station) => station.id === stationId);

  return (
    <div className={clsx(className)}>
      {selectingIndices.map((index) => {
        const station = findStation(context.selectedStationIds[index]);

        let value: string;

        if (!station) {
          value = "Please select a station";
        } else {
          value = station.name;
        }

        return (
          <Button
            key={index}
            onClick={() => context.setSelectingIndex(index)}
            className={clsx({ "is-active": context.selectingIndex === index })}
          >
            <h1>{value}</h1>
          </Button>
        );
      })}
      {context.selectedStationIds.every((value) => value !== null) && (
        <Button
          onClick={() => {
            dispatch({
              type: "create-line-segment",
              stationIds: [...context.selectedStationIds] as [number, number],
              parentLineId: parentLineId,
            });
            // TODO: need to reset these things for the next segment creation
          }}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default LineSegmentCreator;
