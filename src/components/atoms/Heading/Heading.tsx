import clsx from "clsx";
import { FunctionComponent, PropsWithChildren } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import { FontSize } from "../../../types/FontSize";
import styles from "./styles.module.scss";

type Props = BaseComponentProps & {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
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
      className={clsx(styles.heading, styles[`${size}`], className, {
        thin: thin,
        italic: italic,
      })}
    >
      {children}
    </Tag>
  );
};

export default Heading;
