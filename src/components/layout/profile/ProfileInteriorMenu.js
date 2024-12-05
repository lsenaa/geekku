import { useEffect, useState } from 'react';
import styles from './ProfileInteriorMenu.module.scss';
import { Link, useLocation } from 'react-router-dom';

const ProfileInteriorMenu = ({ detailInfo }) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const locPath = location.pathname;
  // const interiorNum = location.state.interiorNum;

  useEffect(() => {
    setSelected(locPath);
  }, [locPath]);

  const profileMenu = [
    {
      name: '전체보기',
      path: `/profile/interior`,
    },
    {
      name: `시공사례(${detailInfo.sampleCount})`,
      path: `/profile/interior/sample`,
    },
    {
      name: `사용자 리뷰(${detailInfo.reviewCount})`,
      path: `/profile/interior/review`,
    },
    { name: '소개글', path: `/profile/interior/introduce` },
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
