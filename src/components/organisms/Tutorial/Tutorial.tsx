import { FunctionComponent, useState } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";

type TutorialProps = BaseComponentProps & {
  onClose: () => void;
};

// Need to write a quick welcome message followed by a few steps to explain the app

// welcome message:
// Welcome to Metro Map Maker! This tutorial will guide you through the main features of the app to help you get started quickly.

// Steps:

// TODO: Come up with an explanation for the app
// should consist of steps explaining things
// and a small nav to go back and forth between steps
// and a finish/close button that hides it
// a boolean in the App can control whether or not this is rendered
// have a button in the normal UI that shows the tutorial again
// could save in local storage whether or not the user has completed it previously
// it should be displayed as a modal... or overlay...
const Tutorial: FunctionComponent<TutorialProps> = ({ onClose }) => {
  const steps = [1, 2, 3, 4, 5];
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const hasNextStep = activeStepIndex < steps.length - 1;
  const hasPreviousStep = activeStepIndex > 0;

  const nextStep = () => {
    if (hasNextStep) setActiveStepIndex(activeStepIndex + 1);
  };

  const previousStep = () => {
    if (hasPreviousStep) setActiveStepIndex(activeStepIndex - 1);
  };

  return (
    <>
      {steps[activeStepIndex]}
      <nav>
        {hasPreviousStep && (
          <button type="button" onClick={previousStep}>
            Prev
          </button>
        )}
        {hasNextStep && (
          <button type="button" onClick={nextStep}>
            Next
          </button>
        )}
        {!hasNextStep && (
          <button type="button" onClick={onClose}>
            Finish
          </button>
        )}
      </nav>
    </>
  );
};

export default Tutorial;
