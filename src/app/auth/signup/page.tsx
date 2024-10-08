"use client";

import { PersonalDetailsComponent } from "./views/personal-details/PersonalDetails.component";
import { ContactComponent } from "./views/contact/Contact.component";
import { ExperienceComponent } from "./views/experience/Experience.component";
import { AgreeTNCComponent } from "./views/agree-tnc/AgreeTNC.component";
import { useMultistepForm } from "@/app/shared/useMultistepForm";
import { useEffect, useState } from "react";
import { IMultiStep, TNavigateDirection } from "@/app/shared/interfaces";
import { clsx } from "clsx";

const signupSteps: Array<IMultiStep> = [
  { key: "personal", label: "Personal", component: PersonalDetailsComponent },
  { key: "contact", label: "Contact Details", component: ContactComponent },
  { key: "experience", label: "Experience", component: ExperienceComponent },
  {
    key: "agreeTnc",
    label: "Agree Terms And Conditions",
    component: AgreeTNCComponent,
  },
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
  }, [registerAvailableSteps]);

  useEffect(() => {
    /**
     * now set the initial active step once available steps have been
     * registered
     */
    setActiveStepIndex(0);
  }, [setActiveStepIndex]);

  /**
   *
   * returns the current step to render
   */
  const returnStepToRender = () => {
    const StepComponent = signupSteps.find(
      (step) => step.key === currentFormStep?.key
    )?.component;
    if (StepComponent) {
      return (
        <StepComponent
          selectInitialFields={selectInitialFields}
          onViewFieldChange={onViewFieldChange}
          onStepValidityChange={onCurrentStepIsValid}
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
    currentFormStep && (
      <div className="grid w-full h-full">
        <div className="flex flex-col w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12 min-w-96 h-4/5 flex flex-col mt-12 justify-self-center">
          <HeaderComponent activeStep={currentFormStep} />
          <div className="bg-white p-16 rounded-[24px] shadow-xl flex flex-col gap-y-20">
            {returnStepToRender()}
            <NavigationComponent
              availableSteps={signupSteps}
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
      </div>
    )
  );
}

const HeaderComponent = ({ activeStep }: { activeStep?: IMultiStep }) => {
  return (
    <div className="flex gap-x-4 pb-12 flex items-center font-poppins">
      <span className="text-gray-300 font-poppins font-black text-2xl">
        Signup
      </span>
      <span className="min-w-1 bg-slate-100 h-full"></span>
      <span className="font-black">{activeStep?.label}</span>
    </div>
  );
};

const NavigationComponent = ({
  availableSteps,
  activeStep,
  onNextStep,
  onSubmit,
  currentStepIsValid,
}: {
  availableSteps: Array<IMultiStep>;
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
      availableSteps.findIndex((step) => step.key === activeStep?.key)
    );
  }, [activeStep, availableSteps]);

  /**
   * handlers
   */
  const onNavigateClick = (direction: TNavigateDirection) => {
    if (direction === "previous") {
      onNextStep(currentStepIndex - 1);
    } else {
      if (currentStepIndex !== availableSteps.length - 1) {
        onNextStep(currentStepIndex + 1);
      } else {
        onSubmit();
      }
    }
  };

  return (
    <div className="flex justify-between font-poppins">
      <button
        disabled={currentStepIndex === 0}
        onClick={() => onNavigateClick("previous")}
        className={clsx(
          "px-12 py-4 rounded-lg capitalize font-bold bg-blue-500 text-white",
          currentStepIndex === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600   cursor-pointer"
        )}
      >
        previous
      </button>
      <button
        disabled={!currentStepIsValid}
        onClick={() => onNavigateClick("next")}
        className={clsx(
          "px-12 py-4 rounded-lg capitalize font-bold bg-blue-500 text-white " +
            (!currentStepIsValid
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600   cursor-pointer")
        )}
      >
        {currentStepIndex === availableSteps.length - 1 ? "submit" : "next"}
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
    <div className="py-12 flex justify-center gap-x-8 items-center">
      {availableSteps.map((step) => {
        const isActive = step.key === activeStep?.key;
        return (
          <div
            key={step.key}
            className={clsx(
              "rounded-full",
              isActive
                ? "w-[24px] h-[24px] bg-black"
                : "w-[10px] h-[10px] outline outline-1"
            )}
          ></div>
        );
      })}
    </div>
  );
};
