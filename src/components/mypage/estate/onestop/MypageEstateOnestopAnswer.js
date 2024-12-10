import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import styles from './MypageEstateOnestopAnswer.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { axiosInToken, url } from 'lib/axios';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import { formatEstateType, processLocation, formatDate } from 'utils/utils';
import { useNavigate } from 'react-router-dom';

const MypageEstateOnestopAnswer = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const token = useAtomValue(tokenAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnswers(currentPage);
  }, [currentPage]);

  const fetchAnswers = async (page) => {
    try {
      const response = await axiosInToken(token).get(
        `${url}/onestopAnswered/${user.companyId}`,
        {
          params: { page },
        }
      );
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      console.log(response.data.content);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (onestopNum) => {
    navigate(`/onestop/detail/${onestopNum}`); // 원하는 경로로 이동
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
                  <td>{formatDate(item.createdAt)}</td>
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
