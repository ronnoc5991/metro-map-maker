import { FunctionComponent, MouseEventHandler, PropsWithChildren } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import "./styles.css";

type Props = BaseComponentProps & {
  onClick: MouseEventHandler;
};

const Button: FunctionComponent<PropsWithChildren<Props>> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button onClick={onClick} className={clsx("Button", className)}>
      {children}
    </button>
  );
};

export default Button;
