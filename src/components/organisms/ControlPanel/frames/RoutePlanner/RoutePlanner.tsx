import { FunctionComponent, useContext } from "react";
import StationSelector from "../../../../molecules/StationSelector/StationSelector";
import { SelectedStationsContext } from "../../../../providers/SelectedStationsProvider/SelectedStationsProvider";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import getRoute from "./utils/getRoute";

// TODO: could there be an abstraction here... a Planner component? this is similar to the segment creator

const RoutePlanner: FunctionComponent = () => {
  const { selectedStationIds } = useContext(SelectedStationsContext);
  const { stations, lineSegments } = useContext(WorldMapContext);

  // should the inability to select the same station twice be built into the station selecting context?

  const canPlanRoute =
    selectedStationIds.every((value) => value !== null) &&
    selectedStationIds[0] !== selectedStationIds[1];

  const route = canPlanRoute
    ? getRoute(
        stations[selectedStationIds[0] as number], // TODO: fix this typing
        stations[selectedStationIds[1] as number],
        stations,
        lineSegments
      )
    : undefined;

  // have a button that clears the ids? this should live in the station selector?
  return (
    <>
      <StationSelector />
      {route && (
        <ul>
          {route.map((step) => {
            return (
              <li key={`${step.stationId}-${step.departingLineId}`}>
                {stations[step.stationId].name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default RoutePlanner;
