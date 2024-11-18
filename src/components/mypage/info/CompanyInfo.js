import styles from './PersonInfo.module.scss';
import profileImg from '../../../assets/images/mypage/profileImg.png';
import profileImgAdd from '../../../assets/images/mypage/profileImgAdd.png';

const CompanyInfo = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.profileSidebar}>
        <img
          src={profileImg}
          alt="프로필이미지"
          className={styles.profileImage}
        />
        <p className={styles.profileName}>호서대 벤처타워 공인중개사무소</p>
        <p className={styles.profileId}>KostaID123</p>
        <p className={styles.profileEmail}>KostaID123@gmail.com</p>
        <hr className={styles.line} />
        <ul className={styles.menuList}>
          <li>집꾸하기</li>
          <li>한번에 꾸하기</li>
          <li>회원 정보 관리</li>
        </ul>
      </div> */}

      <div className={styles.profileContent}>
        {/* <div className={styles.tabLinks}>
          <a href="/" className={styles.tabA}>
            회원 정보 수정
          </a>
          <a href="/searchPwdResult" className={styles.tabA}>
            {' '}
            비밀번호 변경
          </a>
        </div>
        <hr className={styles.line} /> */}

        <div className={styles.profileForm}>
          <div className={styles.profileImg}>
            <a href="/">
              <img src={profileImgAdd} alt="프로필이미지추가" />
            </a>
          </div>
          <div className={styles.inputGroup}>
            <span>
              사업장명<b>*</b>
            </span>
            <br />
            <input
              type="text"
              placeholder="호서대 벤처타워 공인중개사무소"
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
              placeholder="홍길동"
              className={styles.input2}
              readOnly
            />
          </div>
          <div className={styles.inputGroup}>
            <span>
              중개업등록번호<b>*</b>
            </span>
            <br />
            <input
              type="text"
              placeholder="41220-2016-100009"
              className={styles.input2}
              readOnly
            />
          </div>
          <div className={styles.inputGroup}>
            <span>주소</span>
            <br />
            <input
              type="text"
              placeholder="강원특별자치도 춘천시 안마산로 131 상가씨동 1층 C-106호(퇴계동)"
              className={styles.input1}
            />
            <button className={styles.checkButton}>찾기</button>
          </div>
          <div className={styles.inputGroup}>
            <span>
              휴대폰번호<b>*</b>
            </span>
            <br />
            <input
              type="text"
              placeholder="010-1234-5678"
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
              placeholder="kosta123456"
              className={styles.input3}
            />
            <span>&nbsp;&nbsp;@&nbsp;&nbsp;</span>
            <select className={styles.input4}>
              <option value=" "> 선택하세요</option>
              <option value="gmail.com"> gmail.com</option>
              <option value="naver.com"> naver.com</option>
              <option value="daum.net"> daum.net</option>
              <option value="직접 입력"> 직접 입력</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <span>
              사업자등록번호<b>*</b>
            </span>
            <br />
            <input
              type="text"
              placeholder="178-53-00459"
              readOnly
              className={styles.input2}
            />
          </div>
          <div className={styles.inputGroup}>
            <span>사업자 등록증 이미지</span>
            <br />
            <div className={styles.imageUploadBox}>
              <input type="file" readOnly className={styles.imageInput} />
            </div>
          </div>
          <button className={styles.button}>완료</button>

          <a href="/" className={styles.removeUser}>
            회원탈퇴
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
