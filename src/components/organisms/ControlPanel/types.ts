import { FunctionComponent } from "react";
import { LinesListProps, StationsListProps } from "./frames/ItemList/ItemList";
import { LineDetailsProps } from "./frames/LineDetails/LineDetails";
import { LineSegmentCreatorProps } from "./frames/LineSegmentCreator/LineSegmentCreator";
import { LineSegmentDetailsProps } from "./frames/LineSegmentDetails/LineSegmentDetails";
import { StationDetailsProps } from "./frames/StationDetails/StationDetails";

export type ControlPanelFrame =
  | ComponentWithProps<LineDetailsProps>
  | ComponentWithProps<LineSegmentCreatorProps>
  | ComponentWithProps<LineSegmentDetailsProps>
  | ComponentWithProps<LinesListProps>
  | ComponentWithProps<StationDetailsProps>
  | ComponentWithProps<StationsListProps>;

export type ComponentWithProps<Props> = {
  component: FunctionComponent<Props>;
  props: Props;
};
