import loginLogo from '../../assets/images/login/loginLogo.png';
import styles from './Login.module.scss';

const SearchId = () => {
  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />
    </div>
  );
};
export default SearchId;
