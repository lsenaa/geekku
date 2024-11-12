import { useState } from 'react';
import styles from './MypageSubNavbar.module.scss';
import { Link, useLocation } from 'react-router-dom';

const MypageSubNavbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const locPath = location.pathname;
  console.log(locPath);

  const houseMenu = [{ name: '집꾸하기 신청내역', path: '/mypageUser' }];
  const interiorMenu = [
    { name: '방꾸하기 신청내역', path: '/mypageUser/interior' },
    { name: '인테리어 업체 후기', path: '/mypageUser/interiorReview' },
  ];
  const onestopMenu = [{ name: '한번에꾸하기 신청내역', path: '#' }];
  const bookmarkMenu = [
    { name: '집꾸하기 북마크', path: '#' },
    { name: '방꾸하기 북마크', path: '#' },
    { name: '집들이 북마크', path: '#' },
  ];
  const communityMenu = [{ name: '집들이 작성내역', path: '#' }];

  return (
    <ul className={styles.subNav}>
      {locPath === '/mypageUser' && (
        <li className={styles.active}>
          <Link to={'#'}>집꾸하기 신청내역</Link>
        </li>
      )}
      {locPath.includes('interior') &&
        interiorMenu.map((interior, index) => (
          <li
            key={index}
            className={selected === interior.path && styles.active}
            onClick={() => setSelected(interior.path)}
          >
            <Link to={interior.path}>{interior.name}</Link>
          </li>
        ))}
    </ul>
  );
};

export default MypageSubNavbar;
