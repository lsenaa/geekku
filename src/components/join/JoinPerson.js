import styles from '../login/Login.module.scss';
import styles2 from './Join.module.scss';
import loginLogo from '../../assets/images/login/loginLogo.png';
import { url } from '../../lib/axios';
import { checkNickname } from 'components/join/utils/checkNickname';
import { checkDoubleId } from './utils/checkDoubleId';
import { useAgreements } from './utils/agreements';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const JoinPerson = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    email: '',
    nickname: '',
  });

  const [usernameChecked, setUsernameChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const { agreements, handleCheckboxChange, validateAgreements } =
    useAgreements();

  const navigate = useNavigate();

  const edit = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsernameChecked(false);
    }
    if (name === 'nickname') {
      setNicknameChecked(false);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckNickname = async () => {
    const isAvailable = await checkNickname(user.nickname, url);
    setNicknameChecked(isAvailable);
  };

  const handleCheckDoubleId = async () => {
    const isAvailable = await checkDoubleId(user.username, url);
    setUsernameChecked(isAvailable);
  };

  const submit = (e) => {
    e.preventDefault();

    // 필수 입력값 확인
    if (
      !user.username ||
      !user.name ||
      !user.password ||
      !user.phone ||
      !user.email
    ) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 닉네임 중복확인
    if (!nicknameChecked) {
      alert('닉네임 중복 확인을 눌러주세요.');
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

    //닉네임이 없으면 이름으로 설정
    if (!user.nickname) {
      user.nickname = user.name;
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
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('name', user.name);
    formData.append('phone', user.phone);
    formData.append('email', user.email);
    formData.append('nickname', user.nickname);

    axios
      .post(`${url}/joinPerson`, formData)
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

      <h3 className={styles2.title}>개인 회원가입</h3>
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
            placeholder=" 아이디를 입력해주세요."
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
            이름<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={edit}
            className={styles2.input2}
          />
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
            placeholder=" 영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요."
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
            placeholder=" 비밀번호를 한번 더 입력해주세요."
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

        <div className={styles2.inputGroup}>
          <span>닉네임</span>
          <br />
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={edit}
            placeholder=" 닉네임을 입력하지 않으시면 이름으로 설정됩니다."
            className={styles2.input1}
          />
          <button
            className={styles2.checkButton}
            onClick={handleCheckNickname}
            disabled={nicknameChecked}
          >
            {nicknameChecked ? '확인 완료' : '중복 확인'}
          </button>
        </div>
      </div>

      <div className={styles2.checkContainer}>
        <span className={styles2.checkboxGroup}>
          <input
            type="checkbox"
            name="ageConfirmed"
            onChange={handleCheckboxChange}
          />{' '}
          <span>
            만 14세 이상만 가입할 수 있습니다.<b>*</b>
          </span>
        </span>
        <span className={styles2.checkboxGroup}>
          <input
            type="checkbox"
            name="termsAccepted"
            onChange={handleCheckboxChange}
          />
          <span>
            이용약관 및 개인정보 수집에 동의합니다.
            <b>*</b>
          </span>
        </span>
      </div>

      <button className={styles2.button} onClick={submit}>
        회원가입
      </button>
    </div>
  );
};
export default JoinPerson;
