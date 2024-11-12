import MypageSubNavbar from 'components/mypage/person/MypageSubNavbar';
import styles from './MypageLayout.module.scss';
import MypageSiderbar from 'components/mypage/person/MypageSiderbar';
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
