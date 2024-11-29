import React from 'react';
import styles from './CommunityListCard.module.css';
import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { url } from 'lib/axios';

const CommunityListCard = ({
  community_num,
  title,
  image,
  viewCount,
  profile,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/CommunityBoardDetail/${community_num}`); // community_num 사용
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={`http://localhost:8080/communityImage/${image}`}
        alt={title}
        className={styles.cardImage}
      />
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardFooter}>
        <div className={styles.profile}>
          <FaUserCircle color="#6D885D" size={30} />
          <span className={styles.profileName}>test_user</span>
        </div>
        <p className={styles.cardViews}>조회 {viewCount}</p>
      </div>
    </div>
  );
};

export default CommunityListCard;
