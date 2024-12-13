import { Modal, Pagination } from 'antd';
import Button01 from 'components/commons/button/Button01';
import MypageInteriorSiderbar from 'components/layout/mypage/interior/MypageInteriorSiderbar';
import MypageInteriorSubNavbar from 'components/layout/mypage/interior/MypageInteriorSubNavbar';
import styles from './MypageInteriorRequest.module.scss';
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

//파일이름 잘못지음; requestAll answerList

const MypageInteriorRequest = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // 데이터 초기값 빈 배열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [token, setToken] = useAtom(tokenAtom);
  const user = useAtomValue(userAtom); // Jotai로 관리 중인 사용자 정보

  useEffect(() => {
    fetchAnswers(currentPage);
  }, [currentPage]);
  const fetchAnswers = async (page) => {
    try {
      const response = await axiosInToken(token).get(
        `${url}/company/myInteriorAnswerList/${user.companyId}`,
        {
          params: { page },
        }
      );
      // 데이터가 존재할 경우에만 상태 업데이트
      setData(response.data.content); // 데이터가 없으면 빈 배열로 처리

      setTotalPages(response.data?.totalPages || 0); // totalPages도 기본값 설정
      //console.log(response.data.content);
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

  const handleRowClick = (requestAllNum) => {
    navigate(`/interiorall/detail/${requestAllNum}`); // 원하는 경로로 이동
  };

  return (
    <>
      {data.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          작성한 방꾸하기 답변내역이 없습니다.
        </div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="5%" />
              <col width="25%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
              <col width="10%" />
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
              {data.map((requestAll) => (
                <tr
                  key={requestAll.answerAllNum}
                  className={styles.rowWrap}
                  onClick={() =>
                    navigate(`/interiorall/detail/${requestAll.requestAllNum}`)
                  }
                >
                  <td>{requestAll.requestAllNum}</td>
                  <td>{requestAll.title}</td>
                  <td>
                    <p>
                      {requestAll.workType == 0 && '전체시공'}
                      {requestAll.workType == 1 && '부분시공'}
                    </p>
                  </td>
                  {/* <td>{formatEstateType(requestAll.type)}</td> */}
                  <td>
                    {`${processLocation(requestAll.address1)} ${requestAll.address2}`}
                  </td>
                  <td>
                    <span className={styles.writer}>
                      <div className={styles.profileImg}>
                        <img
                          src={
                            requestAll.userProfileImage
                              ? `data:image/png;base64, ${requestAll.userProfileImage}`
                              : ''
                          }
                          alt="사용자 프로필 이미지"
                        />
                      </div>
                      &nbsp;
                      {requestAll.nickname
                        ? requestAll.nickname
                        : requestAll.name}
                    </span>
                  </td>
                  <td>{formatDate(requestAll.createdAt)}</td>
                  <td>{requestAll.viewCount}</td>
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
export default MypageInteriorRequest;
