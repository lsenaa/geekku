import styles from './MypageSiderbar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

const MypageSiderbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const personMenu = [
    { name: '집꾸하기', path: '/mypage/person' },
    { name: '방꾸하기', path: '/mypage/person/interior' },
    { name: '한번에 꾸하기', path: '/mypage/person/onestop' },
    { name: '북마크', path: '/mypage/person/bookmark' },
    { name: '집들이', path: '/mypage/person/community' },
    { name: '회원 정보 관리', path: '/mypage/person/info' },
  ];

  return (
    <div className={styles.profile}>
      <FaUserCircle color="#6D885D" size={100} />
      <h4>홍길동</h4>
      <p>kosta123</p>
      <p>kosta@gmail.com</p>
      <hr />
      <ul className={styles.sidebar}>
        {personMenu.map((person, index) => (
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

export default MypageSiderbar;
