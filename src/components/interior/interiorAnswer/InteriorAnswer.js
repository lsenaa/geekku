import styles from './InteriorAnswer.module.scss';
import icon from '../../../assets/images/usericon.png';

const InteriorAnswer = () => {
  return (
    <div className={styles.all}>
      <div className={styles.title}>인테리어 문의 내역</div>
      <div>
        <div className={styles.semiTitle}>신청자</div>
        <div className={styles.user}>
          <img src={icon} alt="유저아이콘" style={{ height: '40px' }} />
          <div className={styles.nameInfo}>
            <span id={styles.name}>홍길동</span>
            <span id={styles.info}>010-1234-5678</span>
          </div>
          <span className={styles.upDate}>2024-11-01</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.semiTitle}>인테리어 조건 정보</div>
        <div className={styles.line}></div>
        <div>
          <ul>
            <li>
              <span className={styles.category}>건물유형</span>
              <span>아파트/빌라</span>
            </li>
            <li>
              <span className={styles.category}>희망 평수</span>
              <span>31평~36평</span>
            </li>
            <li>
              <span className={styles.category}>예산</span>
              <span>5,000만원</span>
            </li>
            <li>
              <span className={styles.category}>시공 희망 일자</span>
              <span>1달~2달 이내</span>
            </li>
            <li>
              <span className={styles.category}>공간 상황</span>
              <span>시공 시 공실예정</span>
            </li>
            <li>
              <span className={styles.category}>희망 통화시간</span>
              <span>오전 9시~12시</span>
            </li>
          </ul>
          <div className={styles.semiTitle}>추가 요구사항</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.contentDeco}>
          <span className={styles.content}>상세 내용</span>
          <textarea readOnly>
            주어진 예산과 희망평수로 알아보고싶습니다.주어진 예산과 희망평수로
            알아보고싶습니다.주어진 예산과 희망평수로 알아보고싶습니다.주어진
            예산과 희망평수로 알아보고싶습니다.
          </textarea>
        </div>
      </div>
      <button>목록으로</button>
    </div>
  );
};

export default InteriorAnswer;
