import { FunctionComponent, PropsWithChildren } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../types/BaseComponentProps";
import Button from "../Button/Button";
import "./styles.scss";

type Props = BaseComponentProps & {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
};

const SidePanel: FunctionComponent<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  onBack,
  className,
  children,
}) => {
  return (
    <div className={clsx("SidePanel", { "is-open": isOpen }, className)}>
      {onBack && (
        <Button onClick={onBack} className="back-button">
          Back
        </Button>
      )}
      <Button onClick={onClose} className="close-button">
        X
      </Button>
      {children}
    </div>
  );
};

export default SidePanel;
