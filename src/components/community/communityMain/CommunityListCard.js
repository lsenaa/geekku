import React from 'react';
import styles from './CommunityListCard.module.css';
import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { url } from 'lib/axios';

const CommunityListCard = ({
  communityNum,
  title,
  image,
  viewCount,
  profile,
  profileImage,
  nickname,
  name,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/CommunityBoardDetail/${communityNum}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imgWrap}>
        <img
          src={`${url}/communityImage/${image}`}
          alt={title}
          className={styles.cardImage}
        />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardFooter}>
        <div className={styles.profile}>
          <div className={styles.profileImg}>
            <img
              src={`data:image/png;base64,${profileImage}`}
              alt="프로필이미지"
            />
          </div>
          <span className={styles.profileName}>
            {nickname ? nickname : name}
          </span>
        </div>
        <p className={styles.cardViews}>조회 {viewCount}</p>
      </div>
    </div>
  );
};

export default CommunityListCard;
