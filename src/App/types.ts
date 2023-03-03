import { FunctionComponent } from "react";
import { LineDetailsProps } from "../components/LineDetails/LineDetails";
import { LineSegmentCreatorProps } from "../components/LineSegmentCreator/LineSegmentCreator";
import { LineSegmentDetailsProps } from "../components/LineSegmentDetails/LineSegmentDetails";
import { LinesListProps } from "../components/LinesList/LinesList";
import { StationDetailsProps } from "../components/StationDetails/StationDetails";
import { StationsListProps } from "../components/StationsList/StationsList";

export type SidePanelContent =
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
