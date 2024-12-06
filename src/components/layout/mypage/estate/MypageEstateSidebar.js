import styles from './MypageEstate.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';

const MypageEstateSiderbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const user = useAtomValue(userAtom);

  const estateMenu = [
    { name: '매물 등록 내역', path: '/mypage/estate' },
    { name: '집꾸하기', path: '/mypage/estate/house' },
    { name: '한번에 꾸하기', path: '/mypage/estate/onestop' },
    { name: '회원 정보 관리', path: '/mypage/estate/info' },
  ];

  return (
    <div className={styles.profile}>
      <img
        src={`data:image/png;base64,${user.profileImageStr}`}
        alt="프로필 이미지"
        style={{ width: '80%' }}
      />
      <h4>{user.companyName}</h4>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <hr />
      <ul className={styles.sidebar}>
        {estateMenu.map((person, index) => (
          <li
            key={index}
            className={selected === person.path ? styles.active : ''}
            onClick={() => setSelected(person.path)}
          >
            <Link to={person.path}>{person.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MypageEstateSiderbar;
