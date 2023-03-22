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
          icon="back"
          title="Back"
          onClick={() => stackDispatch({ type: "pop" })}
          className="back-button"
        />
      )}
      <Button
        icon="close"
        title="Close"
        onClick={() => stackDispatch({ type: "clear" })}
        className="close-button"
      />
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
