import { FunctionComponent, useContext } from "react";
import StationSelector from "../../../../molecules/StationSelector/StationSelector";
import { SelectedStationsContext } from "../../../../providers/SelectedStationsProvider/SelectedStationsProvider";
import { WorldMapContext } from "../../../../providers/WorldMapProvider/WorldMapProvider";
import getRoute from "./utils/getRoute";

// TODO: could there be an abstraction here... a Planner component? this is similar to the segment creator

// if there are no stations/ there is only one station
// if there are no lines
// if there are no line segments
// if there are no possible paths between the two stations selected

const RoutePlanner: FunctionComponent = () => {
  const { selectedStationIds } = useContext(SelectedStationsContext);
  const { stations, lineSegments } = useContext(WorldMapContext);

  // should the inability to select the same station twice be built into the station selecting context?
  // if we select the same station twice, show that we cannot calculate the route between the two points?

  const canPlanRoute =
    selectedStationIds.every((value) => value !== null) &&
    selectedStationIds[0] !== selectedStationIds[1];

  // const route = canPlanRoute
  //   ? getRoute(
  //       stations[selectedStationIds[0] as number], // TODO: fix this typing
  //       stations[selectedStationIds[1] as number],
  //       stations,
  //       lineSegments
  //     )
  //   : undefined;

  // after calculating a route, we should change the mouse mode to exploration?

  // have a button that clears the ids? this should live in the station selector?
  return (
    <>
      <StationSelector />
      {/* {route && (
        <ol>
          {route.map((step) => {
            return (
              <li key={`${step.stationId}-${step.departingLineId}`}>
                {stations[step.stationId].name}
              </li>
            );
          })}
        </ol>
      )} */}
    </>
  );
};

export default RoutePlanner;
