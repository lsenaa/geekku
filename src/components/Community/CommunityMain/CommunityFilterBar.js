import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunityFilterBar.css';

const CommunityFilterBar = () => {

  const navigate = useNavigate();

  // 커뮤니티글 작성 폼 이동
  const handleCommunityBoardWrite = () => {
    navigate('/CommunityBoardWrite');
  };

  return (
    //필터바 출력
    <div className="filter-container">
      <div className="filter-bar">
        <h2 className="board-title" style={{ fontFamily: 'Santokki' }}>집들이 게시판</h2>
        <button className="filter-button">주거 형태</button>
        <button className="filter-button">방수</button>
        <button className="filter-button">스타일</button>
        <button className="filter-button">기간</button>
        <button className="filter-button">예산</button>
      </div>
      <div className="filter-header">
        <span className="total-count">전체 13,408</span>
        <button className="register-button" onClick={handleCommunityBoardWrite}>등록하기</button>
      </div>
    </div>
  )
};

export default CommunityFilterBar;