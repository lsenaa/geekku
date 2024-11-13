import React from 'react';
import MypageEstateCardList from './MypageEstateCardList';
import styles from './MypageEstate.module.css';
import userProfileImage from '../../../../assets/images/person.jpg';

const MypageEstate = () => {
  // Replace with your actual data
  const estateCards = [
    {
      id: 1,
      type: '전원주택',
      rent: '월세 300/33',
      location: '충청남도 태안군 | 109㎡(30평)',
      description: '시골 빈집 전원주택',
      imageUrl: require('../../../../assets/images/InteriorExam.jpg'),
    },
    {
      id: 2,
      type: '아파트',
      rent: '월세 500/40',
      location: '경상북도 예천군 | 109㎡(30평)',
      description: '깔끔하게 리모델링한 아파트',
      imageUrl: require('../../../../assets/images/InteriorExam.jpg'),
    },
    {
      id: 4,
      type: '시골농가주택',
      rent: '월세 100/10',
      location: '충청북도 단양군 | 109㎡(30평)',
      description: '리모델링한 시골농가주택',
      imageUrl: require('../../../../assets/images/InteriorExam.jpg'),
    },
    {
      id: 5,
      type: '전원주택',
      rent: '월세 300/33',
      location: '충청남도 태안군 | 109㎡(30평)',
      description: '시골 빈집 전원주택',
      imageUrl: require('../../../../assets/images/InteriorExam.jpg'),
    },
    {
      id: 6,
      type: '아파트',
      rent: '월세 500/40',
      location: '경상북도 예천군 | 109㎡(30평)',
      description: '깔끔하게 리모델링한 아파트',
      imageUrl: require('../../../../assets/images/InteriorExam.jpg'),
    },
    {
      id: 3,
      type: '시골농가주택',
      rent: '월세 100/10',
      location: '충청북도 단양군 | 109㎡(30평)',
      description: '리모델링한 시골농가주택',
      imageUrl: require('../../../../assets/images/InteriorExam.jpg'),
    },
    // Add more entries if needed
  ];

  return (
    <div className={styles.mypageEstate}>
      <div className={styles.profileSection}>
        <div className={styles.userInfoCard}>
          <img
            src={userProfileImage}
            alt="User Profile"
            className={styles.profileImage}
          />
          <h3 className={styles.username}>코스타</h3>
          <p className={styles.userId}>KostalD123</p>
          <p className={styles.userEmail}>kosta@gmail.com</p>
          <hr className={styles.separator} />
          <p className={styles.sectionTitle}>집꾸하기</p>
        </div>
      </div>
      <div className={styles.estateSection}>
        <h2 className={styles.title}>매물 등록 내역</h2>
        <MypageEstateCardList houseCards={estateCards} />
      </div>
    </div>
  );
};

export default MypageEstate;
