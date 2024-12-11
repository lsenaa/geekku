import styles from '../../login/Login.module.scss';
import axios from 'axios';
import { axiosInToken, url } from 'lib/axios';
import { useState } from 'react';
import { Modal } from 'antd';
import { useAtom } from 'jotai';
import { userAtom, tokenAtom } from 'store/atoms';
import { useNavigate } from 'react-router';

const ModifyPwd = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  const navigate = useNavigate();

  const handleChangePassword = () => {
    if (newPassword == currentPassword) {
      Modal.error({
        content: '현재 비밀번호와 같은 비밀번호로 변경할 수 없습니다.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Modal.error({
        content: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      });
      return;
    }

    const typeEndPoint =
      user.role === 'ROLE_COMPANY'
        ? `${url}/company/changePwd`
        : `${url}/user/changePwd`;

    axiosInToken(token)
      .post(typeEndPoint, { currentPassword, newPassword })
      .then((res) => {
        if (res.headers.authorization !== null) {
          setToken(res.headers.authorization);
        }
        Modal.success({
          content: '비밀번호가 변경되었습니다.',
        });
        if (res.data.token) {
          setToken(res.data.token);
        }
        if (user.type === 'user') {
          navigate('/mypage/person/info');
        } else if (user.type === 'estate') {
          navigate('/mypage/estate/info');
        } else {
          navigate('/mypage/interior/info');
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          Modal.error({
            content: '현재 비밀번호가 일치하지 않습니다.',
          });
          return;
        }
        if (err.response.status === 401) {
          setUser(null);
          setToken(null);
          navigate('/login');
        }
      });
  };
  return (
    <div className={styles.searchPwd}>
      {user.provider ? (
        <p>
          소셜 로그인 사용자는 비밀번호를 현재페이지에서 변경 할 수 없습니다.
        </p>
      ) : (
        <>
          <div className={styles.inputGroup}>
            <span>
              현재 비밀번호<b>*</b>
            </span>
            <input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.input}
            />
          </div>
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
        </>
      )}
    </div>
  );
};

export default ModifyPwd;
