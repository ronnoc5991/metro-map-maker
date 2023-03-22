import { FunctionComponent } from "react";
import { ReactComponent as Station } from "./svgs/station.svg";
import { ReactComponent as LineSegment } from "./svgs/line-segment.svg";
import { ReactComponent as Line } from "./svgs/line.svg";
import { ReactComponent as Plus } from "./svgs/plus.svg";
import { ReactComponent as Minus } from "./svgs/minus.svg";
import { ReactComponent as Close } from "./svgs/close.svg";
import { ReactComponent as Back } from "./svgs/back.svg";
import { ReactComponent as Delete } from "./svgs/delete.svg";
import { ReactComponent as Directions } from "./svgs/directions.svg";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import clsx from "clsx";

type Name =
  | "station"
  | "line-segment"
  | "line"
  | "plus"
  | "minus"
  | "close"
  | "back"
  | "delete"
  | "directions";

export type IconProps = BaseComponentProps & {
  name: Name;
};

const getComponent = (name: Name) => {
  switch (name) {
    case "station":
      return Station;
    case "line-segment":
      return LineSegment;
    case "line":
      return Line;
    case "plus":
      return Plus;
    case "minus":
      return Minus;
    case "close":
      return Close;
    case "back":
      return Back;
    case "delete":
      return Delete;
    case "directions":
      return Directions;
  }
};

const Icon: FunctionComponent<IconProps> = ({ name, className }) => {
  const Component = getComponent(name);
  return <Component className={clsx(className)} />;
};

export default Icon;
