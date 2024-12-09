import loginLogo from 'assets/images/login/loginLogo.png';
import styles from '../Login.module.scss';
import { url } from 'lib/axios';
import { Modal, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatPhoneNumber } from 'utils/CheckPhoneNumber';
import axios from 'axios';

const SearchId = () => {
  const [isPhone, setIsPhone] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  //이메일 인증코드 보내기
  const sendEmail = () => {
    if (!email) {
      Modal.error({ content: '이메일 주소를 입력하세오.' });
      return;
    }
    setIsLoading(true);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('인증번호 발송 실패 : ', error);
        Modal.error({
          content: '인증번호 발송에 실패했습니다.',
        });
        setIsLoading(false);
      });
  };

  //휴대폰 인증코드 보내기
  const sendSms = () => {
    if (!phoneNumber) {
      Modal.error({
        content: '휴대폰 번호를 입력하세요.',
      });
      return;
    }
    setIsLoading(true);

    axios
      .post(`${url}/sendSms`, null, {
        params: {
          phone: phoneNumber,
        },
      })
      .then((res) => {
        Modal.success({
          content:
            '인증번호가 발송되었습니다. 입력하신 휴대폰 번호를 확인해주세요.',
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('인증번호 발송 실패 : ', error);
        Modal.error({
          content: '인증번호 발송에 실패했습니다.',
        });
        setIsLoading(false);
      });
  };

  //이메일 인증코드 확인
  const verifyEmail = () => {
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
      })
      .catch((error) => {
        console.error('인증번호 확인 실패 :', error);
        Modal.error({
          content: '인증번호 확인에 실패했습니다.',
        });
      });
  };

  // 휴대폰 인증 코드 확인
  const verifySms = () => {
    if (!phoneNumber || !verificationCode) {
      Modal.error({
        content: '휴대폰 번호와 인증번호를 입력하세요.',
      });
      return;
    }

    axios
      .post(`${url}/verifySms`, null, {
        params: {
          phone: phoneNumber,
          certificationCode: verificationCode,
        },
      })
      .then((res) => {
        <Spin />;
        console.log('인증번호 확인 성공 : ', res.data);
        getUserInfoByPhone(phoneNumber);
      })
      .catch((error) => {
        console.error('인증번호 확인 실패 :', error);
        Modal.error({
          content: '인증번호 확인에 실패했습니다.',
        });
      });
  };

  // 이메일로 사용자 정보 가져오기
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

  // 휴대폰 번호로 사용자 정보 가져오기
  const getUserInfoByPhone = (phone) => {
    axios
      .post(`${url}/findUserByPhone`, { phone: phone })
      .then((personRes) => {
        const userData = personRes.data;

        axios
          .post(`${url}/findCompanyByPhone`, { phone: phone })
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

  // 휴대폰 번호 입력 시 포맷 적용
  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setPhoneNumber(formattedPhoneNumber);
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
                      name="phone"
                      placeholder="회원가입시 등록했던 휴대폰 번호를 입력하세요."
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      maxLength={13}
                      className={styles.input}
                    />
                    <button className={styles.button} onClick={sendSms}>
                      인증번호 발송
                    </button>
                    {isLoading && (
                      <div>
                        <Spin />
                      </div>
                    )}
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
                    <button className={styles.button} onClick={verifySms}>
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
                    {isLoading && (
                      <div>
                        <Spin />
                      </div>
                    )}
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
                    <button className={styles.button} onClick={verifyEmail}>
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
