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
  }, []);

  useEffect(() => {
    /**
     * when the step validity changes
     */
    if (stepIsValid !== undefined) {
      onStepValidityChange(stepIsValid);
    }
  }, [stepIsValid]);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Full name"
          value={form.firstname}
          onChange={({ target: { value: newTextValue } }) => {
            updateFormField("firstname", newTextValue);
            onViewFieldChange(viewName, "firstname", newTextValue);
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          value={form.lastname}
          onChange={({ target: { value: newTextValue } }) => {
            updateFormField("lastname", newTextValue);
            onViewFieldChange(viewName, "lastname", newTextValue);
          }}
        />
      </form>
    </div>
  );
};
