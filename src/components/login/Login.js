import loginLogo from '../../assets/images/login/loginLogo.png';
import kakaoIcon from '../../assets/images/login/kakao_login_Btn.png';
import naverIcon from '../../assets/images/login/naver_login_Btn.png';
import googleIcon from '../../assets/images/login/google_login_Btn.png';
import styles from './Login.module.scss';
import ToggleSwitch from './ToggleSwitch';
import { url } from '../../config';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, tokenAtom } from '../../store/atoms';
import axios from 'axios';
import axiosToken from 'axios';

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [member, setMember] = useState({ username: '', password: '' });

  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  const navigate = useNavigate();
  const handleToggle = (checked) => setIsChecked(checked);

  const edit = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const submit = () => {
    const formData = new FormData();
    formData.append('username', member.username);
    formData.append('password', member.password);

    axios
      .post(`${url}/login`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const token = res.headers.authorization;
        setToken(token);

        const typeEndPoint = isChecked
          ? '/company/companyInfo'
          : '/user/userInfo';

        //로그인 성공 후 사용자 정보 가져오기
        axios
          .get(`${url}${typeEndPoint}`, {
            headers: { Authorization: token },
          })
          .then((res) => {
            setUser(res.data);

            if (isChecked) {
              alert('로그인 성공, [기업]사용자');
              console.log(member);
            } else {
              alert('로그인 성공, [개인]사용자');
              console.log(member);
            }

            navigate('/');
          })
          .catch((err) => {
            console.error(`${isChecked ? '기업' : '개인'}정보 가져오기 실패`);
            alert(`${isChecked ? '기업' : '개인'} 사용자가 없습니다`);
          });
      })
      .catch((err) => {
        console.error('로그인 실패 : ', err);
        alert('로그인 실패');
      });
  };

  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />

      {/* 토글 */}
      <div className={styles.toggleContainer}>
        <ToggleSwitch isChecked={isChecked} onToggle={handleToggle} />
      </div>

      <div>
        <input
          type="text"
          name="username"
          id="username"
          onChange={edit}
          placeholder="아이디를 입력하세요."
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={edit}
          placeholder="비밀번호를 입력하세요."
          className={styles.input}
        />
        <br />
        <br />
        <button className={styles.button} onClick={submit}>
          로그인
        </button>
        <button
          className={styles.button}
          onClick={() => navigate('/JoinPerson')}
        >
          회원가입
        </button>
        <button
          className={styles.button}
          onClick={() => navigate('/JoinCompany')}
        >
          기업 회원가입
        </button>
      </div>

      <div className={styles.divider1}>
        <a href="/searchId" className={styles.divider1a}>
          아이디를 잊으셨나요?
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="/searchPwd" className={styles.divider1a}>
          비밀번호를 잊으셨나요?
        </a>
      </div>

      <hr className={styles.line} />
      {!isChecked && (
        <div className={styles.divider2}>
          SNS로 간편 로그인 / 회원가입
          <div className={styles.iconContainer}>
            <img src={kakaoIcon} alt="카카오 로그인" className={styles.icon} />
            <img src={naverIcon} alt="네이버 로그인" className={styles.icon} />
            <img src={googleIcon} alt="구글 로그인" className={styles.icon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
