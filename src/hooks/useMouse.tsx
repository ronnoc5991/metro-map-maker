import { MouseEventHandler, useCallback, useState } from "react";
import { Position } from "../types/Position";

const DRAGGING_THRESHOLD = 5;

const useMouse = (
  onDrag: (deltaX: number, deltaY: number) => void
): {
  onDown: MouseEventHandler;
  onUp: MouseEventHandler;
  onMove: MouseEventHandler;
} => {
  const [isDown, setIsDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previousPosition, setPreviousPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const onDown: MouseEventHandler = useCallback((event) => {
    setIsDown(true);
    setPreviousPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const onMove: MouseEventHandler = useCallback(
    ({ clientX, clientY }) => {
      if (!isDown) return;

      if (isDragging) {
        const deltaX = clientX - previousPosition.x;
        const deltaY = clientY - previousPosition.y;
        setPreviousPosition({ x: clientX, y: clientY });
        onDrag(deltaX, deltaY);
        return;
      }

      if (hasStartedDragging(previousPosition, { x: clientX, y: clientY })) {
        setPreviousPosition({ x: clientX, y: clientY });
        setIsDragging(true);
      }
    },
    [isDown, isDragging, onDrag, previousPosition]
  );

  const onUp: MouseEventHandler = useCallback(() => {
    setIsDown(false);
    setIsDragging(false);
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
