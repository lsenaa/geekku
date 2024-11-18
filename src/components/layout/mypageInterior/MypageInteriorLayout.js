import MypageInteriorSubNavbar from './MypageInteriorSubNavbar';
import styles from './MypageInteriorLayout.module.scss';
import MypageInteriorSiderbar from './MypageInteriorSiderbar';
import { Outlet } from 'react-router';

const MypageInteriorLayout = () => {
  return (
    <div className={styles.container}>
      <MypageInteriorSiderbar />
      <div className={styles.contentWrap}>
        <MypageInteriorSubNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MypageInteriorLayout;
