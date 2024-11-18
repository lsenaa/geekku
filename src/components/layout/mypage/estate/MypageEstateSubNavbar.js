import styles from './MypageEstate.module.scss';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MypageEstateSubNavbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const locPath = location.pathname;

  useEffect(() => {
    setSelected(locPath);
  }, [locPath]);

  const estateMenu = { name: '매물 등록 내역', path: '/mypage/estate' };
  const houseMenu = {
    name: '집꾸하기 답변한 글',
    path: '/mypage/estate/house',
  };

  const onestopMenu = {
    name: '한번에꾸하기 답변한 글',
    path: '/mypage/estate/onestop',
  };

  const infoMenu = [
    {
      name: '회원 정보 수정',
      path: '/mypage/estate/info',
    },
    {
      name: '비밀번호 변경',
      path: '/mypage/estate/info/password',
    },
  ];

  return (
    <ul className={styles.subNav}>
      {locPath === estateMenu.path && (
        <li className={styles.active}>
          <Link to={estateMenu.path}>{estateMenu.name}</Link>
        </li>
      )}
      {locPath === houseMenu.path && (
        <li className={styles.active}>
          <Link to={houseMenu.path}>{houseMenu.name}</Link>
        </li>
      )}
      {locPath === onestopMenu.path && (
        <li className={styles.active}>
          <Link to={onestopMenu.path}>{onestopMenu.name}</Link>
        </li>
      )}
      {locPath.includes('info') &&
        infoMenu.map((info, index) => (
          <li
            key={index}
            className={selected === info.path ? styles.active : 'false'}
            onClick={() => setSelected(info.path)}
          >
            <Link to={info.path}>{info.name}</Link>
          </li>
        ))}
    </ul>
  );
};

export default MypageEstateSubNavbar;
