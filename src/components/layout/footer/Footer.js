import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>회사소개</li>
        <li>이용약관</li>
        <li>개인정보 처리방침</li>
        <li>위치기반 서비스 이용약관</li>
        <li>시공/이사 파트너 안내</li>
      </ul>
      <ul>
        <li>(주)지꾸</li>
        <li>대표: 코스타</li>
        <li>geekku@kosta.com</li>
      </ul>
      <ul>
        <li>서울특별시 금천구 가산동 가산디지털1로 70, 912호</li>
        <li>사업자등록번호 : 111-11-11111</li>
        <li>통신판매업 신고번호 : 2021-서울강남-00000</li>
      </ul>
      <p>Copyright © 2024 gikku. All rights reserved.</p>
    </div>
  );
}

export default Footer;