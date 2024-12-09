import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import styles from './MypageEstateOnestopAnswer.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { axiosInToken, url } from 'lib/axios';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';

const MypageEstateOnestopAnswer = () => {
  const [data, setData] = useState([]); // 데이터 배열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const token = useAtomValue(tokenAtom); // 인증 토큰
  const user = useAtomValue(userAtom); // 사용자 정보

  useEffect(() => {
    fetchAnswers(currentPage); // 컴포넌트 로드 시 및 페이지 변경 시 데이터 가져오기
  }, [currentPage]);

  const fetchAnswers = async (page) => {
    try {
      const response = await axiosInToken(token).get(
        `${url}/onestopAnswered/${user.companyId}`,
        {
          params: { page }, // 페이지 정보 전달
        }
      );
      setData(response.data.content); // 서버에서 받은 데이터 설정
      setTotalPages(response.data.totalPages); // 총 페이지 수 설정
      console.log(response.data.content);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 변경 시 상태 업데이트
  };

  return (
    <>
      {data.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          작성한 한번에 꾸하기 답변내역이 없습니다.
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
              {data.map((item) => (
                <tr key={item.answerNum} className={styles.rowWrap}>
                  <td>{item.answerOnestopNum}</td>
                  <td>{item.title}</td>
                  <td>{item.type}</td>
                  <td>
                    {item.address1} {item.address2}
                  </td>
                  <td>
                    <span className={styles.writer}>
                      <FaUserCircle color="#6D885D" size={30} />
                      &nbsp;{item.username}
                    </span>
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.viewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            total={totalPages * 10}
            onChange={handlePageChange}
            pageSize={10}
          />
        </>
      )}
    </>
  );
};

export default MypageEstateOnestopAnswer;
