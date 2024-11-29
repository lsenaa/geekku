import loginLogo from '../../assets/images/login/loginLogo.png';
import checkRadio from '../../assets/images/join/CheckedRadioBtn.png';
import unCheckRadio from '../../assets/images/join/UncheckedRadioBtn.png';
import styles from '../login/Login.module.scss';
import styles2 from './Join.module.scss';
import { url } from '../../lib/axios';
import { checkDoubleId } from './checkDoubleId';
import { useAgreements } from './agreements';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinInterior = () => {
  const [user, setUser] = useState({
    type: 'interior',
    username: '',
    password: '',
    phone: '',
    email: '',
    companyNumber: '',
    ceoName: '',
    companyName: '',
    companyAddress: '',
    companyCertificationImage: '',
  });
  const [usernameChecked, setUsernameChecked] = useState(false);
  const { agreements, handleCheckboxChange, validateAgreements } =
    useAgreements();

  const edit = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsernameChecked(false);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckDoubleId = async () => {
    const isAvailable = await checkDoubleId(user.username, url);
    setUsernameChecked(isAvailable);
  };

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    // 필수 입력값 확인
    if (
      !user.username ||
      !user.password ||
      !user.phone ||
      !user.email ||
      !user.companyNumber ||
      !user.companyName ||
      !user.ceoName
    ) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 아이디 중복확인
    if (!usernameChecked) {
      alert('아이디 중복 확인을 눌러주세요.');
      return;
    }

    //동의 체크버튼
    if (!validateAgreements()) {
      return;
    }

    //비밀번호 검사
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passwordRegex.test(user.password)) {
    //   alert('영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.');
    //   return;
    // }
    if (user.password !== user.confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    let formData = new FormData();
    formData.append('type', user.type);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('phone', user.phone);
    formData.append('email', user.email);
    formData.append('companyNumber', user.companyNumber);
    formData.append('ceoName', user.ceoName);
    formData.append('companyName', user.companyName);
    formData.append('companyAddress', user.companyAddress);

    axios
      .post(`${url}/joinCompany`, formData)
      .then((res) => {
        console.log(res.data);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />

      <h3 className={styles2.title}>기업 회원가입</h3>
      <div
        className={styles2.radioContainer}
        onClick={() => navigate('/JoinCompany')}
      >
        <div className={styles2.unCheckRadio}>
          <img src={unCheckRadio} alt="언체크라디오" />
          <p>부동산</p>
        </div>
        <div className={styles2.checkRadio}>
          <img src={checkRadio} alt="체크라디오" />
          <b>인테리어</b>
        </div>
      </div>
      <hr className={styles.line} />

      <div className={styles2.joinForm}>
        <div className={styles2.inputGroup}>
          <span>
            아이디<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={edit}
            placeholder="아이디를 입력해주세요."
            className={styles2.input1}
          />
          <button
            className={styles2.checkButton}
            onClick={handleCheckDoubleId}
            disabled={usernameChecked}
          >
            {usernameChecked ? '확인 완료' : '중복 확인'}
          </button>
        </div>

        <div className={styles2.inputGroup}>
          <span>
            비밀번호<b>*</b>
          </span>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={edit}
            placeholder="영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요."
            className={styles2.input2}
          />
        </div>

        <div className={styles2.inputGroup}>
          <span>
            비밀번호 확인<b>*</b>
          </span>
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={edit}
            placeholder="비밀번호를 다시 입력해주세요."
            className={styles2.input2}
          />
        </div>

        <div className={styles2.inputGroup}>
          <span>
            휴대폰 번호<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={edit}
            className={styles2.input2}
          />
        </div>

        <div className={styles2.inputGroup}>
          <span>
            이메일<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={edit}
            className={styles2.input2}
          />
        </div>
      </div>

      <hr className={styles.line} />
      <h3 className={styles2.title}>인테리어 기업 회원정보</h3>

      <div className={styles2.joinForm}>
        <div className={styles2.inputGroup}>
          <span>
            사업자 등록 번호<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="companyNumber"
            id="companyNumber"
            onChange={edit}
            placeholder=""
            className={styles2.input1}
          />
          <button className={styles2.checkButton}>인증</button>
        </div>
        <div className={styles2.inputGroup}>
          <span>
            대표자명<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="ceoName"
            id="ceoName"
            onChange={edit}
            placeholder=""
            className={styles2.input2}
          />
        </div>
        <div className={styles2.inputGroup}>
          <span>
            사업장명<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="companyName"
            id="companyName"
            onChange={edit}
            placeholder=""
            className={styles2.input2}
          />
        </div>
        <div className={styles2.inputGroup}>
          <span>사업장 주소 (선택)</span>
          <br />
          <input
            type="text"
            name="companyAddress"
            id="companyAddress"
            onChange={edit}
            placeholder=""
            className={styles2.input1}
          />
          <button className={styles2.checkButton}>찾기</button>
        </div>
        <div className={styles2.inputGroup}>
          <span>사업자 등록증 이미지 (선택)</span>
          <br />
          <div className={styles2.imageUploadBox}>
            <input
              type="file"
              name="companyCertificationImage"
              id="companyCertificationImage"
              className={styles2.imageInput}
            />
            <label>사업자 등록증 이미지 첨부 (+)</label>
          </div>
        </div>
      </div>

      <div className={styles2.checkContainer}>
        <span>
          <input
            type="checkbox"
            name="ageConfirmed"
            onChange={handleCheckboxChange}
          />{' '}
          만 14세 이상만 가입할 수 있습니다.<b>*</b>
        </span>
        <span>
          <input
            type="checkbox"
            name="termsAccepted"
            onChange={handleCheckboxChange}
          />{' '}
          이용약관 및 개인정보 수집에 동의합니다.
          <b>*</b>
        </span>
      </div>

      <button className={styles2.button} onClick={submit}>
        회원가입
      </button>
    </div>
  );
};
export default JoinInterior;
