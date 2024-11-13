import React from 'react';
import MypageEstateCard from './MypageEstateCard';
import styles from './MypageEstateCardList.module.css';

const MypageEstateCardList = ({ houseCards }) => {
  return (
    <div className={styles.houseList}>
      {houseCards.map((card) => (
        <MypageEstateCard
          key={card.id}
          type={card.type}
          rent={card.rent}
          location={card.location}
          description={card.description}
          imageUrl={card.imageUrl}
        />
      ))}
    </div>
  );
};

export default MypageEstateCardList;
