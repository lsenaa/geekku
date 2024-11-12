import styles from './HouseDetailAnswerWrite.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../../commons/button/Button01';

const HouseDetailAnswerWrite = ({ toggleModal }) => {
  return (
    <div className={styles.modalContainer}>
      <div>
        <div className={styles.profile}>
          <FaUserCircle color="#6D885D" size={30} />
          <p>코스타 부동산</p>
        </div>
        <div className={styles.phoneAddWrap}>
          <div className={styles.phone}>
            <p>연락처</p>
            <p>010-1234-5678</p>
          </div>
          <div className={styles.address}>
            <p>주소</p>
            <p>
              강원특별자치도 춘천시 안마산로 131 상가씨동 1층 C-106호(퇴계동)
            </p>
          </div>
        </div>
      </div>
      <div className={styles.editorContent}>
        <p>에디터 들어감 - 사진, 위치정보 등 상세 내용 작성</p>
      </div>
      <div className={styles.btnWrap}>
        <Button01 size="small">작성하기</Button01>
        <Button01 size="small" color="sub" onClick={toggleModal}>
          취소하기
        </Button01>
      </div>
    </div>
  );
};

export default HouseDetailAnswerWrite;
