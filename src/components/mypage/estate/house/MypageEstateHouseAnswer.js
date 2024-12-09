import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { axiosInToken, url } from 'lib/axios';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import styles from './MypageEstateHouseAnswer.module.scss';
import { formatDate, formatEstateType, processLocation } from 'utils/utils';
import { useNavigate } from 'react-router';

const MypageEstateHouseAnswer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // 데이터 초기값 빈 배열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const token = useAtomValue(tokenAtom); // Jotai로 관리 중인 토큰
  const user = useAtomValue(userAtom); // Jotai로 관리 중인 사용자 정보
  const user2 = '3e1ec3cd-fc5c-4c24-9673-963db487e52d';
  // 데이터 가져오기
  useEffect(() => {
    fetchAnswers(currentPage);
  }, [currentPage]);

  // 백엔드에서 데이터 가져오는 함수
  const fetchAnswers = async (page) => {
    //   try {
    //     const response = await axiosInToken(token).get(
    //       `${url}/company/estateAnswered/${user.companyId}`,
    //       {
    //         params: { page },
    //       }
    //     );
    //     // 데이터가 존재할 경우에만 상태 업데이트
    //     setData(response.data.content); // 데이터가 없으면 빈 배열로 처리
    //     setTotalPages(response.data?.totalPages || 0); // totalPages도 기본값 설정
    //     console.log(response.data.content);
    //   } catch (error) {
    //     console.error('데이터를 가져오는 중 오류 발생:', error);
    //     setData([]);
    //     setTotalPages(0);
    //   }
    // };
    try {
      const response = await axiosInToken(token).get(
        `${url}/company/mypageHouseAnswerList?page=${page}`
      );
      // 데이터가 존재할 경우에만 상태 업데이트
      setData(response.data.content); // 데이터가 없으면 빈 배열로 처리
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

  console.log(data);

  return (
    <>
      {data.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          작성한 집꾸 답변내역이 없습니다.
        </div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="5%" />
              <col width="30%" />
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
                <th>거래종류</th>
                <th>희망지역</th>
                <th>작성자</th>
                <th>작성 날짜</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.answerHouseNum}
                  className={styles.rowWrap}
                  onClick={() => navigate(`/house/detail/${item.houseNum}`)}
                >
                  <td>{item.answerHouseNum}</td>
                  <td>{item.title}</td>
                  <td>{formatEstateType(item.type)}</td>
                  <td>
                    {`${processLocation(item.address1)} ${item.address2}`}
                  </td>
                  <td>
                    <span className={styles.writer}>
                      <div className={styles.profileImg}>
                        <img
                          src={`data:image/png;base64,${item.userProfileImage}`}
                          alt="프로필이미지"
                        />
                      </div>
                      &nbsp;{item.nickname ? item.nickname : item.name}
                    </span>
                  </td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>{item.viewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            total={totalPages * 10} // 페이지 수 * 10 (페이지당 아이템 수)
            onChange={handlePageChange}
            pageSize={10}
          />
        </>
      )}
    </>
  );
};

export default MypageEstateHouseAnswer;
