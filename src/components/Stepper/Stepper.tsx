import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void; // Receive function from parent
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full last:w-fit">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold cursor-pointer ${
              index < currentStep
                ? "bg-green-600 text-white"
                : index === currentStep
                  ? "border-2 border-blue-600 text-blue-600 bg-white"
                  : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => onStepClick(index)}
          >
            {index < currentStep ? (
              <span className="material-symbols-outlined">task_alt</span>
            ) : (
              index + 1
            )}
          </div>
          <p
            className={`ml-2 font-medium w-max cursor-pointer ${
              index < currentStep
                ? "text-green-600"
                : index === currentStep
                  ? "text-blue-600"
                  : "text-gray-500"
            }`}
            onClick={() => onStepClick(index)}
          >
            {step}
          </p>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-[2px] mx-2 ${
                index < currentStep ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
