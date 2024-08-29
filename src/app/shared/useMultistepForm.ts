import { useCallback, useRef, useState } from "react";
import { IDynamicFields, IMultiStep } from "./interfaces";

export const useMultistepForm = () => {
  /**
   * states
   */
  const formViews = useRef<IDynamicFields>({}).current;
  const [currentFormStep, setCurrentFormStep] = useState<IMultiStep>();
  const [availableSteps, setAvailableSteps] = useState<Array<IMultiStep>>([]);
  const [currentStepIsValid, setCurrentStepIsValid] = useState<boolean>();

  /**
   * handlers
   */
  /**
   * returns the cummulative multistep form as well as the fields
   * which have been updated over time
   */
  const getForm = () => {
    let reducedForm: IDynamicFields = {};
    for (const view in formViews) {
      reducedForm = { ...reducedForm, ...formViews[view] };
    }
    return reducedForm;
  };

  /**
   * registers the available steps for the form
   */
  const registerAvailableSteps = (steps: Array<IMultiStep>) =>
    setAvailableSteps(steps);

  /**
   * sets the active step
   */
  const setActiveStepIndex = useCallback(
    (stepIndex: number) => setCurrentFormStep(availableSteps[stepIndex]),
    [availableSteps]
  );

  /**
   *
   * @param view
   *
   * pick initial field values for the provided view, for example when the
   * user returns to this view
   */
  const selectInitialFields = useCallback(
    (view: string) => formViews[view],
    [formViews]
  );

  /**
   *
   * @param view
   * @param field
   * @param value
   *
   * when the value of a view changes, we can then update the larger
   */
  const onViewFieldChange = (view: string, field: string, value: string) => {
    formViews[view] = {
      ...formViews[view],
      [field]: value,
    };
  };

  /**
   * set the validity of the current
   */
  const onCurrentStepIsValid = useCallback((validity: boolean) => {
    console.log("a", validity);
    setCurrentStepIsValid(validity);
  }, []);

  return {
    getForm,
    currentFormStep,
    registerAvailableSteps,
    setActiveStepIndex,
    selectInitialFields,
    availableSteps,
    onCurrentStepIsValid,
    currentStepIsValid,
    onViewFieldChange,
  };
};
