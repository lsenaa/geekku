import styles from './HouseList.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { formatDate, formatLocation, processLocation } from 'utils/utils';
import { useNavigate } from 'react-router-dom';

const HouseList = ({ houseList }) => {
  const navigate = useNavigate();

  return (
    <table className={styles.customTable}>
      <colgroup>
        <col width="5%" />
        <col width="35%" />
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
        {houseList.map((house, i) => (
          <tr
            className={styles.rowWrap}
            key={house.houseNum}
            onClick={() => navigate(`/house/detail/${house.houseNum}`)}
          >
            <td>{i + 1}</td>
            <td>{house.title}</td>
            <td>
              {house.rentType === 'jeonse' && '전세'}
              {house.rentType === 'monthly' && '월세'}
              {house.rentType === 'buy' && '매매'}
            </td>
            <td>{`${processLocation(house.address1)} ${house.address2}`}</td>
            <td>
              <span className={styles.writer}>
                <FaUserCircle color="#6D885D" size={30} />
                &nbsp;홍길동
              </span>
            </td>
            <td>{formatDate(house.createdAt)}</td>
            <td>{house.viewCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HouseList;
