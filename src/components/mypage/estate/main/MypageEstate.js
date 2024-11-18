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

  return <MypageEstateCardList houseCards={estateCards} />;
};

export default MypageEstate;
