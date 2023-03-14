import { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { GlobalEventDispatchContext } from "../../../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import { BaseComponentProps } from "../../../../../types/BaseComponentProps";
import Station from "../../../../../classes/Station";
import Line from "../../../../../classes/Line";
import { IconProps } from "../../../../atoms/Icon/Icon";
import Heading from "../../../../atoms/Heading/Heading";
import Button from "../../../../molecules/Button/Button";
import "./styles.scss";

type Item = { name: string; id: Station["id"] | Line["id"] };

type Props = BaseComponentProps & {
  title: string;
  items: Array<Item>;
  itemIconName: IconProps["name"];
  onItemSelect: (id: Item["id"]) => void;
  onNewItemClick: () => void;
};

const ItemList = ({
  title,
  items,
  itemIconName,
  onItemSelect,
  onNewItemClick,
  className,
}: Props) => {
  return (
    <div className={clsx("item-list", className)}>
      <Heading as="h1" className="title">
        {title}
      </Heading>
      <ul className="list">
        <li>
          <Button
            icon="plus"
            label="Create New Item"
            onClick={onNewItemClick}
          />
        </li>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <Button
                icon={itemIconName}
                onClick={() => onItemSelect(item.id)}
                label={item.name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export type StationsListProps = BaseComponentProps & {};

const StationsList: FunctionComponent = () => {
  const { stations } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  return (
    <ItemList
      title="Stations"
      items={stations}
      itemIconName="station"
      onItemSelect={(id: Station["id"]) =>
        globalEventDispatch({
          type: "open-station-details",
          id,
        })
      }
      onNewItemClick={() =>
        globalEventDispatch({ type: "enter-station-creation-mode" })
      }
    />
  );
};

export type LinesListProps = BaseComponentProps & {};

const LinesList: FunctionComponent<LinesListProps> = () => {
  const { lines } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  return (
    <ItemList
      title="Lines"
      items={lines}
      itemIconName="line"
      onItemSelect={(id) =>
        globalEventDispatch({
          type: "open-line-details",
          id,
        })
      }
      onNewItemClick={() => globalEventDispatch({ type: "create-line" })}
    />
  );
};

export { StationsList, LinesList };
