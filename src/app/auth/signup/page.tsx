"use client";

import { PersonalDetailsComponent } from "./views/personal-details/PersonalDetails.component";
import { ContactComponent } from "./views/contact/Contact.component";
import { ExperienceComponent } from "./views/experience/Experience.component";
import { AgreeTNCComponent } from "./views/agree-tnc/AgreeTNC.component";
import { useMultistepForm } from "@/app/shared/useMultistepForm";
import { useCallback, useEffect } from "react";
import { IMultiStep } from "@/app/shared/interfaces";

const signupSteps: Array<IMultiStep> = [
  { key: "personal", label: "Personal" },
  { key: "contact", label: "Contact Details" },
  { key: "experience", label: "Experience" },
  { key: "agreeTnc", label: "Agree Terms And Conditions" },
];

export default function Signup() {
  /**
   * hooks
   */
  const {
    currentFormStep,
    setActiveStep,
    selectInitialFields,
    registerAvailableSteps,
  } = useMultistepForm();

  /**
   * effects
   */
  useEffect(() => {
    // register all the available steps
    registerAvailableSteps(signupSteps);

    // set initial active step
    setActiveStep(0);
  }, [setActiveStep, registerAvailableSteps]);

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
    switch (currentFormStep?.key) {
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
      <div style={{ display: "flex", flexDirection: "column", rowGap: 36 }}>
        <HeaderComponent activeStep={currentFormStep} />
        <div>{returnStepToRender()}</div>
        <FooterComponent
          activeStep={currentFormStep}
          availableSteps={signupSteps}
        />
      </div>
    )
  );
}

const HeaderComponent = ({ activeStep }: { activeStep: IMultiStep }) => {
  return <div>{activeStep.label}</div>;
};

const FooterComponent = ({
  activeStep,
  availableSteps,
}: {
  activeStep: IMultiStep;
  availableSteps: Array<IMultiStep>;
}) => {
  return (
    <div style={{ display: "flex", columnGap: 24, alignItems: "center" }}>
      {availableSteps.map((step) => (
        <div
          style={{
            width: step.key === activeStep.key ? 20 : 10,
            height: step.key === activeStep.key ? 20 : 10,
            outline: "1px solid",
            borderRadius: 20,
            backgroundColor: step.key === activeStep.key ? "black" : "",
          }}
          key={step.key}
        ></div>
      ))}
    </div>
  );
};
