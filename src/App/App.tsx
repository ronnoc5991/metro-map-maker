import { FunctionComponent, useRef, useState } from "react";
import { CustomDragEventHandler } from "../types/CustomDragEventHandler";
import { CustomClickHandler } from "../types/CustomClickHandler";
import { SidePanelContent } from "./types";
import { DispatchContext, DispatchPayload } from "../contexts/dispatchContext";
import { MapContext } from "../contexts/mapContext";
import {
  LineSegmentCreationContext,
  SelectedStationIds,
  SelectingIndex,
} from "../contexts/lineSegmentCreationContext";
import getClickedStation from "../utils/getClickedStation";
import useDimensions from "../hooks/useDimensions";
import useMetroMap from "../hooks/useMetroMap";
import useStack from "../hooks/useStack";
import LineSegmentCreator from "../components/LineSegmentCreator/LineSegmentCreator";
import LineSegmentDetails from "../components/LineSegmentDetails/LineSegmentDetails";
import StationDetails from "../components/StationDetails/StationDetails";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import StationsList from "../components/StationsList/StationsList";
import LineDetails from "../components/LineDetails/LineDetails";
import LinesList from "../components/LinesList/LinesList";
import SidePanel from "../components/SidePanel/SidePanel";
import Window from "../components/Window/Window";
import Button from "../components/Button/Button";
import "./App.scss";

// multiple reducers
// map reducer?
// stack reducer?
// clickSignificance reducer?

type ClickSignificance =
  | "exploration"
  | "station-creation"
  | "line-segment-creation";

// could store a draggingItem? for the segment control points?

// TODO: Create a reducer that handles updating the app state?
// create the dispatch function that we pass down to each of the side panel content components

// TODO: Clean up
// - find a place for the map to be manipulated (could create a reducer, pass in a callback that receives the ids of things we need, return new state?)
// - pass map down via a context
// - who/where handles click significance?
// - who/where is the sidepanel stack handled?
// - events are dispatched from the sidepanel content
// - those events impact the map, the sidepanel, and the click significance

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { dimensions: viewportDimensions } = useDimensions(container);

  const {
    stations,
    lines,
    lineSegments,
    deleteLineSegment,
    addLine,
    addLineSegment,
    addStation,
    deleteLine,
    deleteStation,
    updateLineName,
    updateStationName,
  } = useMetroMap();

  const {
    size,
    topFrame,
    push: pushOnSidePanel,
    pop: popOffSidePanel,
    clear: clearSidePanel,
  } = useStack<SidePanelContent>();

  const [clickSignificance, setClickSignificance] =
    useState<ClickSignificance>("exploration");

  // TODO: create a component that provides all of the contexts
  // and holds all of the states?
  // provide it here?

  // MapProvider Component
  // takes the map state (lines, stations, lineSegments)
  // create a reducer that takes the current map and updates it according to the action taken
  // we could provide both the map and the reducer from the same place

  const [lineSegmentStationIds, setLineSegmentStationIds] =
    useState<SelectedStationIds>([null, null]);

  const [lineSegmentStationIdIndexToSet, setLineSegmentStationIdIndexToSet] =
    useState<SelectingIndex>(0);

  const dispatch = (payload: DispatchPayload) => {
    switch (payload.type) {
      case "open-stations-list": {
        clearSidePanel();
        pushOnSidePanel({ component: StationsList, props: {} });
        break;
      }
      case "enter-station-creation-mode": {
        setClickSignificance("station-creation");
        break;
      }
      case "create-new-station": {
        const stationId = addStation(payload.position);
        setClickSignificance("exploration");
        dispatch({ type: "select-station", id: stationId });
        break;
      }
      case "select-station": {
        pushOnSidePanel({
          component: StationDetails,
          props: { id: payload.id },
        });
        break;
      }
      case "update-station-name": {
        updateStationName(payload.id, payload.newName);
        break;
      }
      case "delete-station": {
        deleteStation(payload.id);
        // NOTE: can only be dispatched from station detail
        popOffSidePanel();
        break;
      }
      case "open-lines-list": {
        clearSidePanel();
        pushOnSidePanel({ component: LinesList, props: {} });
        break;
      }
      case "create-line": {
        const lineId = addLine();
        dispatch({ type: "select-line", id: lineId });
        break;
      }
      case "select-line": {
        pushOnSidePanel({ component: LineDetails, props: { id: payload.id } });
        break;
      }
      case "update-line-name": {
        updateLineName(payload.id, payload.newName);
        break;
      }
      case "delete-line": {
        deleteLine(payload.id);
        // NOTE: can only be dispatched from line detail
        popOffSidePanel();
        break;
      }
      case "enter-line-segment-creation-mode": {
        setClickSignificance("line-segment-creation");
        pushOnSidePanel({
          component: LineSegmentCreator,
          props: { parentLineId: payload.parentLineId },
        });
        break;
      }
      case "create-line-segment": {
        const lineSegmentId = addLineSegment(
          payload.stationIds,
          payload.parentLineId
        );
        popOffSidePanel(); // pop off the creator
        // TODO: this should clear the lineSegment station ids that we are holding onto
        if (lineSegmentId) {
          dispatch({ type: "select-line-segment", id: lineSegmentId });
        }
        break;
      }
      case "select-line-segment": {
        pushOnSidePanel({
          component: LineSegmentDetails,
          props: { id: payload.id },
        });
        break;
      }
      case "delete-line-segment": {
        deleteLineSegment(payload.id);
        // NOTE: can only be dispatched from line segment detail
        popOffSidePanel();
        break;
      }
    }
  };

  const onMouseDown: CustomClickHandler = () => {
    if (clickSignificance === "exploration") return;
    // when we are in segment editing mode, a mouse down on a control point will tell us what we are dragging
  };

  const onDrag: CustomDragEventHandler = () => {
    // control point drag, update active control point position
  };

  const onMouseUp: CustomClickHandler = (position) => {
    const clickedStation = getClickedStation(position, stations);

    if (clickSignificance === "exploration") {
      if (!clickedStation) return;
      clearSidePanel(); // this should only be done here, as a result of canvas click
      dispatch({ type: "select-station", id: clickedStation.id });
    } else if (clickSignificance === "station-creation") {
      if (clickedStation) return;
      dispatch({ type: "create-new-station", position });
    } else if (clickSignificance === "line-segment-creation") {
      if (!clickedStation) return;
      setLineSegmentStationIds((prevLineSegmentStationIds) => {
        prevLineSegmentStationIds[lineSegmentStationIdIndexToSet] =
          clickedStation.id;
        return prevLineSegmentStationIds;
      });
      setLineSegmentStationIdIndexToSet(
        lineSegmentStationIdIndexToSet === 0 ? 1 : 0
      );
    }

    // deselect the edge control point we were dragging?
  };

  // window should ALMOST always be draggable, unless we are dragging an edge control point for example
  const isWindowDraggable = true;

  const getSidePanelContent = (frame: SidePanelContent) => {
    const Component = frame.component as FunctionComponent;
    const props = frame.props as typeof Component.propTypes; // TODO: figure out this typing ;/

    return <Component {...props} />;
  };

  return (
    <div className="App" ref={container}>
      <MapContext.Provider value={{ stations, lines, lineSegments }}>
        <LineSegmentCreationContext.Provider
          value={{
            selectedStationIds: lineSegmentStationIds,
            selectingIndex: lineSegmentStationIdIndexToSet,
            setSelectingIndex: setLineSegmentStationIdIndexToSet,
          }}
        >
          <DispatchContext.Provider value={dispatch}>
            <Window
              className="window"
              stations={stations}
              isDraggable={isWindowDraggable}
              viewportDimensions={viewportDimensions}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onDrag={onDrag}
            />
            <SidePanel
              className="side-panel"
              isOpen={!!topFrame}
              onBack={size > 1 ? popOffSidePanel : undefined}
              onClose={() => {
                clearSidePanel();
                setClickSignificance("exploration");
              }}
            >
              {topFrame && getSidePanelContent(topFrame)}
            </SidePanel>
            <ControlPanel className="edit-mode-panel">
              <Button onClick={() => dispatch({ type: "open-stations-list" })}>
                SE
              </Button>
              <Button onClick={() => dispatch({ type: "open-lines-list" })}>
                LE
              </Button>
            </ControlPanel>
          </DispatchContext.Provider>
        </LineSegmentCreationContext.Provider>
      </MapContext.Provider>
    </div>
  );
};

export default App;
