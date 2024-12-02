import styles from './PersonInfo.module.scss';
import styles2 from 'components/join/Join.module.scss';
import plusIcon from 'assets/images/mypage/plusIcon.png';
import profileImgAdd from 'assets/images/mypage/profileImgAdd.png';
import axios from 'axios';
import { url } from 'lib/axios';
import { Modal } from 'antd';
import { redirect } from 'react-router';
import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, tokenAtom } from 'store/atoms';
import {
  formatCompanyNum,
  verifyCompanyNum,
} from 'components/join/utils/CompanyNumCheck';
import { AddressModal } from 'components/join/modals/AddressModal';

const CompanyInfo = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [myUser, setMyUser] = useState(user);
  const [profileImage, setProfileImage] = useState(null);
  const [certificationImage, setCertificationImage] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const edit = (e) => {
    const { name, value } = e.target;
    setMyUser({ ...myUser, [name]: value });
  };

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  const submit = () => {
    let formData = new FormData();
    formData.append('companyAddress', myUser.companyAddress);
    formData.append('phone', myUser.phone);
    formData.append('email', myUser.email);
    //console.log(profileImage);
    if (profileImage != null) {
      formData.append('file', profileImage);
    }
    //console.log(certificationImage);
    if (certificationImage != null) {
      formData.append('certificationFile', certificationImage);
    }

    axios
      .post(`${url}/company/updateCompanyInfo`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        //console.log('서버 응답 데이터 :', res.data);
        setUser(res.data.company);
        setMyUser(res.data.company);
        setToken(res.data.token);
        Modal.success({
          content: '회원정보가 수정되었습니다.',
        });
        redirect('${url}/company/companyInfo');
      })
      .catch((err) => {
        console.error('회원 정보 수정 실패 :', err);
        Modal.error({
          content: '회원 정보 수정에 실패했습니다.',
        });
        redirect('${url}/company/companyInfo');
      });
  };

  //onsole.log(`${url}${user.certificationImagePath}`);
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

  const handleVerifyCompanyNumber = () => {
    const formattedNum = formatCompanyNum(user.companyNumber);
    verifyCompanyNum(user.companyNumber, setUser, user);
  };

  const handleAddressSelect = (data) => {
    const address = data.address;
    setUser((prevUser) => ({ ...prevUser, companyAddress: address }));
    setIsAddressModalOpen(false);
  };

  const handleCertificationFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setCertificationImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setMyUser((prevUser) => ({
          ...prevUser,
          certificationImagePreview: reader.result,
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
                    ? `data:image/png;base64, ${myUser.profileImageStr}`
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
            <span>
              사업장명<b>*</b>
            </span>
            <br />
            <input
              type="text"
              value={user.companyName}
              className={styles.input2}
              readOnly
            />
          </div>
          <div className={styles.inputGroup}>
            <span>
              대표자명<b>*</b>
            </span>
            <br />
            <input
              type="text"
              value={user.ceoName}
              className={styles.input2}
              readOnly
            />
          </div>
          {user.type === 'estate' ? (
            <div className={styles.inputGroup}>
              <span>
                중개업등록번호<b>*</b>
              </span>
              <br />
              <input
                type="text"
                value={user.estateNumber}
                className={styles.input2}
                readOnly
              />
            </div>
          ) : (
            ''
          )}
          <div className={styles.inputGroup}>
            <span>주소</span>
            <br />
            <input
              type="text"
              name="companyAddress"
              value={user.companyAddress}
              onChange={edit}
              className={styles.input1}
            />
            <button
              className={styles.checkButton}
              onClick={() => setIsAddressModalOpen(true)}
            >
              찾기
            </button>
            {isAddressModalOpen && (
              <AddressModal
                onComplete={handleAddressSelect}
                onClose={() => setIsAddressModalOpen(false)}
              />
            )}
          </div>
          <div className={styles.inputGroup}>
            <span>
              휴대폰번호<b>*</b>
            </span>
            <br />
            <input
              type="text"
              name="phone"
              value={myUser.phone}
              placeholder={user.phone}
              onChange={edit}
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
              value={myUser.email}
              placeholder={user.email}
              className={styles.input2}
            />
          </div>
          <div className={styles.inputGroup}>
            <span>
              사업자등록번호<b>*</b>
            </span>
            <br />
            <input
              type="text"
              value={user.companyNumber}
              className={styles.input2}
              readOnly
            />
          </div>
          <div className={styles.inputGroup}>
            <span>사업자 등록증 이미지</span>
            <br />
            <div className={styles.imageUploadBox}>
              {myUser.certificationImagePreview ? (
                <img
                  src={myUser.certificationImagePreview}
                  className={styles.imageFile}
                />
              ) : (
                user.certificationImagePath && (
                  <img
                    src={`${url}${user.certificationImagePath}`}
                    className={styles.imageFile}
                  />
                )
              )}
              <input
                type="file"
                name="certificationImage"
                onChange={handleCertificationFileChange}
                className={styles.imageInput}
                value={user.certificationImage}
              />
            </div>
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

export default CompanyInfo;
