import clsx from "clsx";
import { FunctionComponent, PropsWithChildren } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import { FontSize } from "../../../types/FontSize";
import { TextAs } from "./types";
import "./styles.scss";

type Props = BaseComponentProps & {
  as: TextAs;
  size?: FontSize;
  thin?: boolean;
  italic?: boolean;
};

const Text: FunctionComponent<PropsWithChildren<Props>> = ({
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
      className={clsx("text", size, className, { thin: thin, italic: italic })}
    >
      {children}
    </Tag>
  );
};

export default Text;
