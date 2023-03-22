import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import Button, { ButtonProps } from "../../molecules/Button/Button";
import styles from "./styles.module.scss";

type Props = BaseComponentProps & {
  buttonProps: Array<ButtonProps>;
};

const ButtonList: FunctionComponent<Props> = ({ buttonProps, className }) => {
  return (
    <ul className={clsx(styles["button-list"], className)}>
      {buttonProps.map((props, index) => {
        return (
          <li key={index} className={styles.child}>
            <Button {...props} />
          </li>
        );
      })}
    </ul>
  );
};

export default ButtonList;
