import styles from '../../login/Login.module.scss';
const ModifyPwd = () => {
  return (
    <>
      <div className={styles.login}>
        <h2 className={styles.title}>비밀번호 재설정</h2>
      </div>
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
    </>
  );
};

export default ModifyPwd;
