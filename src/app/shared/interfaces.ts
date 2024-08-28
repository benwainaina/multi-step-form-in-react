import React from "react";

export interface IDynamicFields {
  [key: string]: any;
}

export interface IMultiStep {
  /**
   * a ket to identify the step
   */
  key: string;

  /**
   * a label to be displayed on the UI
   */
  label: string;
}

export interface IMultiStepParam {
  selectInitialFields: Function;
  onViewFieldChange: Function;
}
