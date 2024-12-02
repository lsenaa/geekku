import loginLogo from 'assets/images/login/loginLogo.png';
import styles from '../Login.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const SearchId = () => {
  const [isPhone, setIsPhone] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
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
              <p>입력하신 정보와 일치하는 아이디입니다.</p>
              <div className={styles.inputGroup}>
                <span>아이디</span>
                <input
                  type="text"
                  value="kosta8888"
                  className={styles.input}
                  readOnly
                />
              </div>
              <div className={styles.inputGroup}>
                <span>가입일자</span>
                <input
                  type="text"
                  value="2024-10-24"
                  className={styles.input}
                  readOnly
                />
              </div>
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
                    <button className={styles.button}>인증번호 발송</button>
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
                    <button className={styles.button}>인증번호 발송</button>
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
                    <button className={styles.button} onClick={confirmClick}>
                      확인
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchId;
