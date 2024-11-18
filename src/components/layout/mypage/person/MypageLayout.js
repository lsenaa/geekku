import MypageSubNavbar from 'components/layout/mypage/person/MypageSubNavbar';
import styles from './MypageLayout.module.scss';
import MypageSiderbar from 'components/layout/mypage/person/MypageSiderbar';
import { Outlet, useLocation } from 'react-router';

const MypageLayout = () => {
  const location = useLocation();
  const allowedPaths = [
    '/mypage/person',
    '/mypage/person/interior',
    '/mypage/person/interior/review',
    '/mypage/person/onestop',
    '/mypage/person/bookmark',
    '/mypage/person/bookmark/interior',
    '/mypage/person/bookmark/community',
    '/mypage/person/community',
    '/mypage/person/info',
    '/mypage/person/info/password',
  ];

  const isAllowedPath = allowedPaths.includes(location.pathname);

  return (
    <div
      className={isAllowedPath ? styles.container : styles.notfoundContainer}
    >
      {isAllowedPath && <MypageSiderbar />}
      <div className={styles.contentWrap}>
        {isAllowedPath && <MypageSubNavbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default MypageLayout;
