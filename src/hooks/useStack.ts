import { useState } from "react";

type Stack<Frame> = {
  size: number;
  topFrame: Frame | undefined;
  push: (frame: Frame) => void;
  pop: () => void;
  clear: () => void;
};

const useStack = <Frame>(): Stack<Frame> => {
  const [stack, setStack] = useState<Array<Frame>>([]);

  const push = (frame: Frame) => {
    setStack((prevStack) => [...prevStack, frame]);
  };

  const pop = () => {
    setStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
  };

  const clear = () => {
    setStack([]);
  };

  const topFrame = stack.length > 0 ? stack[stack.length - 1] : undefined;

  return { size: stack.length, topFrame, push, pop, clear };
};

export default useStack;
