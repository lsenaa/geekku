import styles from './ProfileInteriorIntroduce.module.scss';
import introImg from 'assets/images/interiorIntroImg.png';

const ProfileInteriorIntroduce = () => {
  return (
    <div className={styles.container}>
      <h3>소개글</h3>
      <div className={styles.detailWrap}>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>시공분야</p>
          <p className={styles.detailContent}>종합인테리어</p>
        </div>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>경력</p>
          <p className={styles.detailContent}>10년</p>
        </div>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>보수기간</p>
          <p className={styles.detailContent}>1년</p>
        </div>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>최근계약</p>
          <p className={styles.detailContent}>52건</p>
        </div>
      </div>
      <div className={styles.introImgWrap}>
        <img src={introImg} alt="업체소개 이미지" />
      </div>
      <div className={styles.textWrap}>
        <p>
          안녕하세요. 코스타 인테리어 입니다. 안녕하세요. 코스타 인테리어
          입니다.안녕하세요. 코스타 인테리어 입니다.안녕하세요. 코스타 인테리어
          입니다.
        </p>
      </div>
    </div>
  );
};

export default ProfileInteriorIntroduce;
