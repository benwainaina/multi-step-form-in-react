import React from "react";

export interface IDynamicFields {
  [key: string]: any;
}

export interface IMultiStep {
  /**
   * dynamic keys, so that they will be unique in all cases
   */
  [view: string]: JSX.Element;
}

export interface IMultiStepParam {
  selectInitialFields: Function;
  onViewFieldChange: Function;
}
