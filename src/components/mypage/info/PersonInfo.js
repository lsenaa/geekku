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
  const [isSocial, setIsSocial] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [emailVaildated, setEmailValidated] = useState(false);

  useEffect(() => {
    setIsSocial(user.provider);
  }, [user]);

  const edit = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formattedPhone = applyPhoneFormat(value);
      setMyUser((prevMyUser) => ({
        ...prevMyUser,
        [name]: formattedPhone || value,
      }));
      return;
    }

    if (name === 'name') {
      const regex = /[^ㄱ-횡a-zA-Z\s]/;
      if (regex.test(value)) {
        Modal.info({
          content: '이름에는 숫자나 특수문자를 포함할 수 없습니다.',
        });
        return;
      }
      setUser({ ...myUser, [name]: value });
    }

    if (name === 'nickname') {
      setNicknameChecked(false);
    }

    setMyUser({ ...myUser, [name]: value });
  };

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        Modal.info({
          content: '휴대폰 번호를 다시 입력해주세요.',
        });
      }
    }
    if (name === 'email') {
      if (!value) return;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        if (!emailVaildated) {
          Modal.info({
            content: '유효한 이메일 형식을 입력해주세요.',
          });
          setEmailValidated(false);
        }
      } else {
        setEmailValidated(true);
      }
    }

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

    // 닉네임 중복확인
    if (myUser.nickname && !nicknameChecked) {
      Modal.info({
        content: '닉네임 중복 확인을 눌러주세요.',
      });
      return;
    }

    //전화번호 최종 검증
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(myUser.phone)) {
      Modal.info({
        content: '휴대폰 번호를 다시입력해주세요.',
      });
      document.getElementById('phone').focus();
      return;
    }

    // 이메일 유효성 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(myUser.email)) {
      Modal.info({
        content: '유효한 이메일 형식을 입력해주세요.',
      });
      return;
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
  const handleCheckNickname = async () => {
    if (myUser.nickname.length < 2 || myUser.nickname.length > 20) {
      Modal.info({
        content: '닉네임은 2자 이상 20자 이하로 입력해주세요.',
      });
      return;
    }
    const isAvailable = await CheckNickname(myUser.nickname, url);
    setNicknameChecked(isAvailable);
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
                readOnly={isSocial}
              />
              {isSocial ? (
                ''
              ) : (
                <img
                  src={plusIcon}
                  className={styles.plusIcon}
                  onClick={imageUpdate}
                />
              )}
            </a>
            <input
              type="file"
              id="profileImageUpdate"
              style={{ display: 'none' }}
              onChange={fileChange}
              disabled={isSocial}
            />
          </div>
          <div className={styles.inputGroup}>
            <span>닉네임</span>
            <br />
            <input
              type="text"
              name="nickname"
              onChange={edit}
              value={myUser.nickname}
              maxLength={20}
              className={styles.input1}
              readOnly={isSocial}
            />
            <button
              className={styles.checkButton}
              onClick={handleCheckNickname}
              disabled={nicknameChecked}
            >
              {nicknameChecked ? '확인 완료' : '중복 확인'}
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
              value={myUser.name}
              className={styles.input2}
              readOnly
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
              onChange={edit}
              onBlur={handleBlur}
              value={myUser.email}
              className={styles.input2}
              readOnly={isSocial}
            />
          </div>
          {isSocial ? (
            <span className={styles.isSocial}>
              소셜 로그인 회원은 전화번호 수정만 가능합니다.
            </span>
          ) : (
            ''
          )}
          <button className={styles.button} onClick={submit}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
