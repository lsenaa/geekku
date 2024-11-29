import { useEffect, useState } from 'react';
import styles from './MypageSubNavbar.module.scss';
import { Link, useLocation } from 'react-router-dom';

const MypageSubNavbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const locPath = location.pathname;

  useEffect(() => {
    setSelected(locPath);
  }, [locPath]);

  const houseMenu = { name: '집꾸하기 신청내역', path: '/mypage/person' };
  const interiorMenu = [
    { name: '방꾸하기 신청내역', path: '/mypage/person/interior' },
    { name: '인테리어 문의내역', path: '/mypage/person/interior/request' },
    { name: '인테리어 업체후기', path: '/mypage/person/interior/review' },
  ];
  const onestopMenu = {
    name: '한번에꾸하기 신청내역',
    path: '/mypage/person/onestop',
  };
  const bookmarkMenu = [
    { name: '집꾸하기 북마크', path: '/mypage/person/bookmark' },
    { name: '방꾸하기 북마크', path: '/mypage/person/bookmark/interior' },
    { name: '집들이 북마크', path: '/mypage/person/bookmark/community' },
  ];
  const communityMenu = {
    name: '집들이 작성내역',
    path: '/mypage/person/community',
  };
  const infoMenu = [
    {
      name: '회원 정보 수정',
      path: '/mypage/person/info',
    },
    {
      name: '비밀번호 변경',
      path: '/mypage/person/info/password',
    },
  ];

  return (
    <ul className={styles.subNav}>
      {locPath === houseMenu.path && (
        <li className={styles.active}>
          <Link to={houseMenu.path}>{houseMenu.name}</Link>
        </li>
      )}
      {locPath.includes('/person/interior') &&
        interiorMenu.map((interior, index) => (
          <li
            key={index}
            className={selected === interior.path ? styles.active : 'false'}
            onClick={() => setSelected(interior.path)}
          >
            <Link to={interior.path}>{interior.name}</Link>
          </li>
        ))}
      {locPath === onestopMenu.path && (
        <li className={styles.active}>
          <Link to={onestopMenu.path}>{onestopMenu.name}</Link>
        </li>
      )}
      {locPath.includes('bookmark') &&
        bookmarkMenu.map((bookmark, index) => (
          <li
            key={index}
            className={selected === bookmark.path ? styles.active : 'false'}
            onClick={() => setSelected(bookmark.path)}
          >
            <Link to={bookmark.path}>{bookmark.name}</Link>
          </li>
        ))}
      {locPath === communityMenu.path && (
        <li className={styles.active}>
          <Link to={communityMenu.path}>{communityMenu.name}</Link>
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

export default MypageSubNavbar;
