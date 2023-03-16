import { FunctionComponent } from "react";
import Button from "../../molecules/Button/Button";

type Props = {
  options: Array<{ id: number; label: string }>;
  onSelect: (id: number) => void;
};

// TODO: pass an optional label to the options list?

const OptionsList: FunctionComponent<Props> = ({ options, onSelect }) => {
  return (
    <ul>
      {options.map((option) => (
        <li key={option.id}>
          <Button
            label={option.label}
            title={`Select ${option.label}`}
            onClick={() => onSelect(option.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default OptionsList;
