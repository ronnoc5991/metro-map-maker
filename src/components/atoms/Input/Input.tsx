import clsx from "clsx";
import { FunctionComponent, HTMLInputTypeAttribute } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import styles from "./styles.module.scss";

type Props = BaseComponentProps & {
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (newValue: string) => void;
};

const Input: FunctionComponent<Props> = ({
  type,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={clsx(styles.input, className)}
    />
  );
};

export default Input;
