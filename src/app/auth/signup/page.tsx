"use client";

import { IMultiStep } from "@/app/shared/interfaces";
import { PersonalDetailsComponent } from "./views/personal-details/PersonalDetails.component";
import { ContactComponent } from "./views/contact/Contact.component";
import { ExperienceComponent } from "./views/experience/Experience.component";
import { AgreeTNCComponent } from "./views/agree-tnc/AgreeTNC.component";
import { useMultistepForm } from "@/app/shared/useMultistepForm";
import { useCallback, useEffect } from "react";

type TSignupViews = "agreeTnc" | "contact" | "experience" | "personal";

export default function Signup() {
  /**
   * hooks
   */
  const { currentFormStep, setActiveStep, selectInitialFields } =
    useMultistepForm();
  const cachedSelectIntialFields = useCallback(selectInitialFields, [
    selectInitialFields,
  ]);

  /**
   * effects
   */
  useEffect(() => {
    /**
     * when the signup component intializes, decide on the initial active
     * step
     */
    setActiveStep("personal");
  }, [setActiveStep]);

  /**
   *
   * handlers
   */
  const onViewFieldChange = (view: string, field: string, value: string) => {
    /**
     * when the value of a view changes, we can then update the larger
     * form
     */
    console.log("view", view);
    console.log("field", field);
    console.log("value", value);
  };

  /**
   *
   * returns the current step to render
   */
  const returnStepToRender = () => {
    console.log("currentFormStep", currentFormStep);
    switch (currentFormStep as TSignupViews) {
      case "agreeTnc":
        return <AgreeTNCComponent />;
      case "contact":
        return <ContactComponent />;
      case "experience":
        return <ExperienceComponent />;
      default:
        return (
          <PersonalDetailsComponent
            selectInitialFields={selectInitialFields}
            onViewFieldChange={(view: string, field: string, value: string) =>
              onViewFieldChange(view, field, value)
            }
          />
        );
    }
  };

  return (
    currentFormStep && (
      <div className="bg-red-50">
        <h1>{returnStepToRender()}</h1>
      </div>
    )
  );
}
