import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { axiosInToken } from 'lib/axios';
import { useLocation, useNavigate } from 'react-router';
import { Modal } from 'antd';

const InteriorRequest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [data, setData] = useState({});
  const location = useLocation();

  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);

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

  const handleDataChange = (newData) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = async (submissionData) => {
    console.log('제출 데이터:', submissionData);
    await axiosInToken(token)
      .post(`/user/interiorRequest`, submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        Modal.success({
          content: '해당 업체에 문의가 완료되었습니다.',
        });
        navigate(`/InteriorAnswer/${res.data}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {currentStep === 1 && (
        <Step1
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          onDataChange={handleDataChange}
        />
      )}
      {currentStep === 2 && (
        <Step2
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          onDataChange={handleDataChange}
        />
      )}
      {currentStep === 3 && (
        <Step3
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          onDataChange={handleDataChange}
        />
      )}
      {currentStep === 4 && (
        <Step4
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          onDataChange={handleDataChange}
        />
      )}
      {currentStep === 5 && (
        <Step5
          currentStep={currentStep}
          totalSteps={totalSteps}
          prevStep={prevStep}
          onSubmit={handleSubmit}
          data={data}
          interiorNum={location.state}
        />
      )}
    </>
  );
};
export default InteriorRequest;
