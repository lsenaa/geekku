import React from 'react';
import './CommunityListCard.css';

const CommunityListCard = ({ title, image, views, profile }) => {
  return (
    //카드
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title" style={{fontWeight:"bolder"}}>{title}</h3>
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
