import styles from './MypageInteriorSiderbar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';

const MypageInteriorSiderbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const user = useAtomValue(userAtom);

  const interiorMenu = [
    { name: '업체 정보', path: '/mypage/interior' },
    { name: '방꾸하기', path: '/mypage/interior/manage/reqinterior' },
    { name: '한번에 꾸하기', path: '/mypage/interior/onestop' },
    { name: '회원 정보 관리', path: '/mypage/interior/info' },
  ];

  return (
    <div className={styles.profile}>
      <div className={styles.profileImg}>
        <img
          src={`data:image/png;base64,${user.profileImageStr}`}
          alt="프로필 이미지"
        />
      </div>
      <h4>{user.companyName}</h4>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <hr />
      <ul className={styles.sidebar}>
        {interiorMenu.map((interior, index) => (
          <li
            key={index}
            className={selected === interior.path ? styles.active : ''}
            onClick={() => setSelected(interior.path)}
          >
            <Link to={interior.path}>{interior.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MypageInteriorSiderbar;
