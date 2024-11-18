import { Pagination } from 'antd';
import styles from './MypageEstateOnestopAnswer.module.scss';
import { FaUserCircle } from 'react-icons/fa';

const MypageEstateOnestopAnswer = () => {
  return (
    <>
      <table className={styles.customTable}>
        <colgroup>
          <col width="5%" />
          <col width="40%" />
          <col width="10%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="5%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>거래종류</th>
            <th>희망지역</th>
            <th>작성자</th>
            <th>작성 날짜</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.rowWrap}>
            <td>3</td>
            <td>
              지방 빈 집 찾습니다. 경상남도 위주로 찾아요. 사천쪽이면 더 좋을거
              같아요.
            </td>
            <td>매매</td>
            <td>경남 사천</td>
            <td>
              <span className={styles.writer}>
                <FaUserCircle color="#6D885D" size={30} />
                &nbsp;홍길동
              </span>
            </td>
            <td>2024-10-27</td>
            <td>32</td>
          </tr>
          <tr className={styles.rowWrap}>
            <td>2</td>
            <td>
              지방 빈 집 찾습니다. 경상남도 위주로 찾아요. 사천쪽이면 더 좋을거
              같아요.
            </td>
            <td>매매</td>
            <td>경남 사천</td>
            <td>
              <span className={styles.writer}>
                <FaUserCircle color="#6D885D" size={30} />
                &nbsp;홍길동
              </span>
            </td>
            <td>2024-10-27</td>
            <td>32</td>
          </tr>
          <tr className={styles.rowWrap}>
            <td>1</td>
            <td>
              지방 빈 집 찾습니다. 경상남도 위주로 찾아요. 사천쪽이면 더 좋을거
              같아요.
            </td>
            <td>매매</td>
            <td>경남 사천</td>
            <td>
              <span className={styles.writer}>
                <FaUserCircle color="#6D885D" size={30} />
                &nbsp;홍길동
              </span>
            </td>
            <td>2024-10-27</td>
            <td>32</td>
          </tr>
        </tbody>
      </table>
      <Pagination defaultCurrent={1} total={50} />
    </>
  );
};
export default MypageEstateOnestopAnswer;
