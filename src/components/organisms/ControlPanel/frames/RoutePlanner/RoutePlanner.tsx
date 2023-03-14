import { FunctionComponent, useContext } from "react";
import StationSelector from "../../../../molecules/StationSelector/StationSelector";
import { SelectedStationsContext } from "../../../../providers/SelectedStationsProvider/SelectedStationsProvider";

// TODO: could there be an abstraction here... a Planner component?

const RoutePlanner: FunctionComponent = () => {
  const { selectedStationIds } = useContext(SelectedStationsContext);

  // display the route in the same frame
  // or just keep that state in the route planner component? THIS

  const canPlanRoute = selectedStationIds.every((value) => value !== null);

  return (
    <>
      <StationSelector />
    </>
  );
};

export default RoutePlanner;
