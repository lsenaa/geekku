import styles from './ReqInteriorList.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { formatDate, formatLocation, processLocation } from 'utils/utils';
import { useNavigate } from 'react-router-dom';

const ReqInteriorList = ({ interiorAllList }) => {
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
          <th>시공종류</th>
          <th>희망지역</th>
          <th>작성자</th>
          <th>작성 날짜</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {interiorAllList.map((interiorAllRequest, i) => (
          <tr
            className={styles.rowWrap}
            key={interiorAllRequest.interiorallNum}
            onClick={() =>
              navigate(
                `/interiorall/detail/${interiorAllRequest.interiorallNum}`
              )
            }
          >
            <td>{i + 1}</td>
            <td>{interiorAllRequest.title}</td>
            <td>
              {/* 수정하기 */}
              {interiorAllRequest.rentType === 'jeonse' && '전세'}
              {interiorAllRequest.rentType === 'monthly' && '월세'}
              {interiorAllRequest.rentType === 'buy' && '매매'}
            </td>
            <td>{`${processLocation(interiorAllRequest.address1)} ${interiorAllRequest.address2}`}</td>
            <td>
              <span className={styles.writer}>
                <FaUserCircle color="#6D885D" size={30} />
                &nbsp;홍길동
              </span>
            </td>
            <td>{formatDate(interiorAllRequest.createdAt)}</td>
            <td>{interiorAllRequest.viewCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReqInteriorList;
