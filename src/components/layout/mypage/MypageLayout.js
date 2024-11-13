import MypageSubNavbar from 'components/layout/mypage/MypageSubNavbar';
import styles from './MypageLayout.module.scss';
import MypageSiderbar from 'components/layout/mypage/MypageSiderbar';
import { Outlet } from 'react-router';

const MypageLayout = () => {
  return (
    <div className={styles.container}>
      <MypageSiderbar />
      <div className={styles.contentWrap}>
        <MypageSubNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MypageLayout;
