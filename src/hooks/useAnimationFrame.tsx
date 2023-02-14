import { useEffect, useRef } from "react";

export const useAnimationFrame = (callback: (time: number) => void) => {
  const requestRef = useRef<number>();

  const tick = (time: number) => {
    callback(time);
    requestRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (!requestRef.current) return;
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
};
