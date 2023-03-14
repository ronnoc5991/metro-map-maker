import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../../../types/BaseComponentProps";
import Station from "../../../../../classes/Station";
import Button from "../../../../molecules/Button/Button";
import Line from "../../../../../classes/Line";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import { GlobalEventDispatchContext } from "../../../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { stationIdTuplelIndices } from "../../../../providers/LineSegmentCreationProvider/types";
import { LineSegmentCreationContext } from "../../../../providers/LineSegmentCreationProvider/contexts/LineSegmentCreationContext";

export type LineSegmentCreatorProps = BaseComponentProps & {
  parentLineId: Line["id"];
};

const LineSegmentCreator: FunctionComponent<LineSegmentCreatorProps> = ({
  parentLineId,
  className,
}) => {
  const { activeIndex, selectedStationIds } = useContext(
    LineSegmentCreationContext
  );
  const { stations } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const findStation = (stationId: Station["id"] | null) =>
    stations.find((station) => station.id === stationId);

  const canCreateLineSegment = selectedStationIds.every(
    (value) => value !== null
  );

  return (
    <div className={clsx(className)}>
      {stationIdTuplelIndices.map((index) => {
        const station = findStation(selectedStationIds[index]);

        let value: string;

        if (!station) {
          value = "Please select a station";
        } else {
          value = station.name;
        }

        return (
          <Button
            label={value}
            key={index}
            onClick={() =>
              globalEventDispatch({
                type: "set-line-segment-creator-active-index",
                index,
              })
            }
            className={clsx({ "is-active": activeIndex === index })}
          ></Button>
        );
      })}
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
        ></Button>
      )}
    </div>
  );
};

export default LineSegmentCreator;
