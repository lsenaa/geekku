import styles from './Step4.module.scss';
import ProgressBar from './ProgressBar';
import { useState } from 'react';
import { message } from 'antd';

const Step4 = ({
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  onDataChange,
}) => {
  const [selectedSize, setSelectedSize] = useState('');

  //console.log(selectedSize);
  const handleRadioChange = (e) => {
    setSelectedSize(e.target.value);
    onDataChange({ size: e.target.value });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const handleNextStep = (e) => {
    e.preventDefault();
    if (selectedSize === '') {
      messageApi.open({
        type: 'warning',
        content: '공간의 평수를 선택해주세요.',
      });
      return;
    }
    nextStep();
  };
  return (
    <div className={styles.deco}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.question}>시공할 공간의 평수를 선택해주세요.</div>
      <form className={styles.sizeForm}>
        <label>
          <input
            type="radio"
            name="size"
            value="20평이하"
            onChange={handleRadioChange}
          />
          20평이하(~66m2)
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="20~30평"
            onChange={handleRadioChange}
          />
          20~30평(66~99m2)
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="30~40평"
            onChange={handleRadioChange}
          />
          30~40평(99~132m2)
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="40~50평"
            onChange={handleRadioChange}
          />
          40~50평(132~165m2)
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="51평이상"
            onChange={handleRadioChange}
          />
          51평이상(165m2~)
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="기타"
            onChange={handleRadioChange}
          />
          기타
        </label>
      </form>
      <div className={styles.btn}>
        <button onClick={prevStep}>뒤로</button>
        <button onClick={handleNextStep} id={styles.nextBtn}>
          {contextHolder}
          다음
        </button>
      </div>
    </div>
  );
};

export default Step4;
