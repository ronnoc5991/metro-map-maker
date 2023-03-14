import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import Button from "../../molecules/Button/Button";
import { GlobalEventDispatchContext } from "../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { ControlPanelFrame } from "./types";
import { ControlPanelStackContext } from "../../providers/ControlPanelStackProvider/contexts/ControlPanelStackContext";
import "./styles.scss";

type Props = BaseComponentProps & {};

const ControlPanel: FunctionComponent<Props> = ({ className }) => {
  const { size, topFrame } = useContext(ControlPanelStackContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const getContent = (frame: ControlPanelFrame) => {
    const Component = frame.component as FunctionComponent;
    const props = frame.props as typeof Component.propTypes; // TODO: figure out this typing ;/

    return <Component {...props} />;
  };

  return (
    <div
      className={clsx("control-panel", { "is-open": !!topFrame }, className)}
    >
      {size > 1 && (
        <Button
          icon="back"
          title="Back"
          onClick={() => globalEventDispatch({ type: "pop-frame-off-stack" })}
          className="back-button"
        />
      )}
      <Button
        icon="close"
        title="Close"
        onClick={() => {
          globalEventDispatch({ type: "close-control-panel" });
        }}
        className="close-button"
      />
      {topFrame && getContent(topFrame)}
    </div>
  );
};

export default ControlPanel;
