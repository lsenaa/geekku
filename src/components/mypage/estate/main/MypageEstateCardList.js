import React from 'react';
import MypageEstateCard from './MypageEstateCard';
import styles from './MypageEstateCardList.module.css';

const MypageEstateCardList = ({ estateList }) => {
  //console.log(estateList);
  return (
    <div className={styles.houseList}>
      {estateList.map((card) => (
        <MypageEstateCard
          key={card.estateNum}
          type={card.type}
          rent={card.rentType}
          location={`${card.address1}, ${card.address2} | ${card.size1}㎡`}
          description={card.content} // 설명
          imageUrl={card.imageUrl || 'defaultImage.jpg'} // 이미지 URL
        />
      ))}
    </div>
  );
};

export default MypageEstateCardList;
