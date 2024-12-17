import styles from './Step5.module.scss';
import pro1Img from './../../../assets/images/procedure1.png';
import pro2Img from './../../../assets/images/procedure2.png';
import ProgressBar from './ProgressBar';
import { useState } from 'react';
import { message, Modal } from 'antd';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { applyPhoneFormat } from 'utils/CheckPhoneNumber';

const Step5 = ({
  currentStep,
  totalSteps,
  prevStep,
  onSubmit,
  data,
  interiorNum,
}) => {
  // 상태 관리

  const [messageApi, contextHolder] = message.useMessage();
  const user = useAtomValue(userAtom);
  const [step, setStep] = useState({
    name: user.nickname || user.name || '',
    phone: '',
    allowTime: '',
    content: '',
  });
  // 입력 변경 핸들러
  const edit = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === 'phone' ? applyPhoneFormat(value) || value : value;

    setStep((prevStep) => ({
      ...prevStep,
      [name]: updatedValue,
    }));
  };

  // 휴대폰 번호 유효성 검증
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        Modal.info({
          content: '휴대폰 번호를 다시 입력해주세요.',
        });
        setStep((prevStep) => ({
          ...prevStep,
          phone: '', // 잘못된 번호 초기화
        }));
      }
    }
  };

  // 제출 처리
  const handleSubmit = () => {
    const submissionData = {
      ...data,
      ...step,
      interiorNum,
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
          name="name"
          value={step.name || user.nickname || user.name || ''}
          onChange={edit}
          placeholder="이름 입력"
        />
      </div>
      <div className={styles.phone}>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="숫자만 입력해주세요."
          onBlur={handleBlur}
          onChange={edit}
          value={step.phone || ''}
          maxLength={13}
          className={styles.input1}
        />
      </div>
      <div className={styles.callback}>통화 희망시간</div>
      <div>
        <select
          id="options"
          className={styles.callbackPick}
          value={step.allowTime || ''}
          onChange={(e) =>
            edit({ target: { name: 'allowTime', value: e.target.value } })
          }
        >
          <option value="" disabled>
            시간대 선택
          </option>
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
          value={step.content || ''}
          onChange={(e) =>
            edit({ target: { name: 'content', value: e.target.value } })
          }
        />
      </div>
      <div>
        <div className={styles.procedure}>방꾸 절차</div>
        <div className={styles.procedure1}>
          <img src={pro1Img} alt="절차이미지" />
          <span>
            통화가능시간 업체와 <br />
            짧은 유선 상담진행
          </span>
          <img src={pro2Img} alt="절차이미지" />
          <span>
            정확한 견적을 위해
            <br />
            대면 상담진행
          </span>
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={prevStep}>뒤로</button>
        <button onClick={handleSubmit} id={styles.nextBtn}>
          {contextHolder}
          신청완료
        </button>
      </div>
    </div>
  );
};

export default Step5;
