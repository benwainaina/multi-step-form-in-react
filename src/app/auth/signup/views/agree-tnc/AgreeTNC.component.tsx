import { InputFieldComponent } from "@/app/shared/components/input-field/InputField.component";
import { IMultiStepParam } from "@/app/shared/interfaces";
import { useBaseStep } from "@/app/shared/useBaseStep";
import { useEffect } from "react";

export const AgreeTNCComponent = ({
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
  const {
    patchForm,
    updateFormField,
    registerFormFields,
    stepIsValid,
    form,
    getFormFieldValue,
  } = useBaseStep({
    formFields: {
      agreetnc: "",
    },
    requiredFormFields: { agreetnc: "" },
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
    <div
      className="flex md:items-center gap-x-6 cursor-pointer font-poppins font-bold"
      onClick={() => {
        const currentValue = getFormFieldValue("agreetnc") ? "" : "true";
        console.log("currentValue", currentValue);
        updateFormField("agreetnc", currentValue);
        onViewFieldChange(viewName, "agreetnc", currentValue);
      }}
    >
      <div className="min-w-[24px] h-[24px] outline outline-1 rounded-full bg-white grid">
        {getFormFieldValue("agreetnc") && (
          <div className="w-[16px] h-[16px] rounded-full bg-purple-500 self-center justify-self-center"></div>
        )}
      </div>
      <span>
        Agree to receive new video updates from{" "}
        <span className="text-blue-500">@the__b_a_e</span>
      </span>
    </div>
  );
};
