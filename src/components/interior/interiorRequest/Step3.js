import styles from './Step3.module.scss';
import ProgressBar from './ProgressBar';

const Step3 = ({ currentStep, totalSteps, nextStep, prevStep }) => {
  return (
    <div className={styles.deco}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.question}>
        인테리어 공간의 상황을 선택해주세요.
      </div>
      <form className={styles.conditionForm}>
        <label>
          <input type="radio" name="condition" value="현재 공실" />
          현재 공실
        </label>
        <label>
          <input type="radio" name="condition" value="시공시 공실 예정" />
          시공시 공실 예정
        </label>
        <label>
          <input type="radio" name="condition" value="사용/거주중" />
          사용/거주중
        </label>
        <label>
          <input type="radio" name="condition" value="상담 이후 결정" />
          상담 이후 결정
        </label>
      </form>
      <div className={styles.btn}>
        <button onClick={prevStep}>뒤로</button>
        <button onClick={nextStep} id={styles.nextBtn}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Step3;
