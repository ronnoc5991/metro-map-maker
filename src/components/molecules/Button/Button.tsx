import { FunctionComponent, MouseEventHandler, PropsWithChildren } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import styles from "./styles.module.scss";

export type ButtonProps = BaseComponentProps & {
  title?: string;
  onClick: MouseEventHandler;
};

const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  title,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={clsx(styles.button, className)}
    >
      {children}
    </button>
  );
};

export default Button;
