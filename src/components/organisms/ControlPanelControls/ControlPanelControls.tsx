import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { GlobalEventDispatchContext } from "../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import ButtonList from "../ButtonList/ButtonList";

type Props = BaseComponentProps & {};

const ControlPanelControls: FunctionComponent<Props> = ({ className }) => {
  const globalEventDispatch = useContext(GlobalEventDispatchContext);
  return (
    <ButtonList
      className={clsx(className)}
      buttonProps={[
        {
          icon: "station",
          title: "Open Stations List",
          onClick: () => globalEventDispatch({ type: "open-stations-list" }),
        },
        {
          icon: "line",
          title: "Open Lines List",
          onClick: () => globalEventDispatch({ type: "open-lines-list" }),
        },
        {
          icon: "line-segment",
          title: "Plan a route",
          onClick: () =>
            globalEventDispatch({ type: "enter-route-planning-mode" }),
        },
      ]}
    />
  );
};

export default ControlPanelControls;
