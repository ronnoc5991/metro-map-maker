import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { GlobalEventDispatchContext } from "../../../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import { BaseComponentProps } from "../../../../../types/BaseComponentProps";
import Line from "../../../../../classes/Line";
import Station from "../../../../../classes/Station";
import Button from "../../../../molecules/Button/Button";
import Input from "../../../../atoms/Input/Input";
import "./styles.scss";
import Heading from "../../../../atoms/Heading/Heading";

export type StationDetailsProps = BaseComponentProps & {
  id: Station["id"];
};

const StationDetails: FunctionComponent<StationDetailsProps> = ({
  id,
  className,
}) => {
  const { stations, lineSegments, lines } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const station = stations[id];

  // const parentLines = new Set<Line>();

  // station.connectedLineSegmentIds.forEach((lineSegmentId) => {
  //   const lineSegment = lineSegments[lineSegmentId];

  //   lineSegment.parentLineId.forEach((parentLineId) => {
  //     const parentLine = lines[parentLineId];

  //     parentLines.add(parentLine);
  //   });
  // });

  return (
    <div className={clsx("StationDetails", className)}>
      <Input
        type="text"
        value={station.name}
        onChange={(newName) =>
          globalEventDispatch({
            type: "update-station-name",
            id: station.id,
            newName,
          })
        }
      />
      <Button
        icon="delete"
        title={`Delete ${station.name}`}
        className="delete-button"
        onClick={() =>
          globalEventDispatch({ type: "delete-station", id: station.id })
        }
      />
      {/* {parentLines.size > 0 && (
        <>
          <Heading as="h2" size="medium">
            {station.name} sits on lines:
          </Heading>
          <ul>
            {[...parentLines].map((parentLine) => {
              return (
                <li key={`parent-line-${parentLine.id}`}>
                  <Button
                    label={parentLine.name}
                    icon="line"
                    onClick={() =>
                      globalEventDispatch({
                        type: "open-line-details",
                        id: parentLine.id,
                      })
                    }
                  />
                </li>
              );
            })}
          </ul>
        </>
      )} */}
    </div>
  );
};

export default StationDetails;
