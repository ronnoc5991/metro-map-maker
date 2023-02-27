import { Children, FunctionComponent, PropsWithChildren } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import "./styles.scss";

type Props = BaseComponentProps & {};

const ControlPanel: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <ul className={clsx("ControlPanel", className)}>
      {Children.map(children, (child, index) => {
        return (
          <li key={index} className="child">
            {child}
          </li>
        );
      })}
    </ul>
  );
};

export default ControlPanel;
