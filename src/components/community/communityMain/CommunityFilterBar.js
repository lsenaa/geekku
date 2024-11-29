import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CommunityFilterBar.module.css';
import { url } from 'lib/axios';

const CommunityFilterBar = () => {
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0); // 전체 게시글 개수 상태 추가

  // 커뮤니티글 작성 폼 이동
  const handleCommunityBoardWrite = () => {
    navigate('/CommunityBoardWrite');
  };

  // 전체 게시글 개수 가져오기
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await axios.get(`${url}/communityList/count`);
        setTotalCount(response.data.totalElements);
      } catch (error) {
        console.error('전체 개수를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchTotalCount();
  }, []);

  return (
    // 필터바 출력
    <div className={styles.filterContainer}>
      <div className={styles.filterBar}>
        <h2 className={styles.boardTitle}>집들이 게시판</h2>
        <button className={styles.filterButton}>주거 형태</button>
        <button className={styles.filterButton}>방수</button>
        <button className={styles.filterButton}>스타일</button>
        <button className={styles.filterButton}>기간</button>
        <button className={styles.filterButton}>예산</button>
      </div>
      <div className={styles.filterHeader}>
        <span className={styles.totalCount}>전체 {totalCount}</span>{' '}
        {/* 전체 개수 표시 */}
        <button
          className={styles.registerButton}
          onClick={handleCommunityBoardWrite}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default CommunityFilterBar;
