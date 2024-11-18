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

  const houseMenu = { name: '집꾸하기 신청내역', path: '/mypageUser' };
  const interiorMenu = [
    { name: '방꾸하기 신청내역', path: '/mypageUser/interior' },
    { name: '인테리어 업체 후기', path: '/mypageUser/interiorReview' },
  ];
  const onestopMenu = {
    name: '한번에꾸하기 신청내역',
    path: '/mypageUser/onestop',
  };
  const bookmarkMenu = [
    { name: '집꾸하기 북마크', path: '/mypageUser/bookmark' },
    { name: '방꾸하기 북마크', path: '/mypageUser/bookmarkInterior' },
    { name: '집들이 북마크', path: '/mypageUser/bookmarkCommunity' },
  ];
  const communityMenu = {
    name: '집들이 작성내역',
    path: '/mypageUser/community',
  };
  return (
    <ul className={styles.subNav}>
      {locPath === houseMenu.path && (
        <li className={styles.active}>
          <Link to={houseMenu.path}>{houseMenu.name}</Link>
        </li>
      )}
      {locPath.includes('interior') &&
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
    </ul>
  );
};

export default MypageSubNavbar;
