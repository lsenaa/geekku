import styles from "../myInfoPage/PersonInfo.module.scss";
import profileImg from "../../assets/images/mypage/profileImg.png";

const SearchPwd = () => {
    return (
        <div className={styles.personInfo}>
            <div className={styles.sideNav}>
                <div className={styles.profileContainer}>
                    <img src={profileImg} alt="프로필이미지" />
                    <p className={styles.name}>홍길동</p>
                    <p>KostaID123</p>
                    <p>kosta@gmail.com</p>

                    <hr />
                    <ul>
                        <li>집꾸하기</li>
                        <li>방꾸하기</li>
                        <li>한번에 꾸하기</li>
                        <li>북마크</li>
                        <li>집들이</li>
                        <li>회원 정보 관리</li>
                    </ul>
                </div>
            </div>

            <div className={styles.content}>
                <a href="/personInfo">회원 정보 수정</a>
                <a href="/searchPwd"> 비밀번호 변경</a>
                <hr />

                <div className={styles.profileContainer}>
                    
                    <ul>
                        <p>
                            비밀번호<b>*</b>
                        </p>
                        <input
                            type="password"
                            placeholder="변경할 비밀번호를 입력해주세요."
                        />
                    </ul>
                    <ul>
                        <p>
                            비밀번호 확인<b>*</b>
                        </p>
                        <input
                            type="password"
                            placeholder="비밀번호를 다시 입력해주세요."
                        />
                    </ul>
                    <button>완료</button>
                </div>
            </div>
        </div>
    );
};
export default SearchPwd;
