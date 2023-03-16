import { MouseEventHandler, useRef } from "react";
import { CustomDragEventHandler } from "../../../../../../../types/CustomDragEventHandler";
import { Position } from "../../../../../../../types/Position";

const DRAGGING_THRESHOLD = 5;

const useMouse = (
  onMouseDown: MouseEventHandler,
  onDrag: CustomDragEventHandler,
  onMouseUp: MouseEventHandler
): {
  onDown: MouseEventHandler;
  onMove: MouseEventHandler;
  onUp: MouseEventHandler;
} => {
  const isDown = useRef(false);
  const isDragging = useRef(false);
  const previousPosition = useRef<Position>({ x: 0, y: 0 });

  const onDown: MouseEventHandler = (event) => {
    isDown.current = true;
    previousPosition.current = { x: event.clientX, y: event.clientY };
    onMouseDown(event);
  };

  const onMove: MouseEventHandler = ({ clientX, clientY }) => {
    if (!isDown.current) return;

    if (isDragging.current) {
      const deltaX = clientX - previousPosition.current.x;
      const deltaY = clientY - previousPosition.current.y;
      previousPosition.current = { x: clientX, y: clientY };
      onDrag(deltaX, deltaY);
      return;
    }

    if (
      hasStartedDragging(previousPosition.current, { x: clientX, y: clientY })
    ) {
      previousPosition.current = { x: clientX, y: clientY };
      isDragging.current = true;
    }
  };

  const onUp: MouseEventHandler = (event) => {
    isDown.current = false;
    isDragging.current = false;
    onMouseUp(event);
  };

  return { onDown, onMove, onUp };
};

function hasStartedDragging(
  previousPosition: Position,
  currentPosition: Position
): boolean {
  return (
    Math.abs(currentPosition.x - previousPosition.x) > DRAGGING_THRESHOLD ||
    Math.abs(currentPosition.y - previousPosition.y) > DRAGGING_THRESHOLD
  );
}

export default useMouse;
