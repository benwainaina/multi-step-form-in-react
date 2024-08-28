import { useState } from "react";
import { IDynamicFields } from "./interfaces";

export const useMultistepForm = () => {
  /**
   * states
   */
  const [formViews, setFormViews] = useState<IDynamicFields>({});
  const [currentFormStep, setCurrentFormStep] = useState<string>();
  const [availableSteps, setAvailableSteps] = useState<Array<string>>([]);

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
  const registerAvailableSteps = (steps: Array<string>) => {
    setAvailableSteps(steps);
  };

  /**
   * sets the active step
   */
  const setActiveStep = (step: string) => {
    setCurrentFormStep(step);
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

  const selectInitialFields = (view: string) => formViews[view];

  return {
    getForm,
    currentFormStep,
    registerView,
    registerAvailableSteps,
    setActiveStep,
    selectInitialFields,
  };
};
