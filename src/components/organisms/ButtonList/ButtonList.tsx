import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import styles from "./styles.module.scss";

type Props = BaseComponentProps & {
  buttons: Array<JSX.Element>;
};

const ButtonList: FunctionComponent<Props> = ({ buttons, className }) => {
  return (
    <ul className={clsx(styles["button-list"], className)}>
      {buttons.map((button, index) => {
        return (
          <li key={index} className={styles.child}>
            {button}
          </li>
        );
      })}
    </ul>
  );
};

export default ButtonList;
