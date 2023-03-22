import { FunctionComponent } from "react";
import Line from "../../../classes/Line";
import Button from "../../molecules/Button/Button";
import Input from "../../atoms/Input/Input";
import Heading from "../../atoms/Heading/Heading";
import LineSegment from "../../../classes/LineSegment";
import { createFrameGetter } from "../ControlPanel/ControlPanel";
import { useMapControlsContext } from "../MapControls/hooks/useMapControlsContext";
import ColorPicker from "../../molecules/ColorPicker/ColorPicker";
import Icon from "../../atoms/Icon/Icon";
import IconWithLabel from "../../molecules/IconWithLabel/IconWithLabel";
import OptionsList from "../OptionsList/OptionsList";

export type LineDetailsProps = {
  id: Line["id"];
};

const LineDetails: FunctionComponent<LineDetailsProps> = ({ id }) => {
  const { map, dispatch } = useMapControlsContext();
  const { stations, lines, lineSegments } = map;

  const line = lines[id];

  const getLineSegmentName = (lineSegmentId: LineSegment["id"]) => {
    const lineSegment = lineSegments[lineSegmentId];
    const stationNames = lineSegment.stationIds.map(
      (stationId) => stations[stationId].name
    ) as [string, string];

    return `${stationNames[0]} - ${stationNames[1]}`;
  };

  return (
    <>
      {line && (
        <>
          <Input
            type="text"
            value={line.name}
            onChange={(newName) =>
              dispatch({
                type: "update-line-name",
                id: line.id,
                newName,
              })
            }
          />
          <ColorPicker
            value={line.color}
            onChange={(newColor) => {
              dispatch({ type: "update-line-color", id: line.id, newColor });
            }}
          />
          <OptionsList
            title="This line is made up of the following segments:"
            iconName="line-segment"
            onSelect={(id) => {
              dispatch({
                type: "open-line-segment-details",
                props: { id },
              });
            }}
            options={line.segmentIds.map((childSegmentId) => ({
              id: childSegmentId,
              name: getLineSegmentName(childSegmentId),
              color: line.color,
            }))}
          />

          <Button
            onClick={() =>
              dispatch({
                type: "open-line-segment-creator",
                props: { parentLineId: id },
              })
            }
          >
            <IconWithLabel
              iconName="line-segment"
              label="Create a new Line Segment"
            />
          </Button>
          <Button
            title={`Delete ${line.name}`}
            onClick={() => dispatch({ type: "delete-line", id: line.id })}
          >
            <Icon name="delete" />
          </Button>
        </>
      )}
    </>
  );
};

export const createLineDetailsGetter = (props: LineDetailsProps) =>
  createFrameGetter<LineDetailsProps>(LineDetails, props);

export default LineDetails;
