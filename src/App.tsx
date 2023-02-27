import { FunctionComponent, useRef, useState } from "react";
import { CustomClickHandler } from "./types/CustomClickHandler";
import { CustomDragEventHandler } from "./types/CustomDragEventHandler";
import getClickedStation from "./utils/getClickedStation";
import useDimensions from "./hooks/useDimensions";
import useMetroMap from "./hooks/useMetroMap";
import Window from "./components/Window/Window";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Button from "./components/Button/Button";
import SidePanel from "./components/SidePanel/SidePanel";
import StationEditor from "./components/StationEditor/StationEditor";
import "./App.scss";

type EditMode = "exploration" | "station-creation";

const App: FunctionComponent = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { dimensions: viewportDimensions } = useDimensions(container);
  const [editMode, setEditMode] = useState<EditMode>("exploration");
  const { stations, addStation, updateStationName, deleteStation } =
    useMetroMap();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<number | null>(
    null
  );

  // keep state for the selected 'thing'
  // thing has a type and an id
  // type can be station or edge?
  // display that thing in the side panel?

  const onMouseDown: CustomClickHandler = () => {
    if (editMode === "exploration") return;
    // when we are in edge editing mode, a mouse down on a control point will tell us what we are dragging
  };

  const onDrag: CustomDragEventHandler = () => {
    // control point drag, update active control point position
  };

  const onMouseUp: CustomClickHandler = (position) => {
    if (editMode === "station-creation") {
      addStation(position);
      setEditMode("exploration");
    } else if (editMode === "exploration") {
      const clickedStation = getClickedStation(position, stations);
      if (!clickedStation) return;
      setSelectedStationId(clickedStation.id);
      setIsSidePanelOpen(true);
    }

    // deselect the edge control point we were dragging?
  };

  // window should ALMOST always be draggable, unless we are dragging an edge control point for example
  const isWindowDraggable = true;

  const selectedStation = stations.find(
    (station) => station.id === selectedStationId
  );

  return (
    <div className="App" ref={container}>
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
        isOpen={isSidePanelOpen}
        onClose={() => {
          // should clear out the selectedItem
          // and close the side panel
          setIsSidePanelOpen(false);
          setSelectedStationId(null);
        }}
      >
        {selectedStationId && selectedStation && (
          <StationEditor
            station={selectedStation}
            onDelete={() => {
              setSelectedStationId(null);
              deleteStation(selectedStationId);
              setIsSidePanelOpen(false);
            }}
            onNameChange={(newName) =>
              updateStationName(selectedStationId, newName)
            }
          />
        )}
      </SidePanel>
      <ControlPanel className="edit-mode-panel">
        <Button onClick={() => setEditMode("exploration")}>EX</Button>
        <Button onClick={() => setEditMode("station-creation")}>SC</Button>
      </ControlPanel>
    </div>
  );
};

export default App;
