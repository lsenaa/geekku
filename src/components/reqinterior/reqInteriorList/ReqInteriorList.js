import styles from './ReqInteriorList.module.scss';
import { formatDate, processLocation } from 'utils/utils';
import { useNavigate } from 'react-router-dom';

const ReqInteriorList = ({ interiorAllList }) => {
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
            key={interiorAllRequest.requestAllNum}
            onClick={() =>
              navigate(
                `/interiorall/detail/${interiorAllRequest.requestAllNum}`
              )
            }
          >
            <td>{i + 1}</td>
            <td>{interiorAllRequest.title}</td>
            <td>
              {interiorAllRequest.workType == 0 && '전체'}
              {interiorAllRequest.workType == 1 && '부분'}
            </td>
            <td>{`${processLocation(interiorAllRequest.address1)} ${interiorAllRequest.address2}`}</td>
            <td>
              <span className={styles.writer}>
                <div className={styles.profileImg}>
                  <img
                    src={
                      `data:image/png;base64,${interiorAllRequest.profileImage}` ||
                      ''
                    }
                    alt="프로필이미지"
                  />
                </div>
                &nbsp;
                <p>
                  {interiorAllRequest.nickname
                    ? interiorAllRequest.nickname
                    : interiorAllRequest.name}
                </p>
              </span>
            </td>
            <td>{formatDate(interiorAllRequest.createAt)}</td>
            <td>{interiorAllRequest.viewCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReqInteriorList;
