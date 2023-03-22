import { FunctionComponent } from "react";
import Line from "../../../../../classes/Line";
import Button from "../../../../molecules/Button/Button";
import Input from "../../../../atoms/Input/Input";
import Heading from "../../../../atoms/Heading/Heading";
import LineSegment from "../../../../../classes/LineSegment";
import { createFrameGetter } from "../../ControlPanel";
import { useMapControlsContext } from "../../../MapControls/hooks/useMapControlsContext";
import ColorPicker from "../../../../molecules/ColorPicker/ColorPicker";

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
          <Heading as="h2">Segments</Heading>
          <ul>
            {line.segmentIds.map((childSegmentId) => {
              return (
                <li key={childSegmentId}>
                  <Button
                    label={getLineSegmentName(childSegmentId)}
                    onClick={() =>
                      dispatch({
                        type: "open-line-segment-details",
                        props: { id: childSegmentId },
                      })
                    }
                  />
                </li>
              );
            })}
            <li>
              <Button
                label="New Segment"
                onClick={() =>
                  dispatch({
                    type: "open-line-segment-creator",
                    props: { parentLineId: id },
                  })
                }
              />
            </li>
          </ul>
          <Button
            title={`Delete ${line.name}`}
            icon="delete"
            onClick={() => dispatch({ type: "delete-line", id: line.id })}
          />
        </>
      )}
    </>
  );
};

export const createLineDetailsGetter = (props: LineDetailsProps) =>
  createFrameGetter<LineDetailsProps>(LineDetails, props);

export default LineDetails;
