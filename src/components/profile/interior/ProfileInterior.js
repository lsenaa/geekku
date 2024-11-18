import styles from './ProfileInterior.module.scss';
import profileImg from 'assets/images/interiorProfileImg.png';
import bookmarkImg from 'assets/images/bookmarkTrue.png';
import Button01 from 'components/commons/button/Button01';
import ProfileInteriorSidebar from 'components/layout/profile/ProfileInteriorSidebar';
import { Link, Outlet } from 'react-router-dom';
import ProfileInteriorMenu from 'components/layout/profile/ProfileInteriorMenu';

const ProfileInterior = () => {
  return (
    <>
      <div className={styles.coverImgWrap}>
        <img src={profileImg} alt="인테리어업체 커버이미지" />
      </div>
      <div className={styles.container}>
        <ProfileInteriorSidebar />
        <div className={styles.contentWrap}>
          <ProfileInteriorMenu />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileInterior;
