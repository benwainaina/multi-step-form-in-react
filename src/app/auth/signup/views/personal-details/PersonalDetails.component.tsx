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
  const { patchForm, updateFormField, registerFormFields, stepIsValid, form } =
    useBaseStep();

  /**
   * effects
   */

  useEffect(() => {
    /**
     * when the component intializes, initialize the form
     */

    registerFormFields(
      {
        firstname: "",
        lastname: "",
      },
      { firstname: "", lastname: "" }
    );
    patchForm(selectInitialFields(viewName));
  }, [registerFormFields, patchForm, selectInitialFields]);

  useEffect(() => {
    /**
     * when the step validity changes
     */
    if (stepIsValid !== undefined) {
      onStepValidityChange(stepIsValid);
    }
  }, [stepIsValid, onStepValidityChange]);

  return (
    <form className="flex flex-col gap-y-12">
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
