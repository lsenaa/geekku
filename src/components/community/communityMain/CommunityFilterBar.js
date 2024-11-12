import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CommunityFilterBar.module.css';

const CommunityFilterBar = () => {
  const navigate = useNavigate();

  // 커뮤니티글 작성 폼 이동
  const handleCommunityBoardWrite = () => {
    navigate('/CommunityBoardWrite');
  };

  return (
    // 필터바 출력
    <div className={styles.filterContainer}>
      <div className={styles.filterBar}>
        <h2 className={styles.boardTitle} style={{ fontFamily: 'Santokki' }}>
          집들이 게시판
        </h2>
        <button className={styles.filterButton}>주거 형태</button>
        <button className={styles.filterButton}>방수</button>
        <button className={styles.filterButton}>스타일</button>
        <button className={styles.filterButton}>기간</button>
        <button className={styles.filterButton}>예산</button>
      </div>
      <div className={styles.filterHeader}>
        <span className={styles.totalCount}>전체 13,408</span>
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
