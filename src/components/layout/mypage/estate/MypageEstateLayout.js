import styles from './MypageEstate.module.scss';
import MypageEstateSiderbar from './MypageEstateSidebar';
import MypageEstateSubNavbar from './MypageEstateSubNavbar';
import { Outlet, useLocation } from 'react-router';

const MypageEstateLayout = () => {
  const location = useLocation();
  const allowedPaths = [
    '/mypage/estate',
    '/mypage/estate/house',
    '/mypage/estate/onestop',
    '/mypage/estate/info',
    '/mypage/estate/info/password',
  ];

  const isAllowedPath = allowedPaths.includes(location.pathname);

  return (
    <div
      className={isAllowedPath ? styles.container : styles.notfoundContainer}
    >
      {isAllowedPath && <MypageEstateSiderbar />}
      <div className={styles.contentWrap}>
        {isAllowedPath && <MypageEstateSubNavbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default MypageEstateLayout;
