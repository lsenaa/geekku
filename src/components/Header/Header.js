import logo from "../../assets/images/logo.png";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  

    return (
        <header className="Container">
            <img src={logo} alt="헤더로고" />
            <nav className="navWrapper">
                <ul>
                    <li>매물검색</li>
                    <li>집꾸하기</li>
                    <li>방꾸하기</li>
                    <li>한번에꾸하기</li>
                    <li>집들이</li>
                </ul>
            </nav>
            <button className="btn">
                <span onClick={()=>navigate("/LoginPerson")}>로그인</span> | <span>회원가입</span>
            </button>
        </header>
    );
};

export default Header;
