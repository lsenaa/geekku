import { useEffect, useState } from 'react';
import styles from './ProfileInteriorMenu.module.scss';
import { Link, useLocation } from 'react-router-dom';

const ProfileInteriorMenu = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const locPath = location.pathname;

  useEffect(() => {
    setSelected(locPath);
  }, [locPath]);

  const profileMenu = [
    { name: '전체보기', path: '/profile/interior' },
    { name: `시공사례(${26})`, path: '/profile/interior/sample' },
    { name: `사용자 리뷰(${10})`, path: '/profile/interior/review' },
    { name: '소개글', path: '/profile/interior/introduce' },
  ];

  return (
    <ul className={styles.subNav}>
      {profileMenu.map((profile, index) => (
        <li
          key={index}
          className={selected === profile.path ? styles.active : 'false'}
          onClick={() => setSelected(profile.path)}
        >
          <Link to={profile.path}>{profile.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ProfileInteriorMenu;
