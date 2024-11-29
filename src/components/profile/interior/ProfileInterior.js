import styles from './ProfileInterior.module.scss';
import profileImg from 'assets/images/interiorProfileImg.png';
import ProfileInteriorSidebar from 'components/layout/profile/ProfileInteriorSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import ProfileInteriorMenu from 'components/layout/profile/ProfileInteriorMenu';
import { useEffect } from 'react';

const ProfileInterior = () => {
  const location = useLocation();
  // console.log(location);

  const allowedPaths = [
    `/profile/interior`,
    '/profile/interior/sample',
    '/profile/interior/review',
    '/profile/interior/introduce',
  ];

  const isAllowedPath = allowedPaths.includes(location.pathname);

  return (
    <>
      {isAllowedPath && (
        <div className={styles.coverImgWrap}>
          <img src={profileImg} alt="인테리어업체 커버이미지" />
        </div>
      )}
      <div
        className={isAllowedPath ? styles.container : styles.notfoundContainer}
      >
        {isAllowedPath && <ProfileInteriorSidebar />}
        <div className={styles.contentWrap}>
          {isAllowedPath && <ProfileInteriorMenu />}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileInterior;
