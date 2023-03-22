import { FunctionComponent } from "react";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../molecules/Button/Button";
import IconWithLabel, {
  IconWithLabelProps,
} from "../../molecules/IconWithLabel/IconWithLabel";
import styles from "./styles.module.scss";

type Props = Omit<IconWithLabelProps, "label" | "iconColor"> & {
  title?: string;
  options: Array<{ id: number; name: string; color?: string }>;
  onSelect: (id: number) => void;
};

const OptionsList: FunctionComponent<Props> = ({
  title,
  iconName,
  options,
  onSelect,
}) => {
  return (
    <>
      {title && (
        <Heading as="h2" className={styles.title}>
          {title}
        </Heading>
      )}
      <ul className={styles.list}>
        {options.map((option) => (
          <li key={option.id} className={styles["list-item"]}>
            <Button
              title={`Select ${option.name}`}
              onClick={() => onSelect(option.id)}
            >
              <IconWithLabel
                iconName={iconName}
                iconColor={option.color}
                label={option.name}
              />
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default OptionsList;
