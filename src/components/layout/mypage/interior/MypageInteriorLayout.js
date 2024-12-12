import MypageInteriorSiderbar from 'components/layout/mypage/interior/MypageInteriorSiderbar';
import styles from './MypageInteriorLayout.module.scss';
import { Outlet, useLocation } from 'react-router';
import MypageInteriorSubNavbar from 'components/layout/mypage/interior/MypageInteriorSubNavbar';

const MypageInteriorLayout = () => {
  const location = useLocation();
  const allowedPaths = [
    '/mypage/interior',
    '/mypage/interior/manage/reqinterior',
    '/mypage/interior/manage/case',
    '/mypage/interior/manage/inquiry',
    '/mypage/interior/manage/review',
    '/mypage/interior/onestop',
    '/mypage/interior/info',
    '/mypage/interior/info/password',
  ];

  const isAllowedPath = allowedPaths.includes(location.pathname);

  return (
    <div
      className={isAllowedPath ? styles.container : styles.notfoundContainer}
    >
      {isAllowedPath && <MypageInteriorSiderbar />}
      <div className={styles.contentWrap}>
        {isAllowedPath && <MypageInteriorSubNavbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default MypageInteriorLayout;
