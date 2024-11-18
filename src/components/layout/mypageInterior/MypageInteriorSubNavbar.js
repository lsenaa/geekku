import { useEffect, useState } from 'react';
import styles from './MypageInteriorSubNavbar.module.scss';
import { Link, useLocation } from 'react-router-dom';

const MypageInteriorSubNavbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const locPath = location.pathname;

  useEffect(() => {
    setSelected(locPath);
  }, [locPath]);

  const MyInteriorInfo = { name: '업체 정보 관리', path: '/mypage/interior' };
  const interiorMenu = [
    {
      name: '방꾸하기 답변 한 글',
      path: '/mypage/interior/manage/reqinterior',
    },
    { name: '시공사례 관리', path: '/mypage/interior/manage/case' },
    {
      name: '받은 인테리어 문의 내역',
      path: '/mypage/interior/manage/inquiry',
    },
    { name: '고객 후기 관리', path: '/mypage/interior/manage/review' },
  ];
  const onestopMenu = {
    name: '한번에꾸하기 답변 한 글',
    path: '/mypage/interior/onestop',
  };

  return (
    <ul className={styles.subNav}>
      {locPath === MyInteriorInfo.path && (
        <li className={styles.active}>
          <Link to={MyInteriorInfo.path}>{MyInteriorInfo.name}</Link>
        </li>
      )}
      {locPath.includes('manage') &&
        interiorMenu.map((interior, index) => (
          <li
            key={index}
            className={selected === interior.path ? styles.active : 'false'}
            onClick={() => setSelected(interior.path)}
          >
            <Link to={interior.path}>{interior.name}</Link>
          </li>
        ))}
      {locPath.includes('onestop') && (
        <li className={styles.active}>
          <Link to={onestopMenu.path}>{onestopMenu.name}</Link>
        </li>
      )}
    </ul>
  );
};

export default MypageInteriorSubNavbar;
