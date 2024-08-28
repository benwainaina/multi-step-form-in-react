import { useCallback, useEffect, useState } from "react";
import { IDynamicFields } from "./interfaces";

export const useBaseStep = () => {
  /**
   * states
   */
  const [form, setForm] = useState<IDynamicFields>({});
  const [requiredFields, setRequiredFields] = useState<IDynamicFields>({});
  const [stepIsValid, setStepIsValid] = useState<boolean>();
  const [stepName, setStepName] = useState<string>("");

  /**
   * effects
   */
  useEffect(() => {
    /**
     * check for the validity of a form
     */

    for (const field in form) {
      if (field in requiredFields) {
        if (!form[field]) {
          setStepIsValid(false);
          break;
        } else {
          setStepIsValid(true);
        }
      }
    }
  }, [form, requiredFields]);

  /**
   * handlers
   */
  const patchForm = useCallback((existingValues: IDynamicFields) => {
    if (existingValues) {
      setForm(existingValues);
    }
  }, []);

  /**
   *
   * @param field
   * @param value
   *
   * updates a single required field
   */
  const updateFormField = (field: string, value: any) => {
    setForm({
      ...form,
      [field]: value,
    });
    onViewFieldChange(stepName, field, value);
  };

  /**
   *
   * @param fields
   * @param requiredFields
   *
   * registers the form's fields as well as the required fields
   */
  const registerFormFields = useCallback(
    (fields: IDynamicFields, requiredFields: IDynamicFields) => {
      setForm(fields);
      setRequiredFields(requiredFields);
    },
    []
  );

  const onViewFieldChange = (
    viewName: string,
    fieldName: string,
    value: string
  ) => ({ viewName, fieldName, value });

  /**
   * sets the view, but in a cached callback, because we do not want to
   * trigger multiple re-renders
   */
  const setViewName = useCallback(
    (viewName: string) => setStepName(viewName),
    []
  );

  return {
    setViewName,
    patchForm,
    updateFormField,
    registerFormFields,
    stepIsValid,
    onViewFieldChange,
  };
};
