import clsx from "clsx";
import { FunctionComponent, PropsWithChildren } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import { FontSize } from "../../../types/FontSize";
import { HeadingAs } from "./types";
import "./styles.scss";

type Props = BaseComponentProps & {
  as: HeadingAs;
  size?: FontSize;
  thin?: boolean;
  italic?: boolean;
};

const Heading: FunctionComponent<PropsWithChildren<Props>> = ({
  as,
  size = "medium",
  thin = false,
  italic = false,
  className,
  children,
}) => {
  const Tag = as;
  return (
    <Tag
      className={clsx("heading", size, className, {
        thin: thin,
        italic: italic,
      })}
    >
      {children}
    </Tag>
  );
};

export default Heading;
