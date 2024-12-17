import logo from 'assets/images/logo.png';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useSetAtom, useAtom } from 'jotai';
import { alarmsAtom, userAtom, tokenAtom, initUser } from 'store/atoms';
import axios from 'axios';
import { url } from 'lib/axios';
import { NavLink } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const Header = ({ alarms = [] }) => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isLogin, setIsLogin] = useState(false);
  const [write, setWrite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const setAlarms = useSetAtom(alarmsAtom);

  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log('현재 user 상태 : ', user);
  // console.log('현재 token 상태 : ', token);

  const openModal = (alarm) => {
    setSelectedAlarm(alarm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAlarm(null);
    setIsModalOpen(false);
  };

  const confirm = (num) => {
    axios
      .get(`${url}/confirm/${num}`)
      .then((res) => {
        if (res.data === true) {
          setAlarms((prevAlarms) =>
            prevAlarms.filter((item) => item.num !== num)
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    //console.log(alarms);
    if (user && user.username) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user, token]);

  const userWrite = [
    { name: '집꾸 신청하기', path: '/house/write' },
    { name: '방꾸 신청하기', path: '/requestInterior/write' },
    { name: '한번에 꾸하기 신청하기', path: '/onestop/write' },
    { name: '집들이 글쓰기', path: '/communityBoardWrite' },
    { name: '인테리어 후기 작성하기', path: '/interiorReviewWrite' },
  ];
  const estateWrite = [{ name: '매물 등록하기', path: '/estate/write' }];
  const interiorWrite = [
    user.regStatus
      ? { name: '시공업체 수정하기', path: '/mypageInterior/modify' }
      : { name: '시공업체 등록하기', path: '/interiorRegister' },
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
    Modal.success({
      content: '로그아웃 되었습니다.',
    });
    setUser(initUser);
    setToken('');
    setAlarms([]);
    setIsLogin(false);
    navigate('/');
  };

  const navigateToDetail = (type, detailPath) => {
    let path = '';

    switch (type) {
      case 'house': // 예: 집꾸하기
        path = `/house/detail/${detailPath}`;
        break;
      case 'interior': // 예: 방꾸하기
        path = `/interiorAll/detail/${detailPath}`;
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

  return (
    <header className={styles.Container}>
      <div className={styles.leftSection}>
        <Link to={'/'}>
          <img src={logo} alt="헤더로고" />
        </Link>
      </div>

      <nav
        className={`${styles.centerSection} ${isLogin ? styles.loggedIn : ''}`}
      >
        <ul className={styles.menu}>
          <li>
            <NavLink
              to="/estate"
              state={{ keyword: '' }}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {({ isActive }) => <>매물검색</>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/house"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {({ isActive }) => <>집꾸하기</>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/interiorMain"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {({ isActive }) => <>방꾸하기</>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/onestop"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {({ isActive }) => <>한번에꾸하기</>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {({ isActive }) => <>집들이</>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.rightSection}>
        {isLogin ? (
          <div className={styles.loginMenuWrap}>
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
                {user &&
                  (user.type === 'user'
                    ? user.nickname || user.name
                    : user.companyName)}
              </p>
            </div>

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
                    <div
                      style={{
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      알림이 없습니다
                    </div>
                  ) : (
                    alarms.map((item) => (
                      <li
                        key={item.num}
                        className={styles.notificationItem}
                        onClick={() => openModal(item)} // 알림 클릭 시 모달 열기
                      >
                        <div
                          style={{
                            fontWeight: 'bold',
                            width: '120px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-all',
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.companyName}
                        </div>
                        <div
                          style={{
                            width: '150px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.title}
                        </div>
                        <div>
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
                          {item.type !== 'request' && (
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
                                // marginLeft: '10px',
                              }}
                            >
                              이동
                            </button>
                          )}
                        </div>
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
                      <div style={{ fontWeight: 'bold' }}>
                        <Viewer
                          key={selectedAlarm.num}
                          initialValue={
                            selectedAlarm.title || '<p>제목이 없습니다.</p>'
                          }
                        />
                      </div>
                      <Viewer
                        key={selectedAlarm.num}
                        initialValue={
                          selectedAlarm.message || '<p>내용이 없습니다.</p>'
                        }
                      />
                      <p>회사: {selectedAlarm.companyName || 'N/A'}</p>
                      {/* <p>생성 시간: {selectedAlarm.createAt}</p> */}
                      <p>
                        생성 시간:{' '}
                        {new Date(selectedAlarm.createAt).toLocaleString(
                          'ko-KR',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          }
                        )}
                      </p>
                    </div>
                  )}
                </Modal>
              </div>
            )}

            <button
              className={styles.writeBtn}
              onClick={() => setWrite(!write)}
            >
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
          <button
            onClick={() => (location.href = '/login')}
            className={styles.btn}
          >
            로그인 | 회원가입
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
