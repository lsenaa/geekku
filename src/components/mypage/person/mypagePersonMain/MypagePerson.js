import React, { useState } from 'react';
import style from './MypagePerson.module.css';
import userProfileImage from '../../../../assets/images/person.jpg';
import PersonProfileCardList from './MypagePersonCardList';

const MypagePerson = () => {
  // 카드 리스트 데이터
  const [houseCards, setHouseCards] = useState([
    { id: 1, likeCount: 535, title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 1' },
    { id: 2, likeCount: 535, title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 2' },
    { id: 3, likeCount: 535, title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 3' },
    { id: 4, likeCount: 535, title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 4' },
    { id: 5, likeCount: 535, title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 5' },
    { id: 6, likeCount: 535, title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 6' },
  ]);

  return (
    <div className={style.profilePage}>
      {/* 사용자 정보 카드 */}
      <div className={style.userInfoCard}>
        <img src={userProfileImage} alt="User Profile" className={style.profileImage} />
        <h3 className={style.username}>홍길동</h3>
        <p className={style.userId}>KostalD123</p>
        <p className={style.userEmail}>kosta@gmail.com</p>
        <hr className={style.separator} />
        <p className={style.sectionTitle}>집들이</p>
      </div>

      {/* 집들이 카드 리스트 */}
      <div className={style.houseListContainer}>
        <div className={style.houseListHeader}>
          <h2 className={style.houseListTitle} style={{ fontFamily: 'Santokki' }}>집들이</h2>
          <a href="#" className={style.houseListViewAll} style={{ fontFamily: 'Santokki' }}>전체 보기</a>
        </div>
        <PersonProfileCardList houseCards={houseCards} />
      </div>
    </div>
  );
};

export default MypagePerson;
