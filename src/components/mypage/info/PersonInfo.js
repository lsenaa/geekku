import plusIcon from 'assets/images/mypage/plusIcon.png';
import profileImgAdd from 'assets/images/mypage/profileImgAdd.png';
import styles from './PersonInfo.module.scss';
import axios from 'axios';
import { url } from 'lib/axios';
import { Modal } from 'antd';
import { redirect } from 'react-router';
import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, tokenAtom } from 'store/atoms';
import { CheckNickname } from 'utils/CheckNickname';
import { applyPhoneFormat } from 'utils/CheckPhoneNumber';

const PersonInfo = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [myUser, setMyUser] = useState(user);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const edit = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/\D+/g, '');
      if (cleaned.length > 11) {
        return;
      }
      setUser({ ...user, phone: cleaned });
    } else {
      setUser({ ...user, [name]: value });
    }
    setMyUser({ ...myUser, [name]: value });
  };

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    applyPhoneFormat(name, value, setUser, user);
  };

  const submit = () => {
    let formData = new FormData();
    formData.append('nickname', myUser.nickname);
    formData.append('phone', myUser.phone);
    formData.append('email', myUser.email);

    if (profileImage != null) {
      formData.append('file', profileImage);
    }

    axios
      .post(`${url}/user/updateUserInfo`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.user);
        Modal.success({
          content: '회원정보가 수정되었습니다.',
        });
        redirect('${url}/user/updateUserInfo');
      })
      .catch((err) => {
        console.log('회원 정보 수정 실패 ');
        Modal.error({
          content: '회원 정보 수정에 실패했습니다.',
        });
        redirect('${url}/user/updateUserInfo');
      });
  };
  const handleCheckNickname = () => {
    CheckNickname(myUser.nickname, url);
  };

  const imageUpdate = () => {
    document.getElementById('profileImageUpdate').click();
  };

  const fileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <div className={styles.profileForm}>
          <div className={styles.profileImg}>
            <a href="#">
              <img
                src={
                  previewImage
                    ? previewImage
                    : myUser.profileImageStr
                      ? `data:image/png;base64,${myUser.profileImageStr}`
                      : profileImgAdd
                }
                className={styles.imageFile}
                onClick={imageUpdate}
              />
              <img
                src={plusIcon}
                className={styles.plusIcon}
                onClick={imageUpdate}
              />
            </a>
            <input
              type="file"
              id="profileImageUpdate"
              style={{ display: 'none' }}
              onChange={fileChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <span>닉네임</span>
            <br />
            <input
              type="text"
              name="nickname"
              onChange={edit}
              // value={myUser.nickname}
              placeholder={myUser.nickname}
              className={styles.input1}
            />
            <button
              className={styles.checkButton}
              onClick={handleCheckNickname}
            >
              중복확인
            </button>
          </div>
          <div className={styles.inputGroup}>
            <span>
              이름<b>*</b>
            </span>
            <br />
            <input
              type="text"
              name="name"
              placeholder={myUser.name}
              readOnly
              className={styles.input2}
            />
          </div>
          <div className={styles.inputGroup}>
            <span>
              휴대폰번호<b>*</b>
            </span>
            <br />
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={edit}
              onBlur={handleBlur}
              value={myUser.phone}
              maxLength={13}
              placeholder={myUser.phone}
              className={styles.input2}
            />
          </div>
          <div className={styles.inputGroup}>
            <span>
              이메일<b>*</b>
            </span>
            <br />
            <input
              type="text"
              name="email"
              // value={myUser.email}
              onChange={edit}
              placeholder={myUser.email}
              className={styles.input2}
            />
          </div>
          <button className={styles.button} onClick={submit}>
            완료
          </button>

          <a href="/" className={styles.removeUser}>
            회원탈퇴
          </a>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
