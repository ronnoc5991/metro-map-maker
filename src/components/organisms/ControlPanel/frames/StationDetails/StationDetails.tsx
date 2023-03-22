import { FunctionComponent } from "react";
import Line from "../../../../../classes/Line";
import Station from "../../../../../classes/Station";
import Button from "../../../../molecules/Button/Button";
import Input from "../../../../atoms/Input/Input";
import Heading from "../../../../atoms/Heading/Heading";
import styles from "./styles.module.scss";
import { createFrameGetter } from "../../ControlPanel";
import { useMapControlsContext } from "../../../MapControls/hooks/useMapControlsContext";

export type StationDetailsProps = {
  id: Station["id"];
};

const StationDetails: FunctionComponent<StationDetailsProps> = ({ id }) => {
  const { map, dispatch } = useMapControlsContext();
  const { stations, lineSegments, lines } = map;

  const station = stations[id];

  const parentLines = new Set<Line>();

  station.connectedLineSegmentIds.forEach((lineSegmentId) => {
    const lineSegment = lineSegments[lineSegmentId];

    const parentLine = lines[lineSegment.parentLineId];
    parentLines.add(parentLine);
  });

  return (
    <div className={styles["station-details"]}>
      <Input
        type="text"
        value={station.name}
        onChange={(newName) =>
          dispatch({
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
        onClick={() => dispatch({ type: "delete-station", id: station.id })}
      />
      {parentLines.size > 0 && (
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
                      dispatch({
                        type: "open-line-details",
                        props: { id: parentLine.id },
                      })
                    }
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export const createStationDetailsGetter = (props: StationDetailsProps) =>
  createFrameGetter<StationDetailsProps>(StationDetails, props);

export default StationDetails;
