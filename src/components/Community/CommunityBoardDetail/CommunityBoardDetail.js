import React from 'react';
import './CommunityBoardDetail.css';

const CommunityBoardDetail = () => {
  return (
    <div className="house-info-container">
      <header className="house-info-header">
        <button className="back-button">←</button>
        <div className="title">홈스타일링 전문가와 함께, 블랙 포인트로 세련되게 완성한 집</div>
      </header>
      
      <div className="user-section">
        <div className="user-info">
          <div className="profile-icon">👤</div>
          <span className="username">코스타</span>
        </div>
        
        <div className="actions">
          <button className="edit-button">수정하기</button>
          <div className="bookmark">
            🌼 <span>북마크</span>
          </div>
        </div>
      </div>
      
      <div className="details-card">
        <div className="details-icons">
          <div className="icon-item">🏢 아파트</div>
          <div className="icon-item">📏 33평</div>
          <div className="icon-item">🖌️ 리모델링</div>
          <div className="icon-item">👫 신혼부부</div>
        </div>
        
        <hr />
        
        <div className="additional-details">
          <p>지역 <strong>경기도</strong> &nbsp;&nbsp; 스타일 <strong>내추럴</strong> &nbsp;&nbsp; 예산 <strong>3000만원</strong></p>
          <p style={{marginTop:"30px"}}>기간 <strong>1개월</strong> &nbsp;&nbsp; 세부공사 <strong>주방리모델링, 조명시공, 중문, 가벽&파티션, 슬라이딩 도어</strong></p>
        </div>
      </div>
    </div>
  );
};

export default CommunityBoardDetail;
