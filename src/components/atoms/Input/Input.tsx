import clsx from "clsx";
import { FunctionComponent, HTMLInputTypeAttribute } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import "./styles.scss";

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
      className={clsx("Input", className)}
    />
  );
};

export default Input;
