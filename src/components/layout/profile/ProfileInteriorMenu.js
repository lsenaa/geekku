import { useEffect, useState } from 'react';
import styles from './ProfileInteriorMenu.module.scss';
import { Link, useLocation } from 'react-router-dom';

const ProfileInteriorMenu = ({ detailInfo, num }) => {
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
      path: `/profile/interior/${num}`,
    },
    {
      name: `시공사례(${detailInfo.sampleCount})`,
      path: `/profile/interior/${num}/sample`,
    },
    {
      name: `사용자 리뷰(${detailInfo.reviewCount})`,
      path: `/profile/interior/${num}/review`,
    },
    { name: '소개글', path: `/profile/interior/${num}/introduce` },
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
