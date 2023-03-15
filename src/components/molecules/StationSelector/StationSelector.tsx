import clsx from "clsx";
import { FunctionComponent, useContext } from "react";
import Station from "../../../classes/Station";
import { GlobalEventDispatchContext } from "../../providers/GlobalEventDispatchProvider/GlobalEventDispatchProvider";
import { SelectedStationsContext } from "../../providers/SelectedStationsProvider/SelectedStationsProvider";
import { stationIdTupleIndices } from "../../providers/SelectedStationsProvider/types";
import { WorldMapContext } from "../../providers/WorldMapProvider/WorldMapProvider";
import Button from "../Button/Button";

const StationSelector: FunctionComponent = () => {
  const { activeIndex, selectedStationIds } = useContext(
    SelectedStationsContext
  );
  const { stations } = useContext(WorldMapContext);
  const globalEventDispatch = useContext(GlobalEventDispatchContext);

  const findStation = (stationId: Station["id"] | null) =>
    stationId === null ? undefined : stations[stationId];

  return (
    <>
      {stationIdTupleIndices.map((index) => {
        const station = findStation(selectedStationIds[index]);

        let value: string;

        if (!station) {
          value = "Please select a station";
        } else {
          value = station.name;
        }

        return (
          <Button
            label={value}
            key={index}
            onClick={() =>
              globalEventDispatch({
                type: "set-selected-stations-active-index",
                index,
              })
            }
            className={clsx({ "is-active": activeIndex === index })}
          ></Button>
        );
      })}
    </>
  );
};

export default StationSelector;
