import styles from './ProfileInteriorSidebar.module.scss';
import profileImg from 'assets/images/interiorProfileImg.png';
import bookmarkImg from 'assets/images/bookmarkTrue.png';
import Button01 from 'components/commons/button/Button01';

const ProfileInteriorSidebar = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.nameWrap}>
        <p>코스타 인테리어</p>
        <img src={bookmarkImg} alt="북마크 이미지" />
      </div>
      <hr className={styles.line} />
      <div className={styles.profileDetail}>
        <p>시공 사례 26건</p>
        <p>사용자 리뷰 10건</p>
        <p>모던..is done</p>
      </div>
      <Button01 size="x-small">문의하기</Button01>
    </div>
  );
};

export default ProfileInteriorSidebar;
