import React from 'react';
import PersonProfileCard from './MypagePersonCard';
import styles from './MypagePersonCardList.module.css';

const MypagePersonCardList = ({ houseCards }) => {
  return (
    <div className={styles.houseList}>
      {houseCards && houseCards.map(card => (
        <PersonProfileCard key={card.id} likeCount={card.likeCount} title={card.title} />
      ))}
    </div>
  );
};

export default MypagePersonCardList;
