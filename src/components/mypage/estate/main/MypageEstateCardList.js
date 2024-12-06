import React from 'react';
import MypageEstateCard from './MypageEstateCard';
import styles from './MypageEstateCardList.module.css';

const MypageEstateCardList = ({ estateList, onDelete }) => {
  //console.log(estateList);
  return (
    <div className={styles.houseList}>
      {estateList.map((estate) => (
        <MypageEstateCard
          key={estate.estateNum}
          estate={estate}
          onDelete={onDelete} // 삭제 콜백 전달
        />
      ))}
    </div>
  );
};

export default MypageEstateCardList;
