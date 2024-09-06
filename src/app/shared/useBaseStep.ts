import { useCallback, useEffect, useState } from "react";
import { IDynamicFields } from "./interfaces";

export const useBaseStep = ({
  formFields,
  requiredFormFields,
  defaults,
  onViewFieldChange,
  viewName,
}: {
  formFields: IDynamicFields;
  requiredFormFields: IDynamicFields;
  defaults?: IDynamicFields;
  onViewFieldChange: Function;
  viewName: string;
}) => {
  /**
   * states
   */
  const [form, setForm] = useState<IDynamicFields>(formFields);
  const [requiredFields, setRequiredFields] =
    useState<IDynamicFields>(requiredFormFields);
  const [stepIsValid, setStepIsValid] = useState<boolean>(false);
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false);

  useEffect(() => {
    /**
     * check for the validity of a form only if it has been changed
     */
    if (formIsDirty) {
      let _stepIsValid = true;
      for (const field in form) {
        if (field in requiredFields) {
          if (!form[field]) {
            _stepIsValid = false;
            break;
          }
        }
      }
      setStepIsValid(_stepIsValid);
    }
  }, [form, requiredFields, formIsDirty]);

  useEffect(() => {
    if (defaults) {
      for (const field in defaults) {
        onViewFieldChange(viewName, field, defaults[field]);
      }
    }
  }, [defaults, onViewFieldChange, viewName]);

  /**
   * handlers
   */

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

  /**
   * patch a form with any initial values already present in the
   * multistep object
   */
  const patchForm = useCallback((existingValues: IDynamicFields) => {
    if (existingValues) {
      setForm(existingValues);
      setStepIsValid(true);
      setFormIsDirty(true);
    }
  }, []);

  /**
   *
   * @param field
   * @param value
   *
   * updates a single required field
   */
  const updateFormField = useCallback(
    (field: string, value: any) => {
      setForm({
        ...form,
        [field]: value,
      });
      setFormIsDirty(true);
    },
    [form]
  );

  const getFormFieldValue = useCallback((field: string) => form[field], [form]);

  return {
    patchForm,
    updateFormField,
    registerFormFields,
    stepIsValid,
    form,
    getFormFieldValue,
  };
};
