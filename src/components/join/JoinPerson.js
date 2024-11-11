import styles from '../login/Login.module.scss';
import styles2 from "./Join.module.scss";
import loginLogo from '../../assets/images/login/loginLogo.png';

const JoinPerson = () => {
    return (
        <div className={styles.login}>
            <img src={loginLogo} alt="로그인로고" className={styles.logo} />

            <h3 className={styles2.title}>개인 회원가입</h3>
            <hr className={styles.line} />

            <div className={styles2.joinForm}>

                <div className={styles2.inputGroup}>
                    <span>아이디<b>*</b></span><br />
                    <input type="text" placeholder=" 아이디를 입력해주세요." className={styles2.input1} />
                    <button className={styles2.checkButton}>중복확인</button>
                </div>

                <div className={styles2.inputGroup}>
                    <span>이름<b>*</b></span><br />
                    <input type="text" className={styles2.input2} />
                </div>

                <div className={styles2.inputGroup}>
                    <span>비밀번호<b>*</b></span><br />
                    <input type="text" placeholder=" 영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요." className={styles2.input2} />
                </div>

                <div className={styles2.inputGroup}>
                    <span>비밀번호 확인<b>*</b></span><br />
                    <input type="text" placeholder=" 비밀번호를 다시 입력해주세요." className={styles2.input2} />
                </div>

                <div className={styles2.inputGroup}>
                    <span>휴대폰 번호<b>*</b></span><br />
                    <input type="text" className={styles2.input2} />
                </div>

                <div className={styles2.inputGroup}>
                    <span>이메일<b>*</b></span><br />
                    <input type="text" className={styles2.input3} />
                    <span>&nbsp;&nbsp;@&nbsp;&nbsp;</span>
                    <select className={styles2.input4}>
                        <option value=" " > 선택하세요</option>
                        <option value="gmail.com"> gmail.com</option>
                        <option value="naver.com"> naver.com</option>
                        <option value="daum.net"> daum.net</option>
                        <option value="직접 입력"> 직접 입력</option>
                    </select>
                </div>

                <div className={styles2.inputGroup}>
                    <span>닉네임</span><br />
                    <input type="text" placeholder=" 닉네임을 입력하지 않으시면 이름으로 설정됩니다." className={styles2.input1} />
                    <button className={styles2.checkButton}>중복확인</button>
                </div>

            </div>

            <div className={styles2.checkContainer}>
                <span><input type="checkbox" /> 만 14세 이상만 가입할 수 있습니다.<b>*</b></span>
                <span><input type="checkbox" /> 이용약관 및 개인정보 수집에 동의합니다.<b>*</b></span>
            </div>

            <button className={styles2.button}>회원가입</button>
        </div>
    )
}
export default JoinPerson;