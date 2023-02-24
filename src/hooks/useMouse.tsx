import { MouseEventHandler, useCallback, useRef } from "react";
import { Position } from "../types/Position";

const DRAGGING_THRESHOLD = 5;

const useMouse = (
  onDrag: (deltaX: number, deltaY: number) => void
): {
  onDown: MouseEventHandler;
  onUp: MouseEventHandler;
  onMove: MouseEventHandler;
} => {
  const isDown = useRef(false);
  const isDragging = useRef(false);
  const previousPosition = useRef<Position>({ x: 0, y: 0 });

  const onDown: MouseEventHandler = useCallback((event) => {
    isDown.current = true;
    previousPosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onMove: MouseEventHandler = useCallback(
    ({ clientX, clientY }) => {
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
    },
    [onDrag]
  );

  const onUp: MouseEventHandler = useCallback(() => {
    isDown.current = false;
    isDragging.current = false;
  }, []);

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
