import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import Button, { ButtonProps } from "../../molecules/Button/Button";
import "./styles.scss";

type Props = BaseComponentProps & {
  buttonProps: Array<ButtonProps>;
};

const ButtonList: FunctionComponent<Props> = ({ buttonProps, className }) => {
  return (
    <ul className={clsx("button-list", className)}>
      {buttonProps.map((props, index) => {
        return (
          <li key={index} className="child">
            <Button {...props} />
          </li>
        );
      })}
    </ul>
  );
};

export default ButtonList;
