import React from 'react';
import HouseCard from './PersonProfileCard';
import styles from './PersonProfileCardList.module.css';

const PersonProfileCardList = ({ houseCards }) => {
  return (
    <div className={styles.houseList}>
      {houseCards && houseCards.map(card => (
        <HouseCard key={card.id} likeCount={card.likeCount} title={card.title} />
      ))}
    </div>
  );
};

export default PersonProfileCardList;
