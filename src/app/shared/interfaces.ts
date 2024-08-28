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
  onStepValidityChange: Function;
}

// export interface IMultiStepFormField {
//   /**
//    * name of the field which will go into the multistep
//    */
//   fieldName: string;

//   /**
//    * plaveholder to be displayed
//    */
//   placeholder: string;

//   /**
//    * whether the field is required or not
//    */
//   required: boolean;
// }

export type TNavigateDirection = "next" | "previous";
