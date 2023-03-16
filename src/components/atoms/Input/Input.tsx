import clsx from "clsx";
import { FocusEventHandler, forwardRef, HTMLInputTypeAttribute } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import styles from "./styles.module.scss";

type Props = BaseComponentProps & {
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (newValue: string) => void;
  onFocus?: FocusEventHandler;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type, value, onChange, onFocus, className }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        className={clsx(styles.input, className)}
      />
    );
  }
);

export default Input;
