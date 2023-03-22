import { FunctionComponent } from "react";
import Icon, { IconProps } from "../../atoms/Icon/Icon";
import Text from "../../atoms/Text/Text";
import styles from "./styles.module.scss";

export type IconWithLabelProps = {
  iconName: IconProps["name"];
  iconColor?: string;
  label: string;
};

const IconWithLabel: FunctionComponent<IconWithLabelProps> = ({
  iconName,
  iconColor,
  label,
}) => {
  return (
    <>
      <span style={{ color: iconColor }} className={styles["icon-wrapper"]}>
        <Icon name={iconName} />
      </span>
      <Text as="span">{label}</Text>
    </>
  );
};

export default IconWithLabel;
