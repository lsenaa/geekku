import { Modal, Pagination } from 'antd';
import Button01 from 'components/commons/button/Button01';
import MypageInteriorSiderbar from 'components/layout/mypage/interior/MypageInteriorSiderbar';
import MypageInteriorSubNavbar from 'components/layout/mypage/interior/MypageInteriorSubNavbar';
import styles from './OnestopReply.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { useAtom } from 'jotai';
import { url, axiosInToken } from 'lib/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import {
  formatDate,
  formatEstateType,
  formatPrice,
  processLocation,
} from 'utils/utils';

const MypageInteriorOnestop = () => {
  const [data, setData] = useState([]); // 데이터 초기값 빈 배열
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [token, setToken] = useAtom(tokenAtom);
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [onestopList, setonestopList] = useState([]);
  const user = useAtomValue(userAtom); // Jotai로 관리 중인 사용자 정보

  useEffect(() => {
    fetchAnswers(currentPage);
  }, [currentPage]);
  const fetchAnswers = async (page) => {
    try {
      const response = await axiosInToken(token).get(
        `${url}/company/myOnestopAnswerList/${user.companyId}`,
        {
          params: { page },
        }
      );
      // 데이터가 존재할 경우에만 상태 업데이트
      setData([...response.data.content]); // 데이터가 없으면 빈 배열로 처리
      setTotalPages(response.data?.totalPages || 0); // totalPages도 기본값 설정
      console.log(response.data.content);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      setData([]);
      setTotalPages(0);
    }
  };

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (oneStopNum) => {
    navigate(`/onestop/detail/${oneStopNum}`); // 원하는 경로로 이동
  };

  return (
    <>
      {data.length === 0 ? ( // data 상태를 사용
        <div style={{ textAlign: 'center' }}>
          작성한 한번에꾸하기 내역이 없습니다.
        </div>
      ) : (
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
              {data.map((onestop) => (
                <tr
                  key={onestop.answerOnestopNum}
                  className={styles.rowWrap}
                  onClick={() =>
                    navigate(`/onestop/detail/${onestop.onestopNum}`)
                  }
                >
                  <td>{onestop.answerOnestopNum}</td>
                  <td>{onestop.title}</td>
                  <td>{formatEstateType(onestop.type)}</td>
                  <td>
                    {`${processLocation(onestop.address1)} ${onestop.address2}`}
                  </td>
                  <td>
                    <span className={styles.writer}>
                      <div className={styles.profileImg}>
                        <img
                          src={`data:image/png;base64,${onestop.userProfileImage}`}
                        />
                        &nbsp; &nbsp;{onestop.nickname}
                      </div>
                    </span>
                  </td>
                  <td>{formatDate(onestop.createdAt)}</td>
                  <td>{onestop.viewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            total={totalPages * 10} // 총 데이터 수에 맞게 수정
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};
export default MypageInteriorOnestop;
