import React from 'react';
import MypageEstateCard from './MypageEstateCard';
import styles from './MypageEstateCardList.module.css';

const MypageEstateCardList = ({ estateList, onDelete }) => {
  //console.log(estateList);
  return (
    <div className={styles.houseList}>
      {estateList.map((card) => (
        <MypageEstateCard
          key={card.estateNum}
          estateNum={card.estateNum}
          type={card.type}
          rent={card.rentType}
          location={`${card.address1}, ${card.address2} | ${card.size1}㎡`}
          description={card.content} // 설명
          imageUrl={card.imageUrl || 'defaultImage.jpg'} // 이미지 URL
          onDelete={onDelete} // 삭제 콜백 전달
        />
      ))}
    </div>
  );
};

export default MypageEstateCardList;
