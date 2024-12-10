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
  const navigate = useNavigate();
  const [data, setData] = useState([]); // 데이터 초기값 빈 배열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const token = useAtomValue(tokenAtom); // Jotai로 관리 중인 토큰
  const user = useAtomValue(userAtom); // Jotai로 관리 중인 사용자 정보

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
      {data.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          작성한 집꾸 답변내역이 없습니다.
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
