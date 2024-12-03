import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePersonCard.module.css';
import InteriorExam from 'assets/images/InteriorExam.jpg';
import bookmarkImg from 'assets/images/bookmarkTrue.png';

const ProfilePersonCard = ({ id, likeCount, title }) => {
  const navigate = useNavigate(); // useNavigate를 사용해 이동 처리

  const handleCardClick = () => {
    if (id) {
      navigate(`/communityBoardDetail/${id}`); // id 값을 경로에 포함
    } else {
      console.error('id가 없습니다!');
    }
  };

  return (
    <div className={styles.houseCard} onClick={handleCardClick}>
      <img src={InteriorExam} alt="House" className={styles.houseImage} />
      <div className={styles.houseDetails}>
        <p className={styles.houseTitle}>{title}</p>
        <div className={styles.likeSection}>
          <img src={bookmarkImg} alt="북마크 이미지" />
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonCard;
