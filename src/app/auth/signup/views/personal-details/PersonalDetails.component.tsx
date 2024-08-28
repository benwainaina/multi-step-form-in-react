import { IDynamicFields, IMultiStepParam } from "@/app/shared/interfaces";
import { useBaseStep } from "@/app/shared/useBaseStep";
import { useEffect } from "react";

export const PersonalDetailsComponent = ({
  selectInitialFields,
  onViewFieldChange,
}: IMultiStepParam) => {
  /**
   * constants
   */
  const viewName = "personal";

  /**
   * hooks
   */
  const {
    patchForm,
    updateFormField,
    registerFormFields,
    stepIsValid,
    setViewName,
  } = useBaseStep();

  /**
   * effects
   */

  useEffect(() => {
    /**
     * when the component intializes, initialize the form
     */
    setViewName(viewName);
    registerFormFields(
      {
        firstname: "",
        lastname: "",
      },
      ["firstname", "lastname"]
    );
    patchForm(selectInitialFields(viewName));
  }, [selectInitialFields, setViewName, registerFormFields, patchForm]);

  return (
    <div>
      <h1>PersonalDetailsComponent</h1>
    </div>
  );
};
