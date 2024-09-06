import { InputFieldComponent } from "@/app/shared/components/input-field/InputField.component";
import { IMultiStepParam } from "@/app/shared/interfaces";
import { useBaseStep } from "@/app/shared/useBaseStep";
import { useEffect } from "react";

export const ExperienceComponent = ({
  selectInitialFields,
  onViewFieldChange,
  onStepValidityChange,
}: IMultiStepParam) => {
  /**
   * constants
   */
  const viewName = "experience";

  /**
   * hooks
   */
  const { patchForm, updateFormField, stepIsValid, form } = useBaseStep({
    formFields: {
      python: "",
      django: "",
      angular: "",
      react: "",
      reactnative: "",
    },
    requiredFormFields: {
      python: "",
      django: "",
      angular: "",
      react: "",
      reactnative: "",
    },
    onViewFieldChange,
    viewName,
  });

  /**
   * effects
   */

  useEffect(() => {
    /**
     * when the component intializes, initialize the form
     */
    patchForm(selectInitialFields(viewName));
  }, [patchForm, selectInitialFields]);

  useEffect(() => {
    /**
     * when the step validity changes
     */
    if (stepIsValid !== undefined) {
      onStepValidityChange(stepIsValid);
    }
  }, [stepIsValid, onStepValidityChange]);

  return (
    <form className="flex flex-col gap-y-6">
      <InputFieldComponent
        type="number"
        placeholder="Angular"
        initialValue={form.angular}
        onChange={(value: string) => {
          updateFormField("angular", value);
          onViewFieldChange(viewName, "angular", value);
        }}
      />
      <InputFieldComponent
        type="number"
        placeholder="React"
        initialValue={form.react}
        onChange={(value: string) => {
          updateFormField("react", value);
          onViewFieldChange(viewName, "react", value);
        }}
      />
      <InputFieldComponent
        type="number"
        placeholder="React Native"
        initialValue={form.reactnative}
        onChange={(value: string) => {
          updateFormField("reactnative", value);
          onViewFieldChange(viewName, "reactnative", value);
        }}
      />
      <InputFieldComponent
        type="number"
        placeholder="Python"
        initialValue={form.python}
        onChange={(value: string) => {
          updateFormField("python", value);
          onViewFieldChange(viewName, "python", value);
        }}
      />
      <InputFieldComponent
        type="number"
        placeholder="Django"
        initialValue={form.django}
        onChange={(value: string) => {
          updateFormField("django", value);
          onViewFieldChange(viewName, "django", value);
        }}
      />
    </form>
  );
};
