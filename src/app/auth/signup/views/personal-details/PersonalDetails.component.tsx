import { InputFieldComponent } from "@/app/shared/components/input-field/InputField.component";
import { IMultiStepParam } from "@/app/shared/interfaces";
import { useBaseStep } from "@/app/shared/useBaseStep";
import { useEffect } from "react";

export const PersonalDetailsComponent = ({
  selectInitialFields,
  onViewFieldChange,
  onStepValidityChange,
}: IMultiStepParam) => {
  /**
   * constants
   */
  const viewName = "personal";

  /**
   * hooks
   */
  const { patchForm, updateFormField, stepIsValid, form } = useBaseStep({
    formFields: {
      firstname: "",
      lastname: "",
    },
    requiredFormFields: { firstname: "", lastname: "" },
    onViewFieldChange,
    viewName,
  });

  /**
   * effects
   */

  useEffect(() => {
    /**
     * when the component intializes, optionally patch the form
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
        type="text"
        placeholder="Full name"
        initialValue={form.firstname}
        onChange={(value: string) => {
          updateFormField("firstname", value);
          onViewFieldChange(viewName, "firstname", value);
        }}
      />
      <InputFieldComponent
        type="text"
        placeholder="Last name"
        initialValue={form.lastname}
        onChange={(value: string) => {
          updateFormField("lastname", value);
          onViewFieldChange(viewName, "lastname", value);
        }}
      />
    </form>
  );
};
