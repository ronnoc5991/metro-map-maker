import { FunctionComponent, MouseEventHandler } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import Icon, { IconProps } from "../../atoms/Icon/Icon";
import Text from "../../atoms/Text/Text";
import styles from "./styles.module.scss";

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
      className={clsx(styles.button, className)}
    >
      {icon && <Icon name={icon} className={styles.icon} />}
      {label && (
        <Text as="span" className={styles.label}>
          {label}
        </Text>
      )}
    </button>
  );
};

export default Button;
