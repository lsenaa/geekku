import styles from './Step4.module.scss';
import ProgressBar from './ProgressBar';

const Step4 = ({ currentStep, totalSteps, nextStep, prevStep }) => {
  return (
    <div className={styles.deco}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.question}>시공할 공간의 평수를 선택해주세요.</div>
      <form className={styles.sizeForm}>
        <label>
          <input type="radio" name="size" value="20평이하" />
          20평이하(~66m2)
        </label>
        <label>
          <input type="radio" name="size" value="20~30평" />
          20~30평(66~99m2)
        </label>
        <label>
          <input type="radio" name="size" value="30~40평" />
          30~40평(99~132m2)
        </label>
        <label>
          <input type="radio" name="size" value="40~50평" />
          40~50평(132~165m2)
        </label>
        <label>
          <input type="radio" name="size" value="51평이상" />
          51평이상(165m2~)
        </label>
        <label>
          <input type="radio" name="size" value="기타" />
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

export default Step4;
