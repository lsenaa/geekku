import styles from './PersonInfo.module.scss';
import profileImg from '../../../assets/images/mypage/profileImg.png';
import profileImgAdd from '../../../assets/images/mypage/profileImgAdd.png';

const PersonInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileSidebar}>
        <img
          src={profileImg}
          alt="프로필이미지"
          className={styles.profileImage}
        />
        <p className={styles.profileName}>홍길동</p>
        <p className={styles.profileId}>KostaID123</p>
        <p className={styles.profileEmail}>kosta@gmail.com</p>
        <hr className={styles.line} />
        <ul className={styles.menuList}>
          <li>집꾸하기</li>
          <li>방꾸하기</li>
          <li>한번에 꾸하기</li>
          <li>북마크</li>
          <li>집들이</li>
          <li>회원 정보 관리</li>
        </ul>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.tabLinks}>
          <a href="/" className={styles.tabA}>
            회원 정보 수정
          </a>
          <a href="/searchPwd" className={styles.tabA}>
            {' '}
            비밀번호 변경
          </a>
        </div>
        <hr className={styles.line} />

        <div className={styles.profileForm}>
          <div className={styles.profileImg}>
            <a href="/">
              <img src={profileImgAdd} alt="프로필이미지추가" />
            </a>
          </div>
          <div className={styles.inputGroup}>
            <span>닉네임</span>
            <br />
            <input type="text" placeholder="코스타" className={styles.input1} />
            <button className={styles.checkButton}>중복확인</button>
          </div>
          <div className={styles.inputGroup}>
            <span>
              이름<b>*</b>
            </span>
            <br />
            <input type="text" placeholder="홍길동" className={styles.input2} />
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
          <button className={styles.button}>완료</button>

          <a href="/" className={styles.removeUser}>
            회원탈퇴
          </a>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
