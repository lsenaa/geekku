import styles from '../../login/Login.module.scss';
import axios from 'axios';
import { url } from 'lib/axios';
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

    axios
      .post(
        typeEndPoint,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
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
        console.error('비밀번호 변경 실패 :', err);
        Modal.error({
          content: '비밀번호 변경에 실패했습니다.',
        });
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
