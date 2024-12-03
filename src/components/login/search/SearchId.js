import loginLogo from 'assets/images/login/loginLogo.png';
import styles from '../Login.module.scss';
import { url } from 'lib/axios';
import { Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SearchId = () => {
  const [isPhone, setIsPhone] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const confirmClick = () => {
    setIsConfirm(true);
  };

  const tabClick = (isPhone) => {
    setIsPhone(isPhone);
    setIsConfirm(false);
    setPhoneNumber('');
    setEmail('');
    setVerificationCode('');
  };

  const sendEmail = () => {
    if (!email) {
      Modal.error({ content: '이메일 주소를 입력하세오.' });
      return;
    }

    axios
      .post(`${url}/sendVerificationCode`, null, {
        params: {
          email: email,
        },
      })
      .then((res) => {
        Modal.success({
          content: '인증번호가 발송되었습니다. 입력하신 이메일을 확인해주세요.',
        });
      })
      .catch((error) => {
        console.log('인증번호 발송 실패 : ', error);
        Modal.error({
          content: '인증번호 발송에 실패했습니다.',
        });
      });
  };

  const verifyCode = () => {
    if (!email || !verificationCode) {
      Modal.error({
        content: '이메일과 인증번호를 입력하세요.',
      });
      return;
    }

    axios
      .post(`${url}/verifyCode`, null, {
        params: {
          email: email,
          certificationNum: verificationCode,
        },
      })
      .then((res) => {
        console.log('인증번호 확인 성공 : ', res.data);
        getUserInfo(email);
        // setIsConfirm(true);
      })
      .catch((error) => {
        console.error('인증번호 확인 실패 :', error);
        Modal.error({
          content: '인증번호 확인에 실패했습니다.',
        });
      });
  };

  const getUserInfo = (email) => {
    axios
      .post(`${url}/findUserByEmail`, { email: email })
      .then((personRes) => {
        const userData = personRes.data;

        axios
          .post(`${url}/findCompanyByEmail`, { email: email })
          .then((companyRes) => {
            const companyData = companyRes.data;
            const combinedData = [...userData, ...companyData];

            setUserList(combinedData);
            setIsConfirm(true);
          })
          .catch((error) => {
            console.error('회사 사용자 정보 조회 실패 : ', error);
            Modal.error({
              content: '회사 사용자 정보 조회에 실패했습니다.',
            });
          });
      })
      .catch((error) => {
        console.error('사용자 정보 조회 실패 : ', error);
        Modal.error({
          content: '사용자 정보 조회에 실패했습니다.',
        });
      });
  };

  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />
      <h2 className={styles.title}>아이디 찾기</h2>

      {/* 탭 */}
      <div className={styles.formBorder}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${isPhone ? styles.activeTab : ''}`}
            onClick={() => tabClick(true)}
          >
            휴대폰 번호로 찾기
          </button>
          <button
            className={`${styles.tabButton} ${!isPhone ? styles.activeTab : ''}`}
            onClick={() => tabClick(false)}
          >
            이메일로 찾기
          </button>
        </div>

        <div className={styles.formContainer}>
          {isConfirm ? (
            <div className={styles.confirmContainer}>
              <p className={styles.userCard}>
                입력하신 정보와 일치하는 아이디입니다.
              </p>
              {userList.map((user, index) => (
                <div key={index}>
                  <div className={styles.inputGroup}>
                    <span>아이디</span>
                    <input
                      type="text"
                      value={
                        user.provider
                          ? `소셜 회원가입 사용자 입니다.(${user.provider})`
                          : user.username
                      }
                      className={styles.input}
                      readOnly
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <span>가입일자</span>
                    <input
                      type="text"
                      value={
                        user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString('ko-KR')
                          : ''
                      }
                      className={styles.input}
                      readOnly
                    />
                  </div>
                  <hr className={styles.line} />
                </div>
              ))}
              <button
                className={styles.button}
                onClick={() => navigate('/login')}
              >
                로그인
              </button>
              <button
                className={styles.button}
                onClick={() => navigate('/searchPwd')}
              >
                비밀번호 찾기
              </button>
            </div>
          ) : (
            <>
              {isPhone ? (
                <div>
                  <div className={styles.inputGroup}>
                    <span>휴대폰 번호</span>
                    <input
                      type="text"
                      placeholder="휴대폰 번호를 입력하세요."
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={styles.input}
                    />
                    <button
                      className={styles.button}
                      // onClick={sendVerificationCode}
                    >
                      인증번호 발송
                    </button>
                  </div>
                  <div className={styles.inputGroup}>
                    <span>인증 번호</span>
                    <input
                      type="text"
                      placeholder="인증 번호를 입력하세요."
                      value={verificationCode}
                      // onChange={(e) => setVerificationCode(e.target.value)}
                      className={styles.input}
                    />
                    <button className={styles.button} onClick={confirmClick}>
                      확인
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.inputGroup}>
                    <span>이메일 주소</span>
                    <input
                      type="text"
                      placeholder="이메일을 입력하세요."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                    />
                    <button className={styles.button} onClick={sendEmail}>
                      인증번호 발송
                    </button>
                  </div>
                  <div className={styles.inputGroup}>
                    <span>인증 번호</span>
                    <input
                      type="text"
                      placeholder="인증 번호를 입력하세요."
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className={styles.input}
                    />
                    <button className={styles.button} onClick={verifyCode}>
                      확인
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* <div id="recaptcha-container"></div> */}
    </div>
  );
};
export default SearchId;
