import clsx from "clsx";
import { FunctionComponent, PropsWithChildren } from "react";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import Button from "../Button/Button";
import "./styles.scss";

type Props = BaseComponentProps & {
  isOpen: boolean;
  onClose: () => void;
};

const SidePanel: FunctionComponent<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  return (
    <div className={clsx("SidePanel", { "is-open": isOpen }, className)}>
      <Button onClick={onClose} className={"close-button"}>
        X
      </Button>
      {children}
    </div>
  );
};

export default SidePanel;
