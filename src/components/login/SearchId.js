import loginLogo from '../../assets/images/login/loginLogo.png';
import styles from './Login.module.scss';
import { useState } from 'react';

const SearchId = () => {
  const [isPhone, setIsPhone] = useState(true);
  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />
      <h2 className={styles.title}>아이디 찾기</h2>

      {/* 탭 */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${isPhone ? styles.activeTab : ''}`}
          onClick={() => setIsPhone(true)}
        >
          휴대폰 번호로 찾기
        </button>
        <button
          className={`${styles.tabButton} ${!isPhone ? styles.activeTab : ''}`}
          onClick={() => setIsPhone(false)}
        >
          이메일로 찾기
        </button>
      </div>

      <div className={styles.formContainer}>
        {isPhone ? (
          <>
            <span>휴대폰 번호</span>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="휴대폰 번호를 입력하세요."
                className={styles.input}
              />
              <button className={styles.button}>인증번호 발송</button>
            </div>
            <span>인증 번호</span>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="인증 번호를 입력하세요."
                className={styles.input}
              />
              <button className={styles.button}>확인</button>
            </div>
          </>
        ) : (
          <>
            <span>이메일 주소</span>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="이메일을 입력하세요."
                className={styles.input}
              />
              <button className={styles.button}>인증번호 발송</button>
            </div>
            <span>인증 번호</span>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="인증 번호를 입력하세요."
                className={styles.input}
              />
              <button className={styles.button}>확인</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default SearchId;
