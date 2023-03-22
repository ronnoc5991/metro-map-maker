import { FunctionComponent } from "react";
import clsx from "clsx";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import ButtonList from "../ButtonList/ButtonList";
import { useMapControlsContext } from "../MapControls/hooks/useMapControlsContext";
import Button from "../../molecules/Button/Button";
import Icon from "../../atoms/Icon/Icon";

type Props = BaseComponentProps & {};

const ControlPanelControls: FunctionComponent<Props> = ({ className }) => {
  const { dispatch } = useMapControlsContext();

  return (
    <ButtonList
      className={clsx(className)}
      buttons={[
        <Button
          title="Open Stations List"
          onClick={() => dispatch({ type: "open-stations-list", props: {} })}
        >
          <Icon name="station" />
        </Button>,
        <Button
          title="Open Lines List"
          onClick={() => dispatch({ type: "open-lines-list", props: {} })}
        >
          <Icon name="line" />
        </Button>,
        <Button
          title="Open Route Planner"
          onClick={() => dispatch({ type: "open-route-planner", props: {} })}
        >
          <Icon name="directions" />
        </Button>,
      ]}
    />
  );
};

export default ControlPanelControls;
