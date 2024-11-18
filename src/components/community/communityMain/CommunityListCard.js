import React from 'react';
import styles from './CommunityListCard.module.css';
import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';

const CommunityListCard = ({ title, image, views, profile }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate('/CommunityBoardDetail');
  };

  return (
    // Card component
    <div className={styles.card} onClick={handleDetail}>
      <img src={image} alt={title} className={styles.cardImage} />
      <h3 className={styles.cardTitle} style={{ fontWeight: 'bolder' }}>
        {title}
      </h3>
      <div className={styles.cardFooter}>
        <div className={styles.profile}>
          {/* <img src={profile} alt="프로필" className={styles.profileImage} /> */}
          <FaUserCircle color="#6D885D" size={30} />
          <span className={styles.profileName}>test_user</span>
        </div>
        <p className={styles.cardViews}>조회 {views}</p>
      </div>
    </div>
  );
};

export default CommunityListCard;
