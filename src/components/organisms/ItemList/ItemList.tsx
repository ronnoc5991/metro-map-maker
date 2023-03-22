import Station from "../../../classes/Station";
import Line from "../../../classes/Line";
import { IconProps } from "../../atoms/Icon/Icon";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../molecules/Button/Button";
import { createFrameGetter } from "../ControlPanel/ControlPanel";
import { useMapControlsContext } from "../MapControls/hooks/useMapControlsContext";
import { FunctionComponent } from "react";
import IconWithLabel from "../../molecules/IconWithLabel/IconWithLabel";
import OptionsList from "../OptionsList/OptionsList";
import ControlPanelFrame from "../ControlPanelFrame/ControlPanelFrame";

type Item = { name: string; id: Station["id"] | Line["id"]; color?: string };

type Props = {
  title: string;
  items: Record<string, Item>;
  itemName: string;
  itemIconName: IconProps["name"];
  onItemSelect: (id: Item["id"]) => void;
  onNewItemClick: () => void;
};

const ItemList = ({
  title,
  items,
  itemName,
  itemIconName,
  onItemSelect,
  onNewItemClick,
}: Props) => {
  return (
    <ControlPanelFrame
      headerContent={<Heading as="h1">{title}</Heading>}
      bodyContent={
        <OptionsList
          iconName={itemIconName}
          onSelect={onItemSelect}
          options={Object.values(items)}
        />
      }
      footerContent={
        <Button onClick={onNewItemClick}>
          <IconWithLabel
            iconName={itemIconName}
            label={`Create a new ${itemName}`}
          />
        </Button>
      }
    />
  );
};

export type StationsListProps = {};

const StationsList: FunctionComponent<StationsListProps> = () => {
  const { map, dispatch } = useMapControlsContext();

  return (
    <ItemList
      title="Stations"
      items={map.stations}
      itemName="Station"
      itemIconName="station"
      onItemSelect={(id: Station["id"]) =>
        dispatch({ type: "open-station-details", props: { id } })
      }
      onNewItemClick={() => dispatch({ type: "enter-station-creation-mode" })}
    />
  );
};

export type LinesListProps = {};

const LinesList: FunctionComponent<LinesListProps> = () => {
  const { map, dispatch } = useMapControlsContext();

  return (
    <ItemList
      title="Lines"
      items={map.lines}
      itemName="Line"
      itemIconName="line"
      onItemSelect={(id) =>
        dispatch({
          type: "open-line-details",
          props: { id },
        })
      }
      onNewItemClick={() => dispatch({ type: "create-line" })}
    />
  );
};

export const createStationsListGetter = (props: StationsListProps) =>
  createFrameGetter<StationsListProps>(StationsList, props);

export const createLinesListGetter = (props: LinesListProps) =>
  createFrameGetter<LinesListProps>(LinesList, props);

export { StationsList, LinesList };
