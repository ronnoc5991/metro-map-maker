import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import ButtonList from "../ButtonList/ButtonList";
import { useMapControlsContext } from "../MapControls/hooks/useMapControlsContext";

type Props = BaseComponentProps & {};

const ControlPanelControls: FunctionComponent<Props> = ({ className }) => {
  const { dispatch } = useMapControlsContext();

  return (
    <ButtonList
      className={clsx(className)}
      buttonProps={[
        {
          icon: "station",
          title: "Open Stations List",
          onClick: () => dispatch({ type: "open-stations-list", props: {} }),
        },
        {
          icon: "line",
          title: "Open Lines List",
          onClick: () => dispatch({ type: "open-lines-list", props: {} }),
        },
        {
          icon: "directions",
          title: "Open Route Planner",
          onClick: () => dispatch({ type: "open-route-planner", props: {} }),
        },
      ]}
    />
  );
};

export default ControlPanelControls;
