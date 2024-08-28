"use client";

import { PersonalDetailsComponent } from "./views/personal-details/PersonalDetails.component";
import { ContactComponent } from "./views/contact/Contact.component";
import { ExperienceComponent } from "./views/experience/Experience.component";
import { AgreeTNCComponent } from "./views/agree-tnc/AgreeTNC.component";
import { useMultistepForm } from "@/app/shared/useMultistepForm";
import { useEffect, useState } from "react";
import { IMultiStep, TNavigateDirection } from "@/app/shared/interfaces";

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
    getForm,
    currentFormStep,
    setActiveStepIndex,
    selectInitialFields,
    registerAvailableSteps,
    availableSteps,
    onCurrentStepIsValid,
    currentStepIsValid,
    onViewFieldChange,
  } = useMultistepForm();

  /**
   * effects
   */
  useEffect(() => {
    /**
     * register all the available steps
     */
    registerAvailableSteps(signupSteps);
  }, []);

  useEffect(() => {
    /**
     * now set the initial active step once available steps have been
     * registered
     */
    setActiveStepIndex(0);
  }, [availableSteps]);

  /**
   *
   * returns the current step to render
   */
  const returnStepToRender = () => {
    switch (currentFormStep?.key) {
      case "agreeTnc":
        return <AgreeTNCComponent />;
      case "contact":
        return (
          <ContactComponent
            selectInitialFields={selectInitialFields}
            onViewFieldChange={(view: string, field: string, value: string) =>
              onViewFieldChange(view, field, value)
            }
            onStepValidityChange={(isValid: boolean) =>
              onCurrentStepIsValid(isValid)
            }
          />
        );
      case "experience":
        return <ExperienceComponent />;
      default:
        return (
          <PersonalDetailsComponent
            selectInitialFields={selectInitialFields}
            onViewFieldChange={(view: string, field: string, value: string) =>
              onViewFieldChange(view, field, value)
            }
            onStepValidityChange={(isValid: boolean) =>
              onCurrentStepIsValid(isValid)
            }
          />
        );
    }
  };

  /**
   * when the form is submitted, get the form fields from the
   * multi-step form
   */
  const onSubmitForm = () => {
    const formFields = getForm();
    console.log("formFields", formFields);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: 36 }}>
      <HeaderComponent activeStep={currentFormStep} />
      <div>
        {returnStepToRender()}
        <NavigationComponent
          availabelSteps={signupSteps}
          activeStep={currentFormStep}
          onNextStep={(nextStepIndex: number) =>
            setActiveStepIndex(nextStepIndex)
          }
          onSubmit={() => onSubmitForm()}
          currentStepIsValid={currentStepIsValid}
        />
      </div>
      <FooterComponent
        activeStep={currentFormStep}
        availableSteps={signupSteps}
      />
    </div>
  );
}

const HeaderComponent = ({ activeStep }: { activeStep?: IMultiStep }) => {
  return <div>{activeStep?.label}</div>;
};

const NavigationComponent = ({
  availabelSteps,
  activeStep,
  onNextStep,
  onSubmit,
  currentStepIsValid,
}: {
  availabelSteps: Array<IMultiStep>;
  activeStep?: IMultiStep;
  onNextStep: Function;
  onSubmit: Function;
  currentStepIsValid?: boolean;
}) => {
  /**
   * states
   */
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  /**
   * effects
   */
  useEffect(() => {
    setCurrentStepIndex(
      availabelSteps.findIndex((step) => step.key === activeStep?.key)
    );
  }, [activeStep, availabelSteps]);

  /**
   * handlers
   */
  const onNavigateClick = (direction: TNavigateDirection) => {
    if (direction === "previous") {
      onNextStep(currentStepIndex - 1);
    } else {
      if (currentStepIndex !== availabelSteps.length - 1) {
        onNextStep(currentStepIndex + 1);
      } else {
        onSubmit();
      }
    }
  };

  return (
    <div style={{ display: "flex", columnGap: 24 }}>
      <button
        disabled={currentStepIndex === 0}
        onClick={() => onNavigateClick("previous")}
      >
        previous
      </button>
      <button
        disabled={!currentStepIsValid}
        onClick={() => onNavigateClick("next")}
      >
        {currentStepIndex === availabelSteps.length - 1 ? "submit" : "next"}
      </button>
    </div>
  );
};

const FooterComponent = ({
  activeStep,
  availableSteps,
}: {
  activeStep?: IMultiStep;
  availableSteps: Array<IMultiStep>;
}) => {
  return (
    <div style={{ display: "flex", columnGap: 24, alignItems: "center" }}>
      {availableSteps.map((step) => (
        <div
          style={{
            width: step.key === activeStep?.key ? 20 : 10,
            height: step.key === activeStep?.key ? 20 : 10,
            outline: "1px solid",
            borderRadius: 20,
            backgroundColor: step.key === activeStep?.key ? "black" : "",
          }}
          key={step.key}
        ></div>
      ))}
    </div>
  );
};
