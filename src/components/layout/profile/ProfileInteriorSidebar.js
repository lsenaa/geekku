import styles from './ProfileInteriorSidebar.module.scss';
import profileImg from 'assets/images/interiorProfileImg.png';
import bookmarkImg from 'assets/images/bookmarkTrue.png';
import Button01 from 'components/commons/button/Button01';

const ProfileInteriorSidebar = ({ detailInfo }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.nameWrap}>
        <p>{detailInfo.companyName}</p>
        <img src={bookmarkImg} alt="북마크 이미지" />
      </div>
      <hr className={styles.line} />
      <div className={styles.detailInfo}>
        <p>시공 사례 {detailInfo.sampleCount}건</p>
        <p>사용자 리뷰 {detailInfo.reviewCount}건</p>
        <p>{detailInfo.intro}</p>
      </div>
      <Button01 size="x-small">문의하기</Button01>
    </div>
  );
};

export default ProfileInteriorSidebar;
