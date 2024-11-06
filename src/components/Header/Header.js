import logo from '../../assets/images/logo.png';
import './Header.scss';

const Header = () => {
  return (
    <header className='Container'>
      <img src={logo} alt="헤더로고" />
      <nav className='navWrapper'>
        <ul>
          <li>매물검색</li>
          <li>집꾸하기</li>
          <li>방꾸하기</li>
          <li>한번에꾸하기</li>
          <li>집들이</li>
        </ul>
      </nav>
      <button className='btn'>로그인 | 회원가입</button>
    </header>
  );
}

export default Header;