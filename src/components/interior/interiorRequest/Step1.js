import styles from './Step1.module.scss';
import ProgressBar from './ProgressBar';
import { useState } from 'react';

const Step1 = ({ currentStep, totalSteps, nextStep, onDataChange }) => {
  const [selectedSchedule, setSelectedSchedule] = useState('');

  console.log(selectedSchedule);
  const handleRadioChange = (e) => {
    setSelectedSchedule(e.target.value);
    onDataChange({ period: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!selectedSchedule) {
      alert('일정을 선택해주세요.');
      return;
    }
    nextStep();
  };

  return (
    <div className={styles.deco}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.question}>언제 시공이 되길 원하시나요?</div>
      <div className={styles.choice}>
        오늘 날짜를 기준으로 희망하시는 일정을 선택해주세요.
      </div>
      <form className={styles.scheduleForm}>
        <label>
          <input
            type="radio"
            name="schedule"
            value="2주~1달이내"
            onChange={handleRadioChange}
          />
          2주~1달이내
        </label>
        <label>
          <input
            type="radio"
            name="schedule"
            value="1달~2달이내"
            onChange={handleRadioChange}
          />
          1달~2달이내
        </label>
        <label>
          <input
            type="radio"
            name="schedule"
            value="2주~3달이내"
            onChange={handleRadioChange}
          />
          2주~3달이내
        </label>
        <label>
          <input
            type="radio"
            name="schedule"
            value="3달이후"
            onChange={handleRadioChange}
          />
          3달이후
        </label>
        <label>
          <input
            type="radio"
            name="schedule"
            value="상담 이후 결정"
            onChange={handleRadioChange}
          />
          상담 이후 결정
        </label>
      </form>
      <div className={styles.info}>
        <div>
          - 종합 리모델링 공사의 경우, 시공까지 2~3주의 여유가 있어야 상담
          진행이 가능합니다.
        </div>
        <div>
          - 2주 이내 혹은 3달 이후일 경우, 상담 진행이 어려울 수 있습니다.
        </div>
      </div>
      <div className={styles.btn}>
        <button>뒤로</button>
        <button onClick={handleNextStep} id={styles.nextBtn}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1;
