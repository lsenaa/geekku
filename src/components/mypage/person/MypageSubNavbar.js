import styles from './MypageSubNavbar.module.scss';
import { Link } from 'react-router-dom';

const MypageSubNavbar = () => {
  return (
    <ul className={styles.subNav}>
      <li>
        <Link to={'#'}>집꾸하기 신청내역</Link>
      </li>
    </ul>
  );
};

export default MypageSubNavbar;
