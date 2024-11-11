import 'bootstrap/dist/css/bootstrap.min.css';
import loginLogo from '../../assets/images/login/loginLogo.png';
import kakaoIcon from '../../assets/images/login/kakao_login_Btn.png';
import naverIcon from '../../assets/images/login/naver_login_Btn.png';
import googleIcon from '../../assets/images/login/google_login_Btn.png';
import styles from "./Login.module.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);
    const toggleSwitch = () => setIsChecked(!isChecked);
    const navigate = useNavigate();

    return (
        <div className={styles.login}>
            <img src={loginLogo} alt="로그인로고" className={styles.logo} />

            <div className={styles.toggleContainer}>
                <div className="form-check form-switch">
                    <input type="checkbox" className={`form-check-input ${styles.toggle}`}
                        checked={isChecked} onChange={toggleSwitch} />
                </div>
                <label className={styles.toggleLabel}>
                    {isChecked ? '[기업]' : '[개인]'}
                </label>
            </div>

            <div>
                <input type="text" placeholder="아이디를 입력하세요." className={styles.input} />
                <input type="password" placeholder="비밀번호를 입력하세요." className={styles.input} />
                <br /><br />
                <button className={styles.button}>로그인</button>
                <button className={styles.button} onClick={() => navigate("/JoinPerson")}>회원가입</button>
                <button className={styles.button} onClick={() => navigate("/JoinCompany")}>기업 회원가입</button>
            </div>

            <div className={styles.divider1}>
                <a href="/" className={styles.divider1a}>아이디를 잊으셨나요?</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="/" className={styles.divider1a}>비밀번호를 잊으셨나요?</a>
            </div>

            <hr className={styles.line} />
            {
                !isChecked &&
                <div className={styles.divider2}>
                    SNS로 간편 로그인 / 회원가입
                    <div className={styles.iconContainer}>
                        <img src={kakaoIcon} alt="카카오 로그인" className={styles.icon} />
                        <img src={naverIcon} alt="네이버 로그인" className={styles.icon} />
                        <img src={googleIcon} alt="구글 로그인" className={styles.icon} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Login;