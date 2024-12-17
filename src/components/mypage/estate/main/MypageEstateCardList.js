import React from 'react';
import MypageEstateCard from './MypageEstateCard';
import styles from './MypageEstateCardList.module.css';

const MypageEstateCardList = ({ estateList, onDelete }) => {
  return (
    <>
      {estateList.length === 0 ? (
        <div style={{ textAlign: 'center' }}>등록한 매물 내역이 없습니다.</div>
      ) : (
        <div className={styles.houseList}>
          {estateList.map((estate) => (
            <MypageEstateCard
              key={estate.estateNum}
              estate={estate}
              onDelete={onDelete} // 삭제 콜백 전달
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MypageEstateCardList;
