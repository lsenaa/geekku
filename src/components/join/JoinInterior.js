import loginLogo from 'assets/images/login/loginLogo.png';
import checkRadio from 'assets/images/join/CheckedRadioBtn.png';
import unCheckRadio from 'assets/images/join/UncheckedRadioBtn.png';
import styles from '../login/Login.module.scss';
import styles2 from './Join.module.scss';
import axios from 'axios';
import { url } from 'lib/axios';
import { message, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckDoubleId } from 'utils/CheckDoubleId';
import { useAgreements } from 'utils/Agreements';
import { formatCompanyNum, verifyCompanyNum } from 'utils/CompanyNumCheck';
import { AddressModal } from './modals/AddressModal';
import { applyPhoneFormat } from 'utils/CheckPhoneNumber';

const JoinInterior = () => {
  const [user, setUser] = useState({
    type: 'interior',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: '',
    companyNumber: '',
    ceoName: '',
    companyName: '',
    companyAddress: '',
    companyCertificationImage: '',
  });

  const [usernameChecked, setUsernameChecked] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [companyNumChecked, setCompanyNumChecked] = useState(false);
  const [emailVaildated, setEmailValidated] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    agreements,
    handleCheckboxChange,
    validateAgreements,
    contextHolder: agreementsContextHolder,
  } = useAgreements();

  const edit = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (name === 'ceoName') {
      const regex = /[^ㄱ-횡a-zA-Z\s]/;
      if (regex.test(value)) {
        messageApi.open({
          type: 'warning',
          content: '이름에는 숫자나 특수문자를 포함할 수 없습니다.',
        });
        setUser((prevUser) => ({
          ...prevUser,
          ceoName: '',
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

    if (name === 'phone') {
      const formattedPhone = applyPhoneFormat(value.replace(/[^0-9]/g, ''));
      setUser((prevUser) => ({
        ...prevUser,
        [name]: formattedPhone,
      }));
      return;
    }

    if (name === 'companyNumber') {
      setCompanyNumChecked(false);
      const cleaned = value.replace(/\D+/g, '');
      if (cleaned.length > 10) {
        messageApi.open({
          type: 'warning',
          content: '사업자 번호는 10자리 숫자로 입력해주세요.',
        });
        setUser((prevUser) => ({
          ...prevUser,
          companyNumber: '',
        }));
        return;
      }

      setUser((prevUser) => ({
        ...prevUser,
        companyNumber: cleaned,
      }));
      setCompanyNumChecked(false);
      return;
    }

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckDoubleId = async () => {
    const isAvailable = await CheckDoubleId(user.username, url, messageApi);
    setUsernameChecked(isAvailable);
  };

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setUser({ ...user, companyCertificationImage: file });
    }
  };

  const handleVerifyCompanyNumber = () => {
    const cleaned = user.companyNumber.replace(/\D+/g, '');
    if (cleaned.length !== 10) {
      messageApi.open({
        type: 'warning',
        content: '사업자 번호는 10자리 숫자로 입력해주세요.',
      });
      return;
    }
    const isValied = verifyCompanyNum(cleaned, setUser, messageApi);
    setCompanyNumChecked(true);
  };

  const handleAddressSelect = (data) => {
    const address = data.address;
    setUser((prevUser) => ({ ...prevUser, companyAddress: address }));
    setIsAddressModalOpen(false);
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

    applyPhoneFormat(name, value, setUser, user);
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

    //동의 체크버튼
    if (!validateAgreements()) {
      return;
    }

    //사업자번호 체크버튼
    if (user.companyNumber && !companyNumChecked) {
      messageApi.open({
        type: 'warning',
        content: '사업자번호 인증을 눌러주세요.',
      });
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

    // 이메일 유효성 최종 확인
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
      !user.password.trim() ||
      !user.phone.trim() ||
      !user.email.trim() ||
      !user.companyNumber.trim() ||
      !user.companyName.trim() ||
      !user.ceoName.trim()
    ) {
      messageApi.open({
        type: 'warning',
        content: '필수 항목을 모두 입력해주세요.',
      });
      return;
    }

    let formData = new FormData();
    formData.append('type', user.type);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('phone', user.phone);
    formData.append('email', user.email);
    formData.append('companyNumber', user.companyNumber);
    formData.append('ceoName', user.ceoName);
    formData.append('companyName', user.companyName);
    formData.append('companyAddress', user.companyAddress);

    const fileInput = document.getElementById('companyCertificationImage');
    if (fileInput && fileInput.files.length > 0) {
      formData.append('file', fileInput.files[0]);
    }

    axios
      .post(`${url}/joinCompany`, formData)
      .then((res) => {
        Modal.success({
          type: 'warning',
          content: '기업회원가입에 성공하였습니다.',
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

      <h3 className={styles2.title}>기업 회원가입</h3>
      <div
        className={styles2.radioContainer}
        onClick={() => navigate('/JoinCompany')}
      >
        <div className={styles2.unCheckRadio}>
          <img src={unCheckRadio} alt="언체크라디오" />
          <p>부동산</p>
        </div>
        <div className={styles2.checkRadio}>
          <img src={checkRadio} alt="체크라디오" />
          <b>인테리어</b>
        </div>
      </div>
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
            placeholder="아이디를 입력해주세요."
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
            비밀번호<b>*</b>
          </span>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={edit}
            placeholder="영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요."
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
            placeholder="비밀번호를 다시 입력해주세요."
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
            onBlur={handleBlur}
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
            value={user.email}
            onChange={edit}
            onBlur={handleBlur}
            className={styles2.input2}
          />
        </div>
      </div>

      <hr className={styles.line} />
      <h3 className={styles2.title}>인테리어 기업 회원정보</h3>

      <div className={styles2.joinForm}>
        <div className={styles2.inputGroup}>
          <span>
            사업자 등록 번호<b>*</b>
          </span>
          <br />
          <input
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            type="text"
            name="companyNumber"
            id="companyNumber"
            onChange={edit}
            placeholder="숫자 10자리를 입력해주세요."
            maxLength={10}
            className={styles2.input1}
            value={user.companyNumber}
          />
          <button
            className={styles2.checkButton}
            onClick={handleVerifyCompanyNumber}
            disabled={companyNumChecked}
            {...contextHolder}
          >
            {companyNumChecked ? '확인 완료' : '인증'}
          </button>
        </div>
        <div className={styles2.inputGroup}>
          <span>
            대표자명<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="ceoName"
            id="ceoName"
            value={user.ceoName}
            onChange={edit}
            placeholder=""
            className={styles2.input2}
          />
        </div>
        <div className={styles2.inputGroup}>
          <span>
            사업장명<b>*</b>
          </span>
          <br />
          <input
            type="text"
            name="companyName"
            id="companyName"
            onChange={edit}
            placeholder=""
            className={styles2.input2}
          />
        </div>
        <div className={styles2.inputGroup}>
          <span>사업장 주소 (선택)</span>
          <br />
          <input
            type="text"
            name="companyAddress"
            id="companyAddress"
            value={user.companyAddress}
            onChange={edit}
            placeholder="찾기 버튼을 통해 주소를 찾아주세요."
            className={`${styles2.input1} ${styles2.companyAddress}`}
            readOnly
          />
          <button
            className={styles2.checkButton}
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
        <div className={styles2.inputGroup}>
          <span>사업자 등록증 이미지 (선택)</span>
          <br />
          <div className={styles2.imageUploadBox}>
            {/* 이미지 미리보기 */}
            {preview ? (
              <div className={styles2.imagePreview}>
                <img
                  src={preview}
                  alt="사업자 등록증 미리보기"
                  className={styles2.previewImage}
                />
              </div>
            ) : (
              <label>사업자 등록증 이미지 첨부 (+)</label>
            )}
            <input
              type="file"
              name="companyCertificationImage"
              id="companyCertificationImage"
              className={styles2.imageInput}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
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
            만 14세 이상만 가입할 수 있습니다.<b>*</b>
          </span>
        </label>
        <label>
          <span className={styles2.checkboxGroup}>
            <input
              type="checkbox"
              name="termsAccepted"
              onChange={handleCheckboxChange}
            />
            이용약관 및 개인정보 수집에 동의합니다.
            <b>*</b>
          </span>
        </label>
      </div>

      <button className={styles2.button} onClick={submit}>
        {contextHolder}
        회원가입
      </button>
    </div>
  );
};
export default JoinInterior;
