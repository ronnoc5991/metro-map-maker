import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import Button from "../../molecules/Button/Button";
import {
  ControlPanelStack,
  ControlPanelStackDispatch,
} from "./hooks/useControlPanelStack";
import "./styles.scss";
import { FrameGetter } from "./types";
import Icon from "../../atoms/Icon/Icon";

type Props = BaseComponentProps & {
  stack: ControlPanelStack;
  stackDispatch: ControlPanelStackDispatch;
};

const ControlPanel: FunctionComponent<Props> = ({
  stack,
  stackDispatch,
  className,
}) => {
  const { size, topFrame } = stack;

  return (
    <div
      className={clsx("control-panel", { "is-open": !!topFrame }, className)}
    >
      {size > 1 && (
        <Button
          title="Back"
          onClick={() => stackDispatch({ type: "pop" })}
          className="back-button"
        >
          <Icon name="back" />
        </Button>
      )}
      <Button
        title="Close"
        onClick={() => stackDispatch({ type: "clear" })}
        className="close-button"
      >
        <Icon name="close" />
      </Button>
      {topFrame && topFrame()}
    </div>
  );
};

export function createFrameGetter<P = {}>(
  frame: FunctionComponent<P>,
  props: P
): FrameGetter {
  const Component = frame;

  // TODO: fix this key hack
  return () => <Component key="" {...props} />;
}

export default ControlPanel;
