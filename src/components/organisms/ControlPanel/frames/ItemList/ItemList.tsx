import Station from "../../../../../classes/Station";
import Line from "../../../../../classes/Line";
import { IconProps } from "../../../../atoms/Icon/Icon";
import Heading from "../../../../atoms/Heading/Heading";
import Button from "../../../../molecules/Button/Button";
import styles from "./styles.module.scss";
import { createFrameGetter } from "../../ControlPanel";
import { useMapControlsContext } from "../../../MapControls/hooks/useMapControlsContext";
import { FunctionComponent } from "react";

type Item = { name: string; id: Station["id"] | Line["id"] };

type Props = {
  title: string;
  items: Record<string, Item>;
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
}: Props) => {
  return (
    <div className={styles["item-list"]}>
      <Heading as="h1" className="title">
        {title}
      </Heading>
      <ul className={styles.list}>
        <li>
          <Button
            icon="plus"
            label="Create New Item"
            onClick={onNewItemClick}
          />
        </li>
        {Object.values(items).map((item) => {
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

export type StationsListProps = {};

const StationsList: FunctionComponent<StationsListProps> = () => {
  const { map, dispatch } = useMapControlsContext();

  return (
    <ItemList
      title="Stations"
      items={map.stations}
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
