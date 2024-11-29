import loginLogo from '../../../assets/images/login/loginLogo.png';
import styles from '../Login.module.scss';

const SearchPwd = () => {
  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />
      <h2 className={styles.title}>비밀번호 찾기</h2>
      <div className={styles.searchPwd}>
        <span>비밀번호를 재설정 할 이메일을 입력해 주세요.</span>
        <span>입력된 메일로 자세한 안내를 보내드립니다.</span>
        <div className={styles.inputGroup}>
          <span>이메일</span>
          <input
            type="text"
            placeholder="이메일을 입력하세요."
            className={styles.input}
          />
        </div>
        <button className={styles.button}>인증번호 발송</button>
      </div>
    </div>
  );
};
export default SearchPwd;
