import logo from 'assets/images/logo.png';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { userNameAtom, alarmsAtom, userAtom, tokenAtom } from 'store/atoms';
import { FaUserCircle } from 'react-icons/fa';
import defaultImg from 'assets/images/usericon.png';
import axios from 'axios';

const Header = ({ alarms = [] }) => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isLogin, setIsLogin] = useState(false);
  const [write, setWrite] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 알림 패널 열기/닫기 상태
  const navigate = useNavigate();
  const [username, setUserName] = useAtom(userNameAtom);
  const setAlarms = useSetAtom(alarmsAtom);
  // 알림 모달 테스트용
  const [selectedAlarm, setSelectedAlarm] = useState(null); // 선택된 알림 데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  // 알림 확장 테스트용
  const [expandedNotification, setExpandedNotification] = useState(null); // 확장된 알림 ID 관리

  const openModal = (alarm) => {
    setSelectedAlarm(alarm); // 선택된 알림 데이터 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setSelectedAlarm(null); // 선택된 알림 데이터 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  const toggleNotification = (num) => {
    setExpandedNotification((prev) => (prev === num ? null : num));
  };

  const confirm = (num) => {
    axios
      .get(`http://localhost:8080/confirm/${num}`)
      .then((res) => {
        if (res.data === true) {
          setAlarms(alarms.filter((item) => item.num !== num));
          console.log(alarms);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user && user.username) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user, token]);

  const userWrite = [
    { name: '집꾸 신청하기', path: '/house/write' },
    { name: '방꾸 신청하기', path: '/requestInteriorWrite' },
    { name: '한번에 꾸하기 신청하기', path: '/onestop/write' },
    { name: '집들이 글쓰기', path: '/communityBoardWrite' },
    { name: '인테리어 후기 작성하기', path: '/interiorReviewWrite' },
  ];
  const estateWrite = [{ name: '매물 등록하기', path: '/estate/write' }];
  const interiorWrite = [
    { name: '시공업체 등록하기', path: '/interiorRegister' },
    { name: '시공사례 등록하기', path: '/sampleRegister' },
  ];

  const getWriteOptions = () => {
    if (!user) return [];
    switch (user.type) {
      case 'user':
        return userWrite;
      case 'estate':
        return estateWrite;
      case 'interior':
        return interiorWrite;
      default:
        return [];
    }
  };

  const onClickMypage = () => {
    if (!user.type) return;
    switch (user.type) {
      case 'user':
        return navigate('/mypage/person');
      case 'estate':
        return navigate('/mypage/estate');
      case 'interior':
        return navigate('/mypage/interior');
      default:
        return;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setIsLogin(false);
    Modal.success({
      content: '로그아웃 되었습니다.',
    });
    navigate('/');
  };

  //현재 user 상태 콘솔에 출력
  console.log('현재 user 상태 : ', user);

  const navigateToDetail = (type, detailPath) => {
    let path = '';

    switch (type) {
      case 'house': // 예: 집꾸하기
        path = `/house/detail/${detailPath}`;
        break;
      case 'interior': // 예: 방꾸하기
        path = `/interior/detail/${detailPath}`;
        break;
      case 'onestop': // 예: 한번에꾸하기
        path = `/onestop/detail/${detailPath}`;
        break;
      default:
        path = '/';
        break;
    }

    navigate(path);
  };

  // 알림 상세 내용 스타일
  const notificationDetailsStyle = {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginTop: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };

  // 알림 액션 버튼 컨테이너 스타일
  const notificationActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '10px',
  };

  return (
    <header className={styles.Container}>
      <Link to={'/'}>
        <img src={logo} alt="헤더로고" />
      </Link>
      <nav className={`${styles.navWrapper} ${isLogin ? styles.loggedIn : ''}`}>
        <ul>
          <li>
            <Link to={'/estate'} state={{ keyword: '' }}>
              매물검색
            </Link>
          </li>
          <li>
            <Link to={'/house'}>집꾸하기</Link>
          </li>
          <li>
            <Link to={'/interiorMain'}>방꾸하기</Link>
          </li>
          <li>
            <Link to={'/onestop'}>한번에꾸하기</Link>
          </li>
          <li>
            <Link to={'/community'}>집들이</Link>
          </li>
        </ul>
      </nav>
      {/* 로그인 유무 헤더 */}
      {isLogin ? (
        <div className={styles.loginMenuWrap}>
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
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: '50px',
                    height: '30px',
                    borderRadius: '5px',
                    borderWidth: 0,
                    backgroundColor: '#c6d695',
                    color: '#ffffff',
                  }}
                >
                  닫기
                </button>
              </div>

              <ul className={styles.notificationList}>
                {alarms.length === 0 ? (
                  <div style={{ height: '100px' }}>내용이 없습니다</div>
                ) : (
                  alarms.map((item) => (
                    <li
                      key={item.num}
                      className={styles.notificationItem}
                      onClick={() => openModal(item)} // 알림 클릭 시 모달 열기
                    >
                      <div style={{ fontWeight: 'bold' }}>
                        {item.companyName}
                      </div>
                      &nbsp;&nbsp;{item.title}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트 전파 방지
                          confirm(item.num); // 확인 처리
                        }}
                        className={styles.confirmBtn}
                        style={{
                          width: '50px',
                          height: '30px',
                          borderRadius: '5px',
                          borderWidth: 0,
                          backgroundColor: '#c6d695',
                          color: '#ffffff',
                          marginLeft: '10px',
                        }}
                      >
                        확인
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트 전파 방지
                          navigateToDetail(item.type, item.detailPath); // 바로 이동
                        }}
                        className={styles.moveBtn}
                        style={{
                          width: '50px',
                          height: '30px',
                          borderRadius: '5px',
                          borderWidth: 0,
                          backgroundColor: '#6d885d',
                          color: '#ffffff',
                          marginLeft: '10px',
                        }}
                      >
                        이동
                      </button>
                    </li>
                  ))
                )}
              </ul>

              <Modal
                open={isModalOpen}
                onCancel={closeModal} // 모달 닫기
                footer={[
                  <button
                    key="move"
                    onClick={() => {
                      navigateToDetail(
                        selectedAlarm.type,
                        selectedAlarm.detailPath
                      ); // 이동 처리
                      closeModal();
                    }}
                    className={styles.moveModalBtn}
                    style={{
                      width: '50px',
                      height: '30px',
                      borderRadius: '5px',
                      borderWidth: 0,
                      backgroundColor: '#6d885d',
                      color: '#ffffff',
                      marginLeft: '10px',
                    }}
                  >
                    이동
                  </button>,
                  <button
                    key="close"
                    onClick={closeModal}
                    className={styles.closeModalBtn}
                    style={{
                      width: '50px',
                      height: '30px',
                      borderRadius: '5px',
                      borderWidth: 0,
                      backgroundColor: '#6d885d',
                      color: '#ffffff',
                      marginLeft: '10px',
                    }}
                  >
                    닫기
                  </button>,
                ]}
              >
                {selectedAlarm && (
                  <div>
                    <h2>{selectedAlarm.title}</h2>
                    <p>{selectedAlarm.message}</p>
                    <p>회사: {selectedAlarm.companyName || 'N/A'}</p>
                    <p>생성 시간: {selectedAlarm.createAt}</p>
                  </div>
                )}
              </Modal>
            </div>
          )}

          {/* 사용자 프로필 이미지와 이름 */}
          <div className={styles.userProfile} onClick={onClickMypage}>
            {user && (
              <div className={styles.profileImageWrap}>
                <img
                  src={`data:image/png;base64,${user.profileImageStr}`}
                  alt="프로필이미지"
                  className={styles.profileImage}
                />
              </div>
            )}
            <p className={styles.name}>
              {user && (user.type == 'user' ? user.nickname : user.companyName)}
            </p>
          </div>

          <button className={styles.writeBtn} onClick={() => setWrite(!write)}>
            글쓰기
          </button>
          {write && (
            <ul className={styles.writeWrapper}>
              {getWriteOptions().map((item, i) => (
                <li key={i}>
                  <Link to={item.path} onClick={() => setWrite(!write)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* 로그아웃버튼 */}
          <button onClick={logout} className={styles.logoutBtn}>
            로그아웃
          </button>
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
