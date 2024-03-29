import { FunctionComponent, useEffect, useRef, useState } from "react";
import { tupleIndices } from "../../../App/reducers/selectedStationsReducer";
import Input from "../../atoms/Input/Input";
import { useMapControlsContext } from "../MapControls/hooks/useMapControlsContext";
import OptionsList from "../OptionsList/OptionsList";

// add a swap button that changes the from to the to and vice versa
// display it based on a prop (it does not make sense in the line segment creator, order of stations there does not matter)

// TODO: hide the search results if neither input is focussed?
// if we set the activeIndex to null... then we would not have to keep track of the

// once we choose two stations, we do not want clicks on other stations to select them

// once both stations are selected, maybe we should enter exploration mouse mode?

const StationSelector: FunctionComponent = () => {
  const { map, selectedStations, dispatch } = useMapControlsContext();
  const { stations } = map;
  const { selectedStationIds, activeIndex } = selectedStations;

  const startingStationInput = useRef<HTMLInputElement>(null);
  const destinationStationInput = useRef<HTMLInputElement>(null);

  const [displayedStationNames, setDisplayedStationNames] = useState<
    [string, string]
  >(["", ""]);

  const searchResults =
    selectedStationIds[activeIndex] === null
      ? Object.values(stations).filter((station) =>
          station.name
            .toLowerCase()
            .includes(displayedStationNames[activeIndex].toLowerCase())
        )
      : [];

  useEffect(() => {
    if (activeIndex === 0 && selectedStationIds[0] === null) {
      startingStationInput.current?.focus();
    } else if (activeIndex === 1 && selectedStationIds[1] === null) {
      destinationStationInput.current?.focus();
    }
  }, [activeIndex]);

  return (
    <>
      {tupleIndices.map((index) => {
        return (
          <Input
            key={index}
            ref={index === 0 ? startingStationInput : destinationStationInput}
            type="text"
            value={
              selectedStationIds[index] === null
                ? displayedStationNames[index]
                : stations[selectedStationIds[index] as number].name
            }
            onChange={(value) => {
              setDisplayedStationNames((prev) => {
                const newNames = [...prev];
                newNames[index] = value;
                return newNames as [string, string];
              });
              if (selectedStationIds[index] !== null)
                dispatch({ type: "deselect-station", index });
            }}
            onFocus={() => {
              dispatch({
                type: "set-active-index",
                index,
              });
            }}
          />
        );
      })}
      {searchResults.length > 0 && (
        <OptionsList
          title="Suggestions"
          iconName="station"
          options={searchResults}
          onSelect={(id) => {
            setDisplayedStationNames((prev) => {
              const newNames = [...prev];
              newNames[activeIndex] = stations[id].name;
              return newNames as [string, string];
            });
            dispatch({
              type: "select-station",
              id: stations[id].id,
            });
          }}
        />
      )}
    </>
  );
};

export default StationSelector;
