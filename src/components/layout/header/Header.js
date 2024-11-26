import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import styles from './Header.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useSetAtom, useAtom } from 'jotai';
import { userNameAtom, alarmsAtom } from '../../../store/atoms';
import axios from 'axios';

const Header = ({ alarms = [] }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [write, setWrite] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 알림 패널 열기/닫기 상태
  const navigate = useNavigate();
  const [username, setUserName] = useAtom(userNameAtom);
  const setAlarms = useSetAtom(alarmsAtom);

  const confirm = (num) => {
    axios
      .get(`http://localhost:8080/confirm/${num}`)
      .then((res) => {
        if (res.data === true) {
          setAlarms(alarms.filter((item) => item.num !== num));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userWrite = [
    { name: '집꾸 신청하기', path: '/house/write' },
    { name: '방꾸 신청하기', path: '/requestInteriorWrite' },
    { name: '한번에 꾸하기 신청하기', path: '/onestop/write' },
    { name: '집들이 글쓰기', path: '/communityBoardWrite' },
    { name: '인테리어 후기 작성하기', path: '/reviewWrite' },
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

          {/* 알림 버튼 추가 위치 */}
          <a href="/sendalarm">알람전송</a>

          {/* 알림 아이콘 버튼 */}
          <a href="#" onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.notificationWrap}>
              <IoMdNotificationsOutline size="30" color="#6D885D" />
              <p>{alarms.length !== 0 ? alarms.length : 0}</p>
            </div>
          </a>

          {/* 알림 패널 */}
          {isOpen && (
            <div
              className={`${styles.notificationPanel} ${isOpen ? styles.open : styles.close}`}
            >
              <div className={styles.notificationHeader}>
                <span>알림</span>
                <button onClick={() => setIsOpen(false)}>닫기</button>
              </div>
              <ul className={styles.notificationList}>
                {alarms.length === 0 ? (
                  <div>내용이 없습니다</div>
                ) : (
                  alarms.map((item) => (
                    <li key={item.num} className={styles.notificationItem}>
                      <b>{item.title}</b>&nbsp;&nbsp;{item.body}
                      <button onClick={() => confirm(item.num)}>확인</button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}

          {/* 사용자 프로필 */}
          <div
            className={styles.userProfile}
            onClick={() => navigate('/mypage/person')}
          >
            <FaUserCircle size="30" color="#6D885D" />
            <p className={styles.name}>{username ? username : '홍길동'}</p>{' '}
            {/* 사용자 이름 */}
          </div>
        </div>
      ) : (
        <button onClick={() => navigate('/Login')} className={styles.btn}>
          로그인 | 회원가입
        </button>
      )}
    </header>
  );
};

export default Header;
