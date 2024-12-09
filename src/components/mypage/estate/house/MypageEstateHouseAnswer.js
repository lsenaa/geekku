import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { axiosInToken, url } from 'lib/axios';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styles from './MypageEstateHouseAnswer.module.scss';
import {
  formatDate,
  formatEstateType,
  formatPrice,
  processLocation,
} from 'utils/utils';

const MypageEstateHouseAnswer = () => {
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
        `${url}/company/estateAnswered/${user.companyId}`,
        {
          params: { page },
        }
      );

      setData(response.data.content);
      setTotalPages(response.data?.totalPages || 0);
      console.log(response.data.content);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      setData([]);
      setTotalPages(0);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (houseNum) => {
    navigate(`/house/detail/${houseNum}`); // 원하는 경로로 이동
  };

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
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.answerHouseNum}
                className={styles.rowWrap}
                onClick={() => handleRowClick(item.houseNum)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.answerHouseNum}</td>
                <td>{item.title}</td>
                <td>{formatEstateType(item.type)}</td>
                <td>{`${processLocation(item.address1)} ${item.address2}`}</td>
                <td>
                  <span className={styles.writer}>
                    <FaUserCircle color="#6D885D" size={30} />
                    &nbsp;{item.userName}
                  </span>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>{' '}
                <td>{item.viewCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        current={currentPage}
        total={totalPages * 10}
        onChange={handlePageChange}
        pageSize={10}
      />
    </>
  );
};

export default MypageEstateHouseAnswer;
