import styles from './OnestopList.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { formatDate, formatLocation, processLocation } from 'utils/utils';
import { useNavigate } from 'react-router-dom';

const OnestopList = ({ onestopList }) => {
  const navigate = useNavigate();
  return (
    <table className={styles.customTable}>
      <colgroup>
        <col width="5%" />
        <col width="40%" />
        <col width="10%" />
        <col width="10%" />
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
        {onestopList.map((onestop, i) => (
          <tr
            className={styles.rowWrap}
            key={onestop.onestopNum}
            onClick={() => navigate(`/onestop/detail/${onestop.onestopNum}`)}
          >
            <td>{i + 1}</td>
            <td>{onestop.title}</td>
            <td>
              {onestop.rentType === 'jeonse' && '전세'}
              {onestop.rentType === 'monthly' && '월세'}
              {onestop.rentType === 'buy' && '매매'}
            </td>
            <td>{`${processLocation(onestop.address1)} ${onestop.address2}`}</td>
            <td>
              <span className={styles.writer}>
                <FaUserCircle color="#6D885D" size={30} />
                &nbsp;
                <p>{onestop.nickname ? onestop.nickname : onestop.name}</p>
              </span>
            </td>
            <td>{formatDate(onestop.createdAt)}</td>
            <td>{onestop.viewCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OnestopList;
