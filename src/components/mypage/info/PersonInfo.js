import styles from './PersonInfo.module.scss';
import plusIcon from '../../../assets/images/mypage/plusIcon.png';
import profileImgAdd from '../../../assets/images/mypage/profileImgAdd.png';
import { url } from '../../../lib/axios';
import { checkNickname } from 'components/join/checkNickname';

import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, tokenAtom } from '../../../store/atoms';
import axios from 'axios';
import { redirect } from 'react-router';

const PersonInfo = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [profileImage, setProfileImage] = useState(null);
  const [myUser, setMyUser] = useState(user);

  const edit = (e) => {
    const { name, value } = e.target;
    setMyUser({ ...myUser, [name]: value });
  };

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  const submit = () => {
    let formData = new FormData();
    formData.append('nickname', myUser.nickname);
    formData.append('phone', myUser.phone);
    formData.append('email', myUser.email);
    console.log(profileImage);
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
        console.log(res.data);
        setToken(res.data.token);
        setUser(res.data.user);
        alert('회원정보가 수정되었습니다.');
        redirect('${url}/user/updateUserInfo');
      })
      .catch((err) => {
        console.log('회원 정보 수정 실패 ');
        alert('회원 정보 수정에 실패했습니다.');
        redirect('${url}/user/updateUserInfo');
      });
  };
  const handleCheckNickname = () => {
    checkNickname(myUser.nickname, url);
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
        setUser((prevUser) => ({
          ...prevUser,
          profileImageStr: reader.result.split(',')[1],
        }));
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
                  myUser.profileImageStr
                    ? `data:image/png;base64,${myUser.profileImageStr}`
                    : profileImgAdd
                }
                className={styles.imageFile}
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
              // value={myUser.phone}
              onChange={edit}
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
