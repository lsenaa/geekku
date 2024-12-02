import styles from './Step5.module.scss';
import pro1Img from './../../../assets/images/procedure1.png';
import pro2Img from './../../../assets/images/procedure2.png';
import ProgressBar from './ProgressBar';
import { useState } from 'react';

const Step5 = ({ currentStep, totalSteps, prevStep, onSubmit, data }) => {
  const handleSubmit = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [callTime, setCallTime] = useState('option1');
    const [requestInfo, setRequsetInfo] = useState('');

    const submissionData = {
      ...data,

      phone,
      callTime,
      requestInfo,
    };
    onSubmit(submissionData);
  };
  return (
    <div className={styles.deco}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.question}>
        업체와 상담을 위해 정보들을 기입해주세요.
      </div>
      <div className={styles.choice}>
        업체와 상담을 하시는 분의 이름과 연락처를 기입해주세요.
      </div>
      <div>
        <input
          type="text"
          className={styles.input1}
          placeholder="이름 입력"
          required
        />
      </div>
      <div className={styles.phone}>
        <input type="text" className={styles.input2} placeholder="010" />
        <input
          type="text"
          className={styles.input3}
          placeholder="나머지 번호를 입력해주세요"
          required
        />
      </div>
      <div className={styles.callback}>통화 희망시간</div>
      <div>
        <select id="options" className={styles.callbackPick} defaultChecked>
          <option value="option1">오전(9~12시)</option>
          <option value="option2">오후(12시~6시)</option>
          <option value="option3">저녁(6시이후)</option>
          <option value="option4">상관없어요</option>
        </select>
      </div>
      <div>
        <div className={styles.callback}>요청사항(선택)</div>
        <textarea
          className={styles.content}
          placeholder="특이사항, 세부시공내역, 원하는 스타일 등"
        />
      </div>
      <div>
        <div className={styles.procedure}>방꾸 절차</div>
        <div className={styles.procedure1}>
          <img src={pro1Img} alt="절차이미지" />
          <span>
            통화가능시간 업체와 <br />
            짧은 유선 상담진행{' '}
          </span>
          <img src={pro2Img} alt="절차이미지" />
          <span>
            정확한 견적을 위해
            <br /> 대면 상담진행
          </span>
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={prevStep}>뒤로</button>
        <button onClick={handleSubmit} id={styles.nextBtn}>
          신청완료
        </button>
      </div>
    </div>
  );
};

export default Step5;
