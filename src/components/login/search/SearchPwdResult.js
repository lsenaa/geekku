import loginLogo from 'assets/images/login/loginLogo.png';
import styles from '../Login.module.scss';
import { url } from 'lib/axios';
import { Modal } from 'antd';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom, tokenAtom } from 'store/atoms';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const SearchPwdResult = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const email = queryParams.get('email');
  const certificationCode = queryParams.get('certificationCode');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Modal.error({
        content: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      });
      return;
    }

    axios
      .post(`${url}/resetPwd`, {
        username,
        email,
        certificationCode,
        newPassword,
      })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        } else if (res.data.company) {
          setUser(res.data.company);
        }

        setToken(res.data.tokens);
        Modal.success({
          content: '비밀번호가 성공적으로 변경되었습니다.',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('비밀번호 변경 실패 :', error);
        Modal.error({
          content: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.',
        });
      });
  };

  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />
      <h2 className={styles.title}>비밀번호 재설정</h2>
      <div className={styles.searchPwd}>
        <div className={styles.inputGroup}>
          <span>
            새 비밀번호<b>*</b>
          </span>
          <input
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button className={styles.button} onClick={handleChangePassword}>
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};
export default SearchPwdResult;
