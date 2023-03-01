import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import LineSegment from "../../classes/LineSegment";
import Line from "../../classes/Line";
import Button from "../Button/Button";
import Input from "../Input/Input";

// Responsibilites
// Render and allow for editing of the line name
// render each preexisting child segment in a button that pulls up their details
// render a button that allows for creating a new child segment
// Render a delete button

// Given just an id, could we get the rest of the stuff from a metroMap context?

type Props = BaseComponentProps & {
  line: Line;
  onNameChange: (newName: string) => void;
  onChildSegmentClick: (childSegmentId: LineSegment["id"]) => void;
  onNewSegmentClick: () => void; // will we need the parent line id?
  onDelete: () => void;
};

const LineDetails: FunctionComponent<Props> = ({
  line,
  onNameChange,
  onChildSegmentClick,
  onNewSegmentClick,
  onDelete,
  className,
}) => {
  return (
    <div className={clsx(className)}>
      <Input type="text" value={line.name} onChange={onNameChange} />
      <h1>Segments</h1>
      <ul>
        {line.segmentIds.map((childSegmentId) => {
          return (
            <li key={childSegmentId}>
              <Button onClick={() => onChildSegmentClick(childSegmentId)}>
                {childSegmentId}
              </Button>
            </li>
          );
        })}
        <li>
          <Button onClick={onNewSegmentClick}>New Segment</Button>
        </li>
      </ul>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
};

export default LineDetails;
