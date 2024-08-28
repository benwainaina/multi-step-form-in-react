import { useState } from "react";
import { IDynamicFields, IMultiStep } from "./interfaces";

export const useMultistepForm = () => {
  /**
   * states
   */
  const [formViews, setFormViews] = useState<IDynamicFields>({});
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
    const reducedForm: IDynamicFields = {};
    for (const view in formViews) {
      reducedForm[view] = { ...reducedForm, ...reducedForm[view] };
    }
    return reducedForm;
  };

  /**
   * registers the available steps for the form
   */
  const registerAvailableSteps = (steps: Array<IMultiStep>) => {
    setAvailableSteps(steps);
  };

  /**
   * sets the active step
   */
  const setActiveStepIndex = (stepIndex: number) => {
    setCurrentFormStep(availableSteps[stepIndex]);
  };

  /**
   *
   * @param view
   * @param viewFields
   *
   * registers fields belonging to an individual view
   */
  const registerView = (view: string, viewFields: IDynamicFields) => {
    const updatedFormViews = {
      ...formViews,
      [view]: viewFields,
    };
    setFormViews(updatedFormViews);
  };

  /**
   *
   * @param view
   *
   * pick any intial
   */
  const selectInitialFields = (view: string) => formViews[view];

  /**
   * when the value of a view changes, we can then update the larger
   * form
   */
  const onViewFieldChange = (view: string, field: string, value: string) =>
    setFormViews({
      ...formViews,
      [view]: {
        ...formViews[view],
        [field]: value,
      },
    });

  const onCurrentStepIsValid = (validity: boolean) => {
    setCurrentStepIsValid(validity);
  };

  return {
    getForm,
    currentFormStep,
    registerView,
    registerAvailableSteps,
    setActiveStepIndex,
    selectInitialFields,
    availableSteps,
    onCurrentStepIsValid,
    currentStepIsValid,
    onViewFieldChange,
  };
};
