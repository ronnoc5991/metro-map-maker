import { FunctionComponent, MouseEventHandler } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import Icon, { IconProps } from "../../atoms/Icon/Icon";
import Text from "../../atoms/Text/Text";
import "./styles.scss";

export type ButtonProps = BaseComponentProps & {
  icon?: IconProps["name"];
  label?: string;
  title?: string;
  onClick: MouseEventHandler;
};

const Button: FunctionComponent<ButtonProps> = ({
  icon,
  label,
  title,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={clsx("Button", className)}
    >
      {icon && <Icon name={icon} className="icon" />}
      {label && (
        <Text as="span" className="label">
          {label}
        </Text>
      )}
    </button>
  );
};

export default Button;
