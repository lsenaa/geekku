import styles from './ReqInteriorList.module.scss';
import { FaUserCircle } from 'react-icons/fa';

const ReqInteriorList = () => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="1">번호</th>
          <th colSpan="3">제목</th>
          <th colSpan="1">시공종류</th>
          <th colSpan="1">희망지역</th>
          <th colSpan="2">작성자</th>
          <th colSpan="2">작성 날짜</th>
          <th colSpan="1">조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.rowWrap}>
          <td colSpan="1">3</td>
          <td colSpan="3">지방 인테리어 신청합니다.</td>
          <td colSpan="1">부분시공</td>
          <td colSpan="1">경남 사천</td>
          <td colSpan="2">
            <span className={styles.writer}>
              <FaUserCircle color="#6D885D" size={30} />
              &nbsp;홍길동
            </span>
          </td>
          <td colSpan="2">2024-10-27</td>
          <td colSpan="1">32</td>
        </tr>
        <tr className={styles.rowWrap}>
          <td colSpan="1">2</td>
          <td colSpan="3">지방 인테리어 신청합니다.</td>
          <td colSpan="1">부분시공</td>
          <td colSpan="1">경남 사천</td>
          <td colSpan="2">
            <span className={styles.writer}>
              <FaUserCircle color="#6D885D" size={30} />
              &nbsp;홍길동
            </span>
          </td>
          <td colSpan="2">2024-10-27</td>
          <td colSpan="1">32</td>
        </tr>
        <tr className={styles.rowWrap}>
          <td colSpan="1">1</td>
          <td colSpan="3">지방 인테리어 신청합니다..</td>
          <td colSpan="1">전체시공</td>
          <td colSpan="1">경남 사천</td>
          <td colSpan="2">
            <span className={styles.writer}>
              <FaUserCircle color="#6D885D" size={30} />
              &nbsp;홍길동
            </span>
          </td>
          <td colSpan="2">2024-10-27</td>
          <td colSpan="1">32</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ReqInteriorList;
