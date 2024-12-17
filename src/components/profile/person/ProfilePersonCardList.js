import React from 'react';
import ProfilePersonCard from './ProfilePersonCard';
import styles from './ProfilePersonCardList.module.css';

const ProfilePersonCardList = ({ houseCards }) => {
  return (
    <div className={styles.houseList}>
      {houseCards &&
        houseCards.map((card) => (
          <ProfilePersonCard
            key={card.communityNum}
            id={card.communityNum}
            likeCount={card.viewCount}
            title={card.title}
          />
        ))}
    </div>
  );
};

export default ProfilePersonCardList;
