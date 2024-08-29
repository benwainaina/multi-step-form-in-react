import { InputFieldComponent } from "@/app/shared/components/input-field/InputField.component";
import { IMultiStepParam } from "@/app/shared/interfaces";
import { useBaseStep } from "@/app/shared/useBaseStep";
import { useEffect } from "react";

export const ContactComponent = ({
  selectInitialFields,
  onViewFieldChange,
  onStepValidityChange,
}: IMultiStepParam) => {
  /**
   * constants
   */
  const viewName = "contact";

  /**
   * hooks
   */
  const { patchForm, updateFormField, registerFormFields, stepIsValid, form } =
    useBaseStep({
      formFields: {
        email: "",
        linkedIn: "",
        twitter: "",
        youtube: "",
      },
      requiredFormFields: { email: "" },
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
    <form className="flex flex-col gap-y-12">
      <InputFieldComponent
        type="email"
        placeholder="Email address"
        initialValue={form.email}
        onChange={(value: string) => {
          updateFormField("email", value);
          onViewFieldChange(viewName, "email", value);
        }}
      />
      <InputFieldComponent
        type="text"
        placeholder="Linked In"
        initialValue={form.linkedIn}
        onChange={(value: string) => {
          updateFormField("linkedIn", value);
          onViewFieldChange(viewName, "linkedIn", value);
        }}
      />
      <InputFieldComponent
        type="text"
        placeholder="Twitter"
        initialValue={form.twitter}
        onChange={(value: string) => {
          updateFormField("twitter", value);
          onViewFieldChange(viewName, "twitter", value);
        }}
      />
      <InputFieldComponent
        type="text"
        placeholder="YoutTube"
        initialValue={form.youtube}
        onChange={(value: string) => {
          updateFormField("youtube", value);
          onViewFieldChange(viewName, "youtube", value);
        }}
      />
    </form>
  );
};
