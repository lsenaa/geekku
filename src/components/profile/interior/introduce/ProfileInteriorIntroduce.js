import { useOutletContext } from 'react-router';
import styles from './ProfileInteriorIntroduce.module.scss';
import introImg from 'assets/images/interiorIntroImg.png';

const ProfileInteriorIntroduce = () => {
  const { detailInfo } = useOutletContext();

  return (
    <div className={styles.container}>
      <h3>소개글</h3>
      <div className={styles.detailWrap}>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>시공분야</p>
          <p className={styles.detailContent}>
            {detailInfo.interiorDetail.possiblePart === true ? (
              <>종합/부분인테리어</>
            ) : (
              <>종합인테리어</>
            )}
            {detailInfo.interiorDetail.possiblePart}
          </p>
        </div>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>경력</p>
          <p className={styles.detailContent}>
            {detailInfo.interiorDetail.period}개월
          </p>
        </div>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>보수기간</p>
          <p className={styles.detailContent}>
            {detailInfo.interiorDetail.repairDate}개월
          </p>
        </div>
        <div className={styles.detailRow}>
          <p className={styles.detailTitle}>최근계약</p>
          <p className={styles.detailContent}>
            {detailInfo.interiorDetail.recentCount}건
          </p>
        </div>
      </div>
      <div className={styles.textWrap}>
        <p>
          <pre>{detailInfo.interiorDetail.content}</pre>
        </p>
      </div>
    </div>
  );
};

export default ProfileInteriorIntroduce;
