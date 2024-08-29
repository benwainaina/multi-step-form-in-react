import { useCallback, useEffect, useState } from "react";
import { IDynamicFields } from "./interfaces";

export const useBaseStep = () => {
  /**
   * states
   */
  const [form, setForm] = useState<IDynamicFields>({});
  const [requiredFields, setRequiredFields] = useState<IDynamicFields>({});
  const [stepIsValid, setStepIsValid] = useState<boolean>();
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false);

  /**
   * effects
   */
  useEffect(() => {
    /**
     * check for the validity of a form only if it has been changes
     */
    if (formIsDirty) {
      let _stepIsValid = true;
      for (const field in form) {
        if (field in requiredFields) {
          if (!form[field]) {
            _stepIsValid = false;
            break;
          } else {
            _stepIsValid = true;
          }
        }
      }
      setStepIsValid(_stepIsValid);
    }
  }, [form, requiredFields, formIsDirty]);

  /**
   * handlers
   */
  const patchForm = useCallback((existingValues: IDynamicFields) => {
    if (existingValues) {
      setForm(existingValues);
      setStepIsValid(true);
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
    setFormIsDirty(true);
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
      setStepIsValid(false);
    },
    []
  );

  return {
    patchForm,
    updateFormField,
    registerFormFields,
    stepIsValid,
    form,
  };
};
