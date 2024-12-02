import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const InteriorRequest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <Step1
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
        />
      )}
      {currentStep === 2 && (
        <Step2
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 4 && (
        <Step4
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 5 && (
        <Step5
          currentStep={currentStep}
          totalSteps={totalSteps}
          prevStep={prevStep}
        />
      )}
    </>
  );
};
export default InteriorRequest;
