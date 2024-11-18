import styles from './Step2.module.scss';
import ProgressBar from './ProgressBar';

const Step2 = ({ currentStep, totalSteps, nextStep, prevStep }) => {
  return (
    <div className={styles.deco}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.question}>시공할 공간의 종류를 선택해주세요.</div>
      <form className={styles.estateForm}>
        <label>
          <input type="radio" name="estate" value="농가주택" />
          농가주택
        </label>
        <label>
          <input type="radio" name="estate" value="전원주택" />
          전원주택
        </label>
        <label>
          <input type="radio" name="estate" value="아파트/빌라" />
          아파트/빌라
        </label>
        <label>
          <input type="radio" name="estate" value="기타" />
          기타
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

export default Step2;
