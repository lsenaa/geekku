import styles from 'components/login/Login.module.scss';
import styles2 from 'components/join/Join.module.scss';
import loginLogo from 'assets/images/login/loginLogo.png';
import { url } from 'lib/axios';
import { CheckNickname } from 'utils/CheckNickname';
import { CheckDoubleId } from 'utils/CheckDoubleId';
import { useAgreements } from 'utils/Agreements';
import { applyPhoneFormat } from 'utils/CheckPhoneNumber';

import axios from 'axios';
import { message, Modal } from 'antd';
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
  const [isPhonechecked, setIsPoneChecked] = useState(false);
  const [emailVaildated, setEmailValidated] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    agreements,
    handleCheckboxChange,
    validateAgreements,
    contextHolder: agreementsContextHolder,
  } = useAgreements();

  const navigate = useNavigate();

  const edit = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (name === 'name') {
      const regex = /[^ㄱ-횡a-zA-Z\s]/;
      if (regex.test(value)) {
        messageApi.open({
          type: 'warning',
          content: '이름에는 숫자나 특수문자를 포함할 수 없습니다.',
        });
        setUser((prevUser) => ({
          ...prevUser,
          name: '',
        }));
        return;
      }
    }

    if (name === 'username') {
      const regex = /^[a-zA-Z0-9]*$/;
      if (!regex.test(value)) {
        messageApi.open({
          type: 'warning',
          content: '아이디는 영어와 숫자만 입력 가능합니다.',
        });
        setUser((prevUser) => ({
          ...prevUser,
          username: '',
        }));
        return;
      }
      setUsernameChecked(false);
    }

    if (name === 'nickname') {
      setNicknameChecked(false);
    }

    if (name === 'phone') {
      const formattedPhone = applyPhoneFormat(value.replace(/[^0-9]/g, ''));
      setUser((prevUser) => ({
        ...prevUser,
        phone: formattedPhone,
      }));
      return;
    }

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckNickname = async () => {
    if (user.nickname.length < 2 || user.nickname.length > 20) {
      messageApi.open({
        type: 'warning',
        content: '닉네임은 2자 이상 20자 이하로 입력해주세요.',
      });
      return;
    }
    const isAvailable = await CheckNickname(user.nickname, url, messageApi);
    setNicknameChecked(isAvailable);
  };

  const handleCheckDoubleId = async () => {
    const isAvailable = await CheckDoubleId(user.username, url, messageApi);
    setUsernameChecked(isAvailable);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        messageApi.open({
          type: 'warning',
          content: '휴대폰 번호를 다시 입력해주세요.',
        });
      }
    }

    if (name === 'email') {
      if (!value) return;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        if (!emailVaildated) {
          messageApi.open({
            type: 'warning',
            content: '유효한 이메일 형식을 입력해주세요.',
          });
          setEmailValidated(false);
        }
      } else {
        setEmailValidated(true);
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();

    // 아이디 중복확인
    if (!usernameChecked) {
      messageApi.open({
        type: 'warning',
        content: '아이디 중복 확인을 눌러주세요.',
      });
      return;
    }

    // 닉네임 중복확인
    if (user.nickname && !nicknameChecked) {
      messageApi.open({
        type: 'warning',
        content: '닉네임 중복 확인을 눌러주세요.',
      });
      return;
    }

    //동의 체크버튼
    if (!validateAgreements()) {
      return;
    }

    //전화번호 최종 검증
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(user.phone)) {
      messageApi.open({
        type: 'warning',
        content: '휴대폰 번호를 다시입력해주세요.',
      });
      document.getElementById('phone').focus();
      return;
    }

    //비밀번호 검사
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      alert('영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.');
      return;
    }
    if (user.password !== user.confirmPassword) {
      messageApi.open({
        type: 'warning',
        content: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      });
      return;
    }

    // 이메일 유효성 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      messageApi.open({
        type: 'warning',
        content: '유효한 이메일 형식을 입력해주세요.',
      });
      return;
    }

    // 필수 입력값 확인
    if (
      !user.username.trim() ||
      !user.name.trim() ||
      !user.password.trim() ||
      !user.phone.trim() ||
      !user.email.trim()
    ) {
      messageApi.open({
        type: 'warning',
        content: '필수 항목을 모두 입력해주세요.',
      });
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
        Modal.success({
          content: '개인회원가입에 성공하였습니다.',
        });
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.login}>
      {contextHolder}
      {agreementsContextHolder}
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
            value={user.username}
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
            value={user.name}
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
            placeholder="숫자만 입력해주세요."
            onChange={edit}
            value={user.phone}
            maxLength={13}
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
            onBlur={handleBlur}
            value={user.email}
            className={styles2.input2}
          />
        </div>

        <div className={styles2.inputGroup}>
          <span>닉네임(선택)</span>
          <br />
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={edit}
            placeholder="닉네임은 2자 이상 20자 이하로 입력해주세요."
            maxLength={20}
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
        <label>
          <span className={styles2.checkboxGroup}>
            <input
              type="checkbox"
              name="ageConfirmed"
              onChange={handleCheckboxChange}
            />
            <span>
              만 14세 이상만 가입할 수 있습니다.<b>*</b>
            </span>
          </span>
        </label>
        <label>
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
        </label>
      </div>

      <button className={styles2.button} onClick={submit}>
        회원가입
      </button>
    </div>
  );
};
export default JoinPerson;
