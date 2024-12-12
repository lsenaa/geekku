import styles from './Step2.module.scss';
import ProgressBar from './ProgressBar';
import { useState } from 'react';

const Step2 = ({
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  onDataChange,
}) => {
  const [selectedType, setSelectedType] = useState('');

  //console.log(selectedType);
  const handleRadioChange = (e) => {
    setSelectedType(e.target.value);
    onDataChange({ type: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!selectedType) {
      alert('시공할 공간의 종류를 선택해주세요.');
      return;
    }
    nextStep();
  };
  return (
    <div className={styles.deco}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.question}>시공할 공간의 종류를 선택해주세요.</div>
      <form className={styles.estateForm}>
        <label>
          <input
            type="radio"
            name="estate"
            value="농가주택"
            onChange={handleRadioChange}
          />
          농가주택
        </label>
        <label>
          <input
            type="radio"
            name="estate"
            value="전원주택"
            onChange={handleRadioChange}
          />
          전원주택
        </label>
        <label>
          <input
            type="radio"
            name="estate"
            value="아파트/빌라"
            onChange={handleRadioChange}
          />
          아파트/빌라
        </label>
        <label>
          <input
            type="radio"
            name="estate"
            value="기타"
            onChange={handleRadioChange}
          />
          기타
        </label>
      </form>
      <div className={styles.btn}>
        <button onClick={prevStep}>뒤로</button>
        <button onClick={handleNextStep} id={styles.nextBtn}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Step2;
