import { useCallback, useEffect, useRef } from "react";

const useAnimationFrame = (callback: (time: number) => void) => {
  const requestRef = useRef<number>();

  const tick = useCallback(
    (time: number) => {
      callback(time);
      requestRef.current = requestAnimationFrame(tick);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (!requestRef.current) return;
      cancelAnimationFrame(requestRef.current);
    };
  }, [tick]);
};

export default useAnimationFrame;
