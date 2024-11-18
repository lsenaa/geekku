import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import styles from './Header.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationButton from 'components/layout/notification/NotificationButton';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [write, setWrite] = useState(false);
  const navigate = useNavigate();

  const userWrite = [
    { name: '집꾸 신청하기', path: '/house/write' },
    { name: '방꾸 신청하기', path: '/interiorRegister' },
    { name: '한번에 꾸하기 신청하기', path: '/oneStopWrite' },
    { name: '집들이 글쓰기', path: '/communityBoardWrite' },
    { name: '인테리어 후기 작성하기', path: '/reviewWrite' },
  ];
  const estateWrite = { name: '매물 등록하기', path: '/estate/write' };
  const interiorWrite = [
    { name: '시공업체 등록하기', path: '/companyRegister' },
    { name: '시공사례 등록하기', path: '/' },
  ];

  return (
    <header className={styles.Container}>
      <Link to={'/'}>
        <img src={logo} alt="헤더로고" />
      </Link>
      <nav className={`${styles.navWrapper} ${isLogin ? styles.loggedIn : ''}`}>
        <ul>
          <li>
            <Link to={'/estate'}>매물검색</Link>
          </li>
          <li>
            <Link to={'/house'}>집꾸하기</Link>
          </li>
          <li>
            <Link to={'/interior'}>방꾸하기</Link>
          </li>
          <li>
            <Link to={'/oneStop'}>한번에꾸하기</Link>
          </li>
          <li>
            <Link to={'/community'}>집들이</Link>
          </li>
        </ul>
      </nav>
      {/* 로그인 유무 헤더 */}
      {isLogin ? (
        <div className={styles.loginMenuWrap}>
          <button className={styles.btn} onClick={() => setWrite(!write)}>
            글쓰기
          </button>
          {write && (
            <ul className={styles.writeWrapper}>
              {userWrite.map((user, i) => (
                <li key={i}>
                  <Link to={user.path} onClick={() => setWrite(!write)}>
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.notificationWrap}>
            <IoMdNotificationsOutline size="30" color="#6D885D" />
            <p>10</p>
          </div>
          <div
            className={styles.userProfile}
            onClick={() => navigate('/mypage/person')}
          >
            <FaUserCircle size="30" color="#6D885D" />
            <p className={styles.name}>홍길동</p>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate('/Login')} className={styles.btn}>
          로그인 | 회원가입
        </button>
      )}

      {/* 알림 버튼 추가 위치 옮겨야 함*/}
      {/* <NotificationButton /> */}
    </header>
  );
};

export default Header;
