import styles from './PersonInfo.module.scss';
import profileImg from '../../../assets/images/mypage/profileImg.png';
import profileImgAdd from '../../../assets/images/mypage/profileImgAdd.png';

const PersonInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <div className={styles.profileForm}>
          <div className={styles.profileImg}>
            <a href="#">
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
