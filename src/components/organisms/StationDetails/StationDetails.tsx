import { FunctionComponent } from "react";
import Line from "../../../classes/Line";
import Station from "../../../classes/Station";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import Button from "../../molecules/Button/Button";
import { createFrameGetter } from "../ControlPanel/ControlPanel";
import OptionsList from "../OptionsList/OptionsList";
import { useMapControlsContext } from "../MapControls/hooks/useMapControlsContext";
import styles from "./styles.module.scss";

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
        title={`Delete ${station.name}`}
        className={styles["delete-button"]}
        onClick={() => dispatch({ type: "delete-station", id: station.id })}
      >
        <Icon name="delete" />
      </Button>
      {parentLines.size > 0 && (
        <OptionsList
          title={`${station.name} sits on the following lines:`}
          iconName="line"
          onSelect={(id) =>
            dispatch({
              type: "open-line-details",
              props: { id },
            })
          }
          options={[...parentLines]}
        />
      )}
    </div>
  );
};

export const createStationDetailsGetter = (props: StationDetailsProps) =>
  createFrameGetter<StationDetailsProps>(StationDetails, props);

export default StationDetails;
