import loginLogo from 'assets/images/login/loginLogo.png';
import styles from '../Login.module.scss';
import { url } from 'lib/axios';
import { useState } from 'react';
import { Modal, Spin } from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SearchPwd = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = () => {
    if (!username || !email) {
      Modal.error({
        content: '아이디와 이메일을 모두 입력해주세요.',
      });
      return;
    }
    setIsLoading(true);

    axios
      .post(`${url}/sendPwdReset`, null, {
        params: {
          username: username,
          email: email,
        },
      })
      .then((res) => {
        Modal.success({
          content: '재설정 이메일이 발송되었습니다. 이메일을 확인해주세요.',
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('이메일 발송 실패 :', error);
        Modal.error({
          content: '재설정 이메일 발송에 실패했습니다. 다시 시도해주세요.',
        });
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.login}>
      <img src={loginLogo} alt="로그인로고" className={styles.logo} />
      <h2 className={styles.title}>비밀번호 찾기</h2>
      <div className={styles.searchPwd}>
        <span>회원가입 시 입력한 아이디와 이메일을 입력해주세요.</span>
        <span>입력된 메일로 자세한 안내를 보내드립니다.</span>
        <div className={styles.inputGroup}>
          <span>아이디</span>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <span>이메일</span>
          <input
            type="text"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <button className={styles.button} onClick={handleSendEmail}>
          이메일 발송
        </button>
        {isLoading && (
          <div>
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPwd;
