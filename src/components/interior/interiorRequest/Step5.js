import styles from './Step5.module.scss';
import pro1Img from './../../../assets/images/procedure1.png';
import pro2Img from './../../../assets/images/procedure2.png';
import ProgressBar from './ProgressBar';
import { useState } from 'react';

const Step5 = ({
  currentStep,
  totalSteps,
  prevStep,
  onSubmit,
  data,
  interiorNum,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [allowTime, setAllowTime] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const submissionData = {
      ...data,
      name,
      phone,
      allowTime: '오전(9~12시)',
      content,
      interiorNum,
    };

    // // 입력값 검증
    // if (name === '') {
    //   messageApi.open({
    //     type: 'warning',
    //     content: '이름을 입력해주세요.',
    //   });
    //   return;
    // }

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 입력"
          required
        />
      </div>
      <div className={styles.phone}>
        <input
          type="text"
          className={styles.input2}
          placeholder="010"
          value="010"
          readOnly
        />
        <input
          type="text"
          className={styles.input3}
          placeholder="나머지 번호를 입력해주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className={styles.callback}>통화 희망시간</div>
      <div>
        <select
          id="options"
          className={styles.callbackPick}
          value={allowTime}
          onChange={(e) => setAllowTime(e.target.value)}
          defaultChecked
        >
          <option value="오전(9~12시)">오전(9~12시)</option>
          <option value="오후(12시~6시)">오후(12시~6시)</option>
          <option value="저녁(6시이후)">저녁(6시이후)</option>
          <option value="상관없어요">상관없어요</option>
        </select>
      </div>
      <div>
        <div className={styles.callback}>요청사항(필수)</div>
        <textarea
          className={styles.content}
          placeholder="특이사항, 세부시공내역, 원하는 스타일 등"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
