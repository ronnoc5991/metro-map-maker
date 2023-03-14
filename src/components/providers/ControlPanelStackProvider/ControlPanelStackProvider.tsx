import { FunctionComponent, PropsWithChildren } from "react";
import useStack from "../../../hooks/useStack";
import LineDetails from "../../organisms/ControlPanel/frames/LineDetails/LineDetails";
import LineSegmentCreator from "../../organisms/ControlPanel/frames/LineSegmentCreator/LineSegmentCreator";
import LineSegmentDetails from "../../organisms/ControlPanel/frames/LineSegmentDetails/LineSegmentDetails";
import { ControlPanelFrame } from "../../organisms/ControlPanel/types";
import StationDetails from "../../organisms/ControlPanel/frames/StationDetails/StationDetails";
import { ControlPanelStackContext } from "./contexts/ControlPanelStackContext";
import { ControlPanelStackDispatchContext } from "./contexts/ControlPanelStackDispatchContext";
import { ControlPanelStackDispatch } from "./types";
import {
  LinesList,
  StationsList,
} from "../../organisms/ControlPanel/frames/ItemList/ItemList";

const ControlPanelStackProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { topFrame, size, push, pop, clear } = useStack<ControlPanelFrame>();

  const dispatch: ControlPanelStackDispatch = (action) => {
    switch (action.type) {
      case "open-stations-list": {
        clear();
        push({ component: StationsList, props: {} });
        break;
      }
      case "open-lines-list": {
        clear();
        push({ component: LinesList, props: {} });
        break;
      }
      case "open-station-details": {
        push({ component: StationDetails, props: { id: action.id } });
        break;
      }
      case "open-line-details": {
        push({
          component: LineDetails,
          props: { id: action.id },
        });
        break;
      }
      case "open-line-segment-details": {
        push({
          component: LineSegmentDetails,
          props: { id: action.id },
        });
        break;
      }
      case "open-line-segment-creator": {
        push({
          component: LineSegmentCreator,
          props: { parentLineId: action.id },
        });
        break;
      }
      case "pop-frame-off-stack": {
        pop();
        break;
      }
      case "clear": {
        clear();
        break;
      }
    }
  };

  return (
    <ControlPanelStackContext.Provider value={{ topFrame, size }}>
      <ControlPanelStackDispatchContext.Provider value={dispatch}>
        {children}
      </ControlPanelStackDispatchContext.Provider>
    </ControlPanelStackContext.Provider>
  );
};

export default ControlPanelStackProvider;
