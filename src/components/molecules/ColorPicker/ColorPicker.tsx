import { FunctionComponent, useRef } from "react";
import Input, { InputProps } from "../../atoms/Input/Input";
import styles from "./styles.module.scss";

type Props = Omit<InputProps, "type">;

const ColorPicker: FunctionComponent<Props> = ({ value, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <button
      className={styles.button}
      onClick={() => {
        inputRef.current?.click();
      }}
      style={{ backgroundColor: value }}
    >
      <Input
        type="color"
        value={value}
        {...props}
        className={styles.input}
        ref={inputRef}
      />
    </button>
  );
};

export default ColorPicker;
