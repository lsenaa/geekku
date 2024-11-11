import loginLogo from '../../assets/images/login/loginLogo.png';
import checkRadio from '../../assets/images/join/CheckedRadioBtn.png'
import unCheckRadio from '../../assets/images/join/UncheckedRadioBtn.png'
import styles from "../login/Login.module.scss";
import styles2 from "./Join.module.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinModal from './JoinModal';

const JoinCompany = () => {
    const [isModal, setIsModal] = useState(false);
    const modalOpen = () => {
        setIsModal(true);
    };
    const modalClose = () => {
        setIsModal(false);
    };

    const navigate = useNavigate();

    return (
        <div className={styles.login}>
            <img src={loginLogo} alt="로그인로고" className={styles.logo} />

            <h3 className={styles2.title}>기업 회원가입</h3>
            <div>
                <span className={styles.checkRadio}><img src={checkRadio} alt="체크라디오" /><span>부동산</span></span>
                <span className={styles.checkRadio} onClick={() => navigate("/JoinInterior")}><img src={unCheckRadio} alt="언체크라디오" /><span>인테리어</span></span>
            </div>
            <hr className={styles.line} />

            <div className={styles2.joinForm}>
                <div className={styles2.inputGroup}>
                    <span>아이디<b>*</b></span><br />
                    <input type="text" placeholder="아이디를 입력해주세요." className={styles2.input1} />
                    <button className={styles2.checkButton}>중복확인</button>
                </div>

                <div className={styles2.inputGroup}>
                    <span>비밀번호<b>*</b></span><br />
                    <input type="text" placeholder="영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요." className={styles2.input2} />
                </div>

                <div className={styles2.inputGroup}>
                    <span>비밀번호 확인<b>*</b></span><br />
                    <input type="text" placeholder="비밀번호를 다시 입력해주세요." className={styles2.input2} />
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
                        <option value="" > 선택하세요</option>
                        <option value="gmail.com"> gmail.com</option>
                        <option value="naver.com"> naver.com</option>
                        <option value="daum.net"> daum.net</option>
                        <option value="직접 입력"> 직접 입력</option>
                    </select>
                </div>
            </div>

            <hr className={styles.line} />
            <h3 className={styles2.title}>부동산 기업 회원정보</h3>

            <div className={styles2.joinForm}>
                <div className={styles2.inputGroup}>
                    <input type="text" placeholder="조회 버튼으로 부동산 정보를 조회할 수 있습니다." className={styles2.input1} readOnly />
                    <button className={styles2.checkButton} onClick={modalOpen}>조회</button>
                </div>
                <JoinModal open={isModal} close={modalClose} />

                <div className={styles2.inputGroup}>
                    <span>중개등록 번호</span><br />
                    <input type="text" placeholder="41220-2016-100009" className={styles2.input2} readOnly />
                </div>
                <div className={styles2.inputGroup}>
                    <span>상호명</span><br />
                    <input type="text" placeholder="고덕홍길동공인중개사사무소" className={styles2.input2} readOnly />
                </div>
                <div className={styles2.inputGroup}>
                    <span>대표자명</span><br />
                    <input type="text" placeholder="송영선" className={styles2.input2} readOnly />
                </div>
                <div className={styles2.inputGroup}>
                    <span>주소</span><br />
                    <input type="text" placeholder="강원특별자치도 춘천시 안마산로 131 상가 1층 C-106호(퇴계동)" className={styles2.input2} readOnly />
                </div>
                <br />
                <div className={styles2.inputGroup}>
                    <span>사업자 등록 번호<b>*</b></span><br />
                    <input type="text" placeholder="" className={styles2.input1} />
                    <button className={styles2.checkButton}>인증</button>
                </div>
                <div className={styles2.inputGroup}>
                    <span>사업자 등록증 이미지</span><br />
                    <div className={styles2.imageUploadBox}>
                        <input type="file" className={styles2.imageInput} />
                        <label>사업자 등록증 이미지 첨부 (+)</label>
                    </div>
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
export default JoinCompany;