import React from 'react';
import './CommunityListCard.css';
import { useNavigate } from 'react-router';

const CommunityListCard = ({ title, image, views, profile }) => {
  
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate('/CommunityBoardDetail');
  };
  return (
    //카드
    <div className="card" onClick={handleDetail}>
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title" style={{ fontWeight: "bolder" }}>{title}</h3>
      <div className="card-footer">
        <div className="profile">
          <img src={profile} alt="프로필" className="profile-image" />
          <span className="profile-name">test_user</span>
        </div>
        <p className="card-views">조회 {views}</p>
      </div>
    </div>
  );
};

export default CommunityListCard;
