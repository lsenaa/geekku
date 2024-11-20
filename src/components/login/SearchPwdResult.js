import loginLogo from '../../assets/images/login/loginLogo.png';
import styles from './Login.module.scss';

const SearchPwdResult = () => {
  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />
      <h2 className={styles.title}>비밀번호 재설정</h2>
      <div className={styles.searchPwd}>
        <div className={styles.inputGroup}>
          <span>
            새 비밀번호<b>*</b>
          </span>
          <input
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <span>
            비밀번호 확인<b>*</b>
          </span>
          <input
            type="password"
            placeholder="새로운 비밀번호를 한번 더 입력해주세요."
            className={styles.input}
          />
        </div>
        <button className={styles.button}>비밀번호 변경</button>
      </div>
    </div>
  );
};
export default SearchPwdResult;
