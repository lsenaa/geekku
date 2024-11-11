import React from 'react';
import PersonProfileCard from './PersonProfileCard';
import styles from './PersonProfileCardList.module.css';

const PersonProfileCardList = ({ houseCards }) => {
  return (
    <div className={styles.houseList}>
      {houseCards && houseCards.map(card => (
        <PersonProfileCard key={card.id} likeCount={card.likeCount} title={card.title} />
      ))}
    </div>
  );
};

export default PersonProfileCardList;
